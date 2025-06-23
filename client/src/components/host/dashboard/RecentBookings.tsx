import { Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Booking } from "../../../types/booking";

interface RecentBookingsProps {
  bookings: Booking[];
  isLoading: boolean;
}

const RecentBookings = ({ bookings, isLoading }: RecentBookingsProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          <span className="text-gray-900 dark:text-white">Recent </span>
          <span className="text-blue-600">Bookings</span>
        </h2>

        <Link
          to="/host/bookings"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          View all bookings
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse flex items-center space-x-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-xl"
            >
              <div className="h-16 w-16 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <motion.div className="text-center py-12" variants={itemVariants}>
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bookings yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Your bookings will appear here once guests start booking your
            properties. Get started by creating a new listing!
          </p>
          <Link
            to="/host/listings/new"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Listing
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <motion.div
              key={booking._id}
              variants={itemVariants}
              className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <img
                src={
                  booking.listing.primaryImage || booking.listing.images[0]?.url
                }
                alt={booking.listing.title}
                className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {booking.listing.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {booking.status === "cancelled_by_host"
                        ? "Cancelled by host"
                        : booking.status === "cancelled_by_guest"
                        ? "Cancelled by guest"
                        : booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                    </span>

                    {booking.specialRequests && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Special Request
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                      {new Date(booking.checkOut).toLocaleDateString()}
                      <span className="ml-2 text-xs">
                        ({booking.pricing.nights} nights)
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      {booking.guests?.adults ?? 0} adults
                      {booking.guests?.children
                        ? `, ${booking.guests.children} children`
                        : ""}
                      {booking.guests?.pets
                        ? `, ${booking.guests.pets} pets`
                        : ""}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-lg text-gray-900 dark:text-white">
                      ₹{booking.pricing.totalPrice}/-
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Booking #{booking.confirmationCode}
                    </p>
                    {booking.specialRequests && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                        "{booking.specialRequests}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RecentBookings;
