import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Star,
  Shield,
  Settings,
  Award,
  Map,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { Booking } from "../types/booking";

const Profile = () => {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const stats = [
    { label: "Reviews", value: "47", icon: Star },
    { label: "Stays", value: "23", icon: Calendar },
    { label: "Cities", value: "12", icon: MapPin },
    { label: "Years", value: "3", icon: Shield },
  ];

  const achievements = [
    { title: "Super Guest", description: "Highly rated by hosts", icon: Award },
    { title: "Explorer", description: "Stayed in 10+ cities", icon: Map },
    { title: "Verified", description: "Identity confirmed", icon: CheckCircle },
  ];

  const token = localStorage.getItem("token");

  // Fetch recent bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Handle different response formats
        let bookingsData: Booking[] = [];
        if (Array.isArray(response.data)) {
          bookingsData = response.data;
        } else if (
          response.data?.bookings &&
          Array.isArray(response.data.bookings)
        ) {
          bookingsData = response.data.bookings;
        } else {
          throw new Error(
            "Unexpected response format: bookings data is not an array"
          );
        }

        setBookings(bookingsData.slice(0, 3));
        setError(null);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to load recent bookings.";
        setError(errorMessage);
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please log in to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-8 relative"
        >
          {/* Settings Button - Top Right Corner */}
          <div className="absolute top-6 right-6">
            <Link
              to="/settings"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="h-32 w-32 bg-indigo-600 rounded-full flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img
                    src={`http://localhost:5000/${user.avatar}`}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {user.email}
                </p>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.createdAt).getFullYear()}</span>
                </div>
              </div>

              {user.bio && (
                <p className="text-gray-700 dark:text-gray-300 text-base mb-6">
                  {user.bio}
                </p>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              {/* Recent Bookings */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Recent Bookings
                </h2>
                {loading ? (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    Loading bookings...
                  </div>
                ) : error ? (
                  <div className="text-center text-red-600 dark:text-red-400">
                    {error}
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    No recent bookings found.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="text-gray-900 dark:text-white font-medium">
                            {booking.listing.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(booking.checkIn).toLocaleDateString(
                              "en-IN"
                            )}{" "}
                            -{" "}
                            {new Date(booking.checkOut).toLocaleDateString(
                              "en-IN"
                            )}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            Status: {booking.status}
                          </p>
                          {booking.totalPrice && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Total: ₹
                              {booking.totalPrice.toLocaleString("en-IN")}{" "}
                              {/* Changed from booking.total */}
                            </p>
                          )}
                        </div>
                        {booking.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(booking.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Reviews from Hosts
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      host: "Anjali Patel",
                      property: "Beach Villa, Goa",
                      review:
                        "Vikram was an excellent guest! He was respectful, kept the place clean, and communicated well.",
                      rating: 5,
                      date: "2 days ago",
                    },
                    {
                      host: "Ravi Kumar",
                      property: "Hill Cottage, Manali",
                      review:
                        "Great guest, left the cottage in perfect condition. Highly recommended!",
                      rating: 5,
                      date: "1 week ago",
                    },
                  ].map((review, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {review.host}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {review.property}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {review.review}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Achievements
              </h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <achievement.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Verification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Verification
              </h2>
              <div className="space-y-4">
                {[
                  { item: "Email address", verified: true },
                  { item: "Phone number", verified: !!user.phone },
                  { item: "Identity", verified: false },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.item}
                    </span>
                    {item.verified ? (
                      <span className="text-green-600 dark:text-green-400 flex items-center">
                        <Shield className="h-4 w-4 mr-1" />
                        Verified
                      </span>
                    ) : (
                      <button className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm">
                        Verify
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
