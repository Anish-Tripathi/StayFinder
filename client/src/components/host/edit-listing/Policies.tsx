import React from "react";
import { motion } from "framer-motion";
import { Shield, X } from "lucide-react";
import { Listing } from "../../../types/booking";

interface FormData {
  houseRules: Listing["houseRules"];
  cancellationPolicy: Listing["cancellationPolicy"];
  license?: Listing["license"];
}

const CANCELLATION_POLICIES: {
  value:
    | "flexible"
    | "moderate"
    | "strict"
    | "super_strict_30"
    | "super_strict_60";
  label: string;
}[] = [
  {
    value: "flexible",
    label: "Flexible - Free cancellation 24 hours before check-in",
  },
  {
    value: "moderate",
    label: "Moderate - Free cancellation 5 days before check-in",
  },
  {
    value: "strict",
    label: "Strict - Free cancellation 14 days before check-in",
  },
  {
    value: "super_strict_30",
    label: "Super Strict - 50% refund up to 30 days before",
  },
  {
    value: "super_strict_60",
    label: "Super Strict - 50% refund up to 60 days before",
  },
];

interface PoliciesProps {
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  newHouseRule: string;
  setNewHouseRule: (value: string) => void;
  addHouseRule: () => void;
  removeHouseRule: (index: number) => void;
}

const Policies: React.FC<PoliciesProps> = ({
  formData,
  handleInputChange,
  newHouseRule,
  setNewHouseRule,
  addHouseRule,
  removeHouseRule,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <Shield className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Policies
        </h2>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          House Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Check-In From
            </label>
            <input
              type="time"
              name="houseRules.checkIn.from"
              value={formData.houseRules.checkIn.from}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Check-In To
            </label>
            <input
              type="time"
              name="houseRules.checkIn.to"
              value={formData.houseRules.checkIn.to}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Check-Out
          </label>
          <input
            type="time"
            name="houseRules.checkOut"
            value={formData.houseRules.checkOut}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="houseRules.smokingAllowed"
              checked={formData.houseRules.smokingAllowed}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Smoking Allowed
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="houseRules.petsAllowed"
              checked={formData.houseRules.petsAllowed}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Pets Allowed
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="houseRules.partiesAllowed"
              checked={formData.houseRules.partiesAllowed}
              onChange={handleInputChange}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Parties Allowed
            </span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quiet Hours From
            </label>
            <input
              type="time"
              name="houseRules.quietHours.from"
              value={formData.houseRules.quietHours?.from}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quiet Hours To
            </label>
            <input
              type="time"
              name="houseRules.quietHours.to"
              value={formData.houseRules.quietHours?.to}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Rules
          </label>
          <div className="space-y-2 mb-4">
            {formData.houseRules.additionalRules?.map((rule, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
              >
                <span className="text-gray-900 dark:text-gray-100">{rule}</span>
                <button
                  type="button"
                  onClick={() => removeHouseRule(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={newHouseRule}
              onChange={(e) => setNewHouseRule(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Add a house rule, e.g., No loud music"
            />
            <button
              type="button"
              onClick={addHouseRule}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cancellation Policy
        </label>
        <select
          name="cancellationPolicy"
          value={formData.cancellationPolicy}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          required
        >
          {CANCELLATION_POLICIES.map((policy) => (
            <option key={policy.value} value={policy.value}>
              {policy.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          License
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            License Number
          </label>
          <input
            type="text"
            name="license.number"
            value={formData.license?.number}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="STR-2024-001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            License Type
          </label>
          <input
            type="text"
            name="license.type"
            value={formData.license?.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Short-term Rental"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expiry Date
          </label>
          <input
            type="date"
            name="license.expiryDate"
            value={formData.license?.expiryDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Policies;
