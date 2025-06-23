import { motion } from "framer-motion";
import { X, MapPin, Star, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { MapProperty, Property } from "../../types/property";
import PropertyMap from "@/components/search/PropertyMap";
import { useState, useMemo, useEffect } from "react";

interface MapViewProps {
  properties: MapProperty[];
  fullProperties: Property[];
  center: [number, number] | null | undefined;
  onClose: () => void;
}

// Simple geocoding function (This is only for demo purpose we can use google map api to fetch accurate cordinates at the backend and store.)
const geocodeAddress = async (
  address: string,
  city: string,
  state?: string,
  country?: string
) => {
  try {
    const searchQuery = [address, city, state, country]
      .filter(Boolean)
      .join(", ");
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=1`;

    const response = await fetch(url, {
      headers: { "User-Agent": "PropertyMap/1.0" },
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (data && data.length > 0) {
      const result = data[0];
      return [parseFloat(result.lon), parseFloat(result.lat)]; // [lng, lat]
    }
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

const MapView = ({
  properties,
  fullProperties,
  center,
  onClose,
}: MapViewProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [geocodedProperties, setGeocodedProperties] =
    useState<MapProperty[]>(properties);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Geocode properties
  useEffect(() => {
    const geocodePropertiesWithoutCoords = async () => {
      const propertiesNeedingGeocoding = properties.filter(
        (p) =>
          !p.location?.coordinates && p.location?.address && p.location?.city
      );

      if (propertiesNeedingGeocoding.length === 0) {
        setGeocodedProperties(properties);
        return;
      }

      setIsGeocoding(true);

      const updatedProperties = [...properties];

      for (let i = 0; i < propertiesNeedingGeocoding.length; i++) {
        const property = propertiesNeedingGeocoding[i];

        if (i > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        const coords = await geocodeAddress(
          property.location.address!,
          property.location.city,
          property.location.state,
          property.location.country
        );

        if (coords) {
          const propertyIndex = updatedProperties.findIndex(
            (p) => p._id === property._id
          );
          if (propertyIndex !== -1) {
            updatedProperties[propertyIndex] = {
              ...updatedProperties[propertyIndex],
              location: {
                ...updatedProperties[propertyIndex].location,
                coordinates: coords,
              },
            };
          }
        } else {
          console.warn(`Failed to geocode ${property.title}`);
        }
      }

      setGeocodedProperties(updatedProperties);
      setIsGeocoding(false);
    };

    geocodePropertiesWithoutCoords();
  }, [properties]);

  // Memoize selectedProperty to prevent unnecessary re-renders
  const selectedPropertyMemo = useMemo(() => {
    return selectedProperty
      ? fullProperties.find((p) => p._id === selectedProperty._id) || null
      : null;
  }, [selectedProperty, fullProperties]);

  // Calculate center from properties if not provided
  const mapCenter = useMemo(() => {
    if (center && Array.isArray(center) && center.length === 2) {
      return center;
    }

    // Calculate center from geocoded properties with valid coordinates
    const propertiesWithCoords = geocodedProperties.filter(
      (p) =>
        p.location.coordinates &&
        Array.isArray(p.location.coordinates) &&
        p.location.coordinates.length === 2
    );

    if (propertiesWithCoords.length > 0) {
      const avgLat =
        propertiesWithCoords.reduce(
          (sum, p) => sum + (p.location.coordinates![1] || 0),
          0
        ) / propertiesWithCoords.length;

      const avgLng =
        propertiesWithCoords.reduce(
          (sum, p) => sum + (p.location.coordinates![0] || 0),
          0
        ) / propertiesWithCoords.length;

      return [avgLat, avgLng] as [number, number];
    }

    // Default to India center if no coordinates available
    return [20.5937, 78.9629] as [number, number];
  }, [center, geocodedProperties]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white dark:bg-gray-900"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Map View – {geocodedProperties.length} properties
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {isGeocoding
                ? "🌍 Getting location coordinates for properties..."
                : "Please wait a few seconds for the map to load."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close map view"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="pt-20 h-full relative">
        <PropertyMap
          properties={geocodedProperties}
          center={mapCenter}
          zoom={6}
          onMarkerClick={(propertyId: string) => {
            const property = fullProperties.find((p) => p._id === propertyId);
            setSelectedProperty(property || null);
          }}
          showPriceMarkers={true}
          height="100%"
          className="w-full h-full"
        />

        {/* Property Preview Card */}
        {selectedPropertyMemo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-20"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="relative h-48">
                <img
                  src={
                    selectedPropertyMemo.images?.find((img) => img.isPrimary)
                      ?.url ||
                    selectedPropertyMemo.images?.[0]?.url ||
                    "/placeholder-image.jpg"
                  }
                  alt={selectedPropertyMemo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-2 right-2 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close property preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {selectedPropertyMemo.title}
                </h3>

                <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {selectedPropertyMemo.location.city}
                    {selectedPropertyMemo.location.state &&
                      `, ${selectedPropertyMemo.location.state}`}
                    , {selectedPropertyMemo.location.country}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedPropertyMemo.rating?.overall || "New"}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({selectedPropertyMemo.reviewCount || 0} reviews)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{selectedPropertyMemo.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 block">
                      /night
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span className="capitalize">
                    {selectedPropertyMemo.type}
                  </span>
                  <span>Up to {selectedPropertyMemo.guests} guests</span>
                </div>

                <Link
                  to={`/property/${selectedPropertyMemo._id}`}
                  className="flex items-center justify-center w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  View Details
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MapView;
