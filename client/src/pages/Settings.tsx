import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import SettingsSidebar from "../components/settings/SettingsSidebar";
import AccountSettings from "../components/settings/AccountSettings";
import PasswordSettings from "../components/settings/PasswordSetting";
import NotificationSettings from "../components/settings/NotificationSettings";
import AccountPreferences from "../components/settings/AccountPreferences";

const Settings = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("account");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Please log in to view settings
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "password" && <PasswordSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "preferences" && <AccountPreferences />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
