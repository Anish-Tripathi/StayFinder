import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Star,
  Heart,
  Wifi,
  Car,
  Coffee,
  Home,
  Mountain,
  Trees,
  Snowflake,
  Flame,
  MapPin,
  Users,
  Bed,
  Bath,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { Property } from "@/types/property";

const amenityIcons: Record<string, JSX.Element> = {
  wifi: <Wifi className="w-4 h-4" />,
  parking: <Car className="w-4 h-4" />,
  kitchen: <Coffee className="w-4 h-4" />,
  Flameplace: <Flame className="w-4 h-4" />,
  mountain_view: <Mountain className="w-4 h-4" />,
  heating: <Snowflake className="w-4 h-4" />,
  trekking_access: <Mountain className="w-4 h-4" />,
};

const propertyTypeIcons: Record<string, JSX.Element> = {
  cottage: <Home className="w-4 h-4" />,
  resort: <Home className="w-4 h-4" />,
  bungalow: <Home className="w-4 h-4" />,
  apartment: <Home className="w-4 h-4" />,
  cabin: <Trees className="w-4 h-4" />,
};

const PropertyCard = ({ property }: { property: Property }) => {
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);
  const primaryImage =
    property.images.find((img) => img.isPrimary) || property.images[0];

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/property/${property._id}`} className="group w-full max-w-2xl">
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200 dark:border-gray-700"
      >
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          {primaryImage && (
            <motion.img
              src={primaryImage.url}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300 z-10"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            />
          </button>

          {/* Property Type Badge */}
          <div className="absolute top-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
            {propertyTypeIcons[property.type.toLowerCase()] || (
              <Home className="w-4 h-4" />
            )}
            <span className="capitalize">{property.type}</span>
          </div>

          {/* Price */}
          <div className="absolute bottom-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            ₹{property.price} <span className="font-normal">/ night</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Title and Rating */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-gray-900 dark:text-white">
                {property.rating.overall.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm line-clamp-1">
              {property.location.city}, {property.location.country}
            </span>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                {property.guests} {property.guests === 1 ? "guest" : "guests"}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Bed className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                {property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Bath className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                {property.bathrooms}{" "}
                {property.bathrooms === 1 ? "bath" : "baths"}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">
                {property.reviewCount} reviews
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Top Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {property.amenities.slice(0, 5).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg text-xs text-gray-700 dark:text-gray-300"
                >
                  {amenityIcons[amenity.toLowerCase()] || (
                    <Wifi className="w-4 h-4" />
                  )}
                  <span className="capitalize">
                    {amenity.replace("_", " ")}
                  </span>
                </div>
              ))}
              {property.amenities.length > 5 && (
                <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg text-xs text-gray-700 dark:text-gray-300">
                  +{property.amenities.length - 5} more
                </div>
              )}
            </div>
          </div>

          {/* Host Info */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={
                  property.host.avatar
                    ? `http://localhost:5000/${property.host.avatar}`
                    : "/default-avatar.png"
                }
                alt={property.host.firstName || "Host"}
                className="w-8 h-8 rounded-full object-cover"
              />

              <span className="text-sm text-gray-600 dark:text-gray-400">
                Hosted by {property.host.firstName} {property.host.lastName}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PropertyCard;
