import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Listing } from "../../../types/booking";

interface FormData {
  availability: Listing["availability"];
  instantBook: Listing["instantBook"];
}

interface AvailabilityProps {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const Availability: React.FC<AvailabilityProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <Calendar className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Availability
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimum Stay (nights)
          </label>
          <input
            type="number"
            name="availability.minStay"
            value={formData.availability.minStay}
            onChange={handleInputChange}
            min="1"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Maximum Stay (nights)
          </label>
          <input
            type="number"
            name="availability.maxStay"
            value={formData.availability.maxStay || ""}
            onChange={handleInputChange}
            min="1"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="30"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Advance Notice (days)
          </label>
          <input
            type="number"
            name="availability.advanceNotice"
            value={formData.availability.advanceNotice}
            onChange={handleInputChange}
            min="0"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preparation Time (days)
          </label>
          <input
            type="number"
            name="availability.preparationTime"
            value={formData.availability.preparationTime}
            onChange={handleInputChange}
            min="0"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="1"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="instantBook"
            checked={formData.instantBook || false}
            onChange={handleInputChange}
            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enable Instant Booking
          </span>
        </label>
      </div>
    </motion.div>
  );
};

export default Availability;
