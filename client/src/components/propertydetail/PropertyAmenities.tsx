import React from "react";
import { motion } from "framer-motion";
import {
  Wifi,
  Car,
  Coffee,
  Wind,
  Tv,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  PawPrint,
  Cigarette,
  Shield,
  Camera,
  Timer,
  Thermometer,
  MapPin,
  Home,
  Bed,
  Bath,
  Key,
  Phone,
  Star,
  CheckCircle,
} from "lucide-react";

interface PropertyAmenitiesProps {
  amenities: string[];
  delay?: number;
}

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({
  amenities,
  delay = 0.3,
}) => {
  const getAmenityIcon = (amenity: string) => {
    const normalizedAmenity = amenity.toLowerCase().replace(/\s+/g, "");

    const iconMap: { [key: string]: React.ElementType } = {
      // Internet & Technology
      wifi: Wifi,
      internet: Wifi,
      wireless: Wifi,

      // Transportation
      parking: Car,
      car: Car,
      garage: Car,

      // Kitchen & Dining
      kitchen: Coffee,
      coffee: Coffee,
      coffeemachine: Coffee,
      dining: UtensilsCrossed,
      diningtable: UtensilsCrossed,
      utensils: UtensilsCrossed,

      // Climate Control
      ac: Wind,
      airconditioning: Wind,
      airconditioner: Wind,
      heating: Thermometer,
      heater: Thermometer,

      // Entertainment
      tv: Tv,
      television: Tv,
      cable: Tv,
      netflix: Tv,

      // Recreation
      pool: Waves,
      swimmingpool: Waves,
      jacuzzi: Waves,
      gym: Dumbbell,
      fitness: Dumbbell,
      workout: Dumbbell,

      // Pet & Smoking
      pets: PawPrint,
      petfriendly: PawPrint,
      dogs: PawPrint,
      cats: PawPrint,
      smoking: Cigarette,
      nosmoking: Cigarette,

      // Safety & Security
      security: Shield,
      safe: Shield,
      alarm: Shield,
      cctv: Camera,
      camera: Camera,

      // Convenience
      checkin: Key,
      selfcheckin: Key,
      keypad: Key,
      concierge: Phone,
      reception: Phone,

      // Location & Views
      view: MapPin,
      balcony: Home,
      terrace: Home,
      garden: Home,

      // Room Features
      bedroom: Bed,
      bed: Bed,
      bathroom: Bath,
      bath: Bath,

      // Services
      cleaning: Timer,
      housekeeping: Timer,
      laundry: Timer,

      // Accessibility
      accessible: CheckCircle,
      wheelchair: CheckCircle,

      // Default
      default: Star,
    };

    return iconMap[normalizedAmenity] || iconMap.default;
  };

  // Group amenities by category for better organization
  const categorizeAmenities = (amenities: string[]) => {
    const categories = {
      essentials: ["wifi", "parking", "kitchen", "ac", "heating"],
      entertainment: ["tv", "netflix", "cable", "music"],
      recreation: ["pool", "gym", "jacuzzi", "garden", "balcony"],
      services: ["cleaning", "laundry", "concierge", "reception"],
      policies: ["pets", "smoking", "nosmoking"],
      safety: ["security", "safe", "alarm", "cctv", "camera"],
    };

    const categorized: { [key: string]: string[] } = {
      featured: [],
      other: [],
    };

    amenities.forEach((amenity) => {
      const normalized = amenity.toLowerCase().replace(/\s+/g, "");
      let isFeatured = false;

      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some((keyword) => normalized.includes(keyword))) {
          if (category === "essentials" || category === "entertainment") {
            categorized.featured.push(amenity);
            isFeatured = true;
            break;
          }
        }
      }

      if (!isFeatured) {
        categorized.other.push(amenity);
      }
    });

    return categorized;
  };

  const categorizedAmenities = categorizeAmenities(amenities);
  const allAmenities = [
    ...categorizedAmenities.featured,
    ...categorizedAmenities.other,
  ];

  if (!amenities || amenities.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          What this place offers
        </h3>
        <div className="text-gray-500 dark:text-gray-400 italic">
          No amenities listed for this property.
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="border-b border-gray-200 dark:border-gray-700 pb-8"
    >
      {/* Featured Amenities */}
      {categorizedAmenities.featured.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
            Featured amenities
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categorizedAmenities.featured.map((amenity, index) => {
              const IconComponent = getAmenityIcon(amenity);
              return (
                <motion.div
                  key={`featured-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
                >
                  <div className="flex-shrink-0">
                    <IconComponent className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium capitalize">
                    {amenity.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Amenities Grid */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          {categorizedAmenities.featured.length > 0
            ? "All amenities"
            : "Available amenities"}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {allAmenities.map((amenity, index) => {
            const IconComponent = getAmenityIcon(amenity);
            return (
              <motion.div
                key={`all-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + index * 0.05 }}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <div className="flex-shrink-0">
                  <IconComponent className="h-4 w-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 capitalize text-sm group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                  {amenity.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Amenities Count */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <CheckCircle className="h-4 w-4" />
          <span>{amenities.length} amenities available</span>
        </div>

        {amenities.length > 10 && (
          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">
            Show all amenities
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyAmenities;
