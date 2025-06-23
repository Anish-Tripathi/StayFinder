import { Link } from "react-router-dom";
import { MapPin, Users, Bed, Bath, Wifi, Car, Heart, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Property } from "../../types/property";
import Badge from "../ui/Badge";
import Rating from "../ui/Rating";
import PriceDisplay from "../ui/PriceDisplay";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import toast from "react-hot-toast";

// Hypothetical geocodeAddress function
const geocodeAddress = async (
  address: string
): Promise<[number, number] | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`,
      { headers: { "User-Agent": "StayFinder/1.0" } }
    );
    const data = await response.json();
    if (data && data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isMapOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMapOpen]);

  // Fetch initial favorite status
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch(`/api/favorites/check/${property._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setIsFavorite(data.isFavorite);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    checkFavoriteStatus();
  }, [property._id]);

  // Fetch coordinates
  useEffect(() => {
    const fetchCoordinates = async () => {
      const address = property.location.address
        ? property.location.address
        : `${property.location.city}, ${property.location.country}`;
      const coords = await geocodeAddress(address);
      setCoordinates(coords || [51.505, -0.09]);
    };
    fetchCoordinates();
  }, [property.location]);

  // Handle favorite toggle
  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to add favorites");
      return;
    }
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(`/api/favorites/${property._id}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsFavorite(!isFavorite);
        toast.success(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  // Handle map toggle
  const handleMapToggle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMapOpen(true);
  }, []);

  const handleCloseMap = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMapOpen(false);
  }, []);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-3 w-3" />;
      case "parking":
        return <Car className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const formatAmenityName = (amenity: string) => {
    const amenityMap: Record<string, string> = {
      wifi: "WiFi",
      parking: "Parking",
      kitchen: "Kitchen",
      pool: "Pool",
      gym: "Gym",
      spa: "Spa",
      pets: "Pet Friendly",
      ac: "AC",
    };
    return amenityMap[amenity] || amenity;
  };

  const fallbackImage =
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400";
  const primaryImage = property.images[0]?.url || fallbackImage;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group relative"
      >
        <Link to={`/property/${property._id}`} className="block">
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 ${
              !isMapOpen
                ? "hover:shadow-xl group-hover:border-blue-200 dark:group-hover:border-blue-700"
                : ""
            }`}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={imageError ? fallbackImage : primaryImage}
                alt={property.title}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  !isMapOpen ? "group-hover:scale-110" : ""
                }`}
                onError={() => setImageError(true)}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 ${
                  !isMapOpen ? "opacity-0 group-hover:opacity-100" : "opacity-0"
                }`}
              />
              <button
                onClick={handleFavoriteToggle}
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all duration-200"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                />
              </button>
              {property.type && (
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="primary"
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
                  >
                    {property.type.charAt(0).toUpperCase() +
                      property.type.slice(1)}
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-3">
                <h3
                  className={`font-semibold text-gray-900 dark:text-white text-lg mb-1 line-clamp-2 transition-colors ${
                    !isMapOpen
                      ? "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      : ""
                  }`}
                >
                  {property.title}
                </h3>
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">
                    {property.location.city}, {property.location.country}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{property.guests} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>
                    {property.bedrooms} bed{property.bedrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1" />
                  <span>
                    {property.bathrooms} bath
                    {property.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {property.amenities.slice(0, 4).map((amenity) => (
                  <Badge
                    key={amenity}
                    variant="default"
                    className="text-xs px-2 py-1 flex items-center space-x-1"
                  >
                    {getAmenityIcon(amenity)}
                    <span>{formatAmenityName(amenity)}</span>
                  </Badge>
                ))}
                {property.amenities.length > 4 && (
                  <Badge variant="default" className="text-xs px-2 py-1">
                    +{property.amenities.length - 4} more
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Rating
                    rating={
                      typeof property.rating === "number"
                        ? property.rating
                        : property.rating.overall
                    }
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({property.reviewCount || 0})
                  </span>
                </div>
                <div className="text-right space-x-2">
                  <PriceDisplay
                    price={property.price}
                    period="night"
                    className="text-lg font-bold text-gray-900 dark:text-white inline-block mb-3"
                  />
                  <button
                    onClick={handleMapToggle}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center text-sm transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-1" />
                    View on Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Map Modal */}
      {isMapOpen && coordinates && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4"
          role="dialog"
          aria-labelledby="map-dialog-title"
          onClick={handleCloseMap} // Close modal when clicking outside
          onMouseOver={(e) => e.stopPropagation()} // Prevent hover events
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            onMouseOver={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3
                id="map-dialog-title"
                className="text-xl font-semibold text-gray-900 dark:text-white"
              >
                {property.title}
              </h3>
              <button
                onClick={handleCloseMap}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close map"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 flex-1 min-h-0">
              <div className="h-full w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={coordinates}
                  zoom={15}
                  style={{ height: "100%", width: "100%", minHeight: "400px" }}
                  className="z-0"
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={coordinates}>
                    <Popup className="font-semibold">{property.title}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {property.location.city}, {property.location.country}
                  {property.location.address &&
                    ` — ${property.location.address}`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default PropertyCard;
