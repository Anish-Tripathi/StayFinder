import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const AccountPreferences = () => {
  const { user, updateAccountPreferences } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountPrefs, setAccountPrefs] = useState({
    currency: user?.preferences?.currency || "INR",
    language: user?.preferences?.language || "en",
  });

  const handleAccountPrefsChange = async () => {
    setIsLoading(true);
    try {
      await updateAccountPreferences(accountPrefs);
      toast.success("Account preferences updated!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setAccountPrefs({
      currency: user?.preferences?.currency || "INR",
      language: user?.preferences?.language || "en",
    });
    setIsEditing(false);
  };

  const handleAccountPrefChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountPrefs({ ...accountPrefs, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-none w-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Account Preferences
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Currency
          </label>
          <select
            name="currency"
            value={accountPrefs.currency}
            onChange={handleAccountPrefChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
          >
            <option value="USD">US Dollar (USD)</option>
            <option value="INR">Indian Rupees (INR)</option>
            <option value="EUR">Euro (EUR)</option>
            <option value="GBP">British Pound (GBP)</option>
            <option value="JPY">Japanese Yen (JPY)</option>
            <option value="CAD">Canadian Dollar (CAD)</option>
            <option value="AUD">Australian Dollar (AUD)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language
          </label>
          <select
            name="language"
            value={accountPrefs.language}
            onChange={handleAccountPrefChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountPrefsChange}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Preferences"}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Preferences
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AccountPreferences;
