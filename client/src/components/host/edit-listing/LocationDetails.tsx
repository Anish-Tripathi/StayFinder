import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Listing } from "../../../types/booking";

interface LocationDetailsProps {
  formData: Listing;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<Listing>>;
}

const LocationDetails: React.FC<LocationDetailsProps> = ({
  formData,
  handleInputChange,
  setFormData,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <MapPin className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Location Details
        </h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Street Address
        </label>
        <input
          type="text"
          name="location.address"
          value={formData.location.address || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="123 Main Street"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City
          </label>
          <input
            type="text"
            name="location.city"
            value={formData.location.city || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="City"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium textritalized text-gray-700 dark:text-gray-300 mb-2">
            State/Province
          </label>
          <input
            type="text"
            name="location.state"
            value={formData.location.state || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="State/Province"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Country
          </label>
          <input
            type="text"
            name="location.country"
            value={formData.location.country || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Country"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Zip/Postal Code
          </label>
          <input
            type="text"
            name="location.zipCode"
            value={formData.location.zipCode || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Zip/Postal Code"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Neighborhood
        </label>
        <input
          type="text"
          name="location.neighborhood"
          value={formData.location.neighborhood || ""}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Neighborhood"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Latitude
          </label>
          <input
            type="number"
            name="location.coordinates.0"
            value={formData.location.coordinates?.[0] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  coordinates: [
                    parseFloat(e.target.value) || 0,
                    prev.location.coordinates?.[1] || 0,
                  ],
                },
              }))
            }
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Latitude"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Longitude
          </label>
          <input
            type="number"
            name="location.coordinates.1"
            value={formData.location.coordinates?.[1] || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  coordinates: [
                    prev.location.coordinates?.[0] || 0,
                    parseFloat(e.target.value) || 0,
                  ],
                },
              }))
            }
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Longitude"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LocationDetails;
