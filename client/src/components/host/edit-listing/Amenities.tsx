import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Wifi,
  Car,
  Utensils,
  Tv,
  Wind,
  Waves,
  Dumbbell,
  Coffee,
} from "lucide-react";
import { Listing } from "../../../types/booking";

interface FormData {
  amenities: Listing["amenities"];
}

const AMENITIES = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "parking", label: "Free Parking", icon: Car },
  { id: "kitchen", label: "Kitchen", icon: Utensils },
  { id: "tv", label: "TV", icon: Tv },
  { id: "ac", label: "Air Conditioning", icon: Wind },
  { id: "pool", label: "Pool", icon: Waves },
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "coffee", label: "Coffee Maker", icon: Coffee },
];

interface AmenitiesProps {
  formData: FormData;
  toggleAmenity: (amenityId: string) => void;
}

const Amenities: React.FC<AmenitiesProps> = ({ formData, toggleAmenity }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <Star className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Amenities
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AMENITIES.map((amenity) => {
          const Icon = amenity.icon;
          return (
            <label
              key={amenity.id}
              className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity.id)}
                onChange={() => toggleAmenity(amenity.id)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300 ml-3 mr-2" />
              <span className="text-gray-900 dark:text-gray-100">
                {amenity.label}
              </span>
            </label>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Amenities;
