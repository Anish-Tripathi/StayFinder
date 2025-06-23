import { motion } from "framer-motion";
import { Booking } from "../../types/booking";
import { MessageCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface HostInformationProps {
  booking: Booking;
}

export const HostInformation = ({ booking }: HostInformationProps) => {
  // Fallback for missing host data
  const host = booking.listing?.host || {
    firstName: "Host",
    lastName: "",
    fullName: "Host",
    avatar: "",
    _id: "",
    id: "",
  };

  const responseRate = booking.listing?.host?.responseRate || 95;

  const bio =
    booking.listing?.host?.bio ||
    "Experienced host dedicated to making your stay comfortable and memorable.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Your Host
      </h2>
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center overflow-hidden">
          {host.avatar ? (
            <img
              src={`http://localhost:5000/${host.avatar}`}
              alt={`${host.firstName} ${host.lastName}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-white font-semibold">
              {host.firstName?.[0] || "H"}
            </span>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {host.fullName || `${host.firstName} ${host.lastName}`}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your host</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Star className="h-4 w-4 mr-2 text-yellow-400" />
          <span>Superhost • {responseRate}% response rate</span>
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>{bio}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Contact information will be provided closer to your check-in date.
        </p>
        <Link to="/messages" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto btn-secondary flex items-center justify-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>Message Host</span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
};
