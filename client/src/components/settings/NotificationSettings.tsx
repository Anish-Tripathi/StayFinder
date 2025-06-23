import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";

const NotificationSettings = () => {
  const { user, updateNotificationPreferences } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: user?.preferences?.notifications?.email || true,
    sms: user?.preferences?.notifications?.sms || false,
    push: user?.preferences?.notifications?.push || true,
  });

  const handleNotificationPrefsChange = async () => {
    setIsLoading(true);
    try {
      await updateNotificationPreferences(notificationPrefs);
      toast.success("Notification preferences updated!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setNotificationPrefs({
      email: user?.preferences?.notifications?.email || true,
      sms: user?.preferences?.notifications?.sms || false,
      push: user?.preferences?.notifications?.push || true,
    });
    setIsEditing(false);
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationPrefs({
      ...notificationPrefs,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-none w-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Notification Preferences
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Notification Methods
          </h3>
          <div className="space-y-4">
            {[
              {
                name: "email",
                label: "Email Notifications",
                desc: "Receive notifications via email",
              },
              {
                name: "sms",
                label: "SMS Notifications",
                desc: "Receive notifications via text message",
              },
              {
                name: "push",
                label: "Push Notifications",
                desc: "Receive notifications on your device",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {item.label}
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={
                      notificationPrefs[
                        item.name as keyof typeof notificationPrefs
                      ]
                    }
                    onChange={handleNotificationChange}
                    disabled={!isEditing}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
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
                onClick={handleNotificationPrefsChange}
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

export default NotificationSettings;
