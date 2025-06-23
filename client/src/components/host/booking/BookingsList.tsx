import { Booking } from "../../../types/dashboard";
import { Calendar, Eye, MessageCircle, Edit, Users } from "lucide-react";

interface BookingListProps {
  bookings: Booking[];
  isLoading: boolean;
  handleViewDetails: (booking: Booking) => void;
  handleStatusUpdateClick: (booking: Booking) => void;
  handleMessageGuest: (booking: Booking) => void;
}

const BookingList = ({
  bookings,
  isLoading,
  handleViewDetails,
  handleStatusUpdateClick,
  handleMessageGuest,
}: BookingListProps) => {
  const getStatusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-3 py-1.5 text-xs font-medium rounded-full border border-green-200 dark:border-green-800">
            Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 px-3 py-1.5 text-xs font-medium rounded-full border border-yellow-200 dark:border-yellow-800">
            Pending
          </span>
        );
      case "in_progress":
        return (
          <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1.5 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800">
            In Progress
          </span>
        );
      case "completed":
        return (
          <span className="bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300 px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-800">
            Completed
          </span>
        );
      default:
        return (
          <span className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 px-3 py-1.5 text-xs font-medium rounded-full border border-red-200 dark:border-red-800">
            {(status === "cancelled_by_host" ||
              status === "cancelled_by_guest") &&
              "Cancelled"}
          </span>
        );
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {isLoading ? (
        <div className="p-6">
          <div className="space-y-4">
            {" "}
            {/* Reduced space between loading skeletons */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse p-6 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl"
              >
                <div className="flex items-start space-x-4">
                  <div className="h-28 w-28 bg-gray-300 dark:bg-gray-500 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-300 dark:bg-gray-500 rounded-lg w-2/3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-3/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-300 dark:bg-gray-500 rounded w-24"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 px-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Calendar className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            No bookings found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Try adjusting your filters or check back later for new bookings
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 group relative mb-4 last:mb-0" // Added mb-4 for bottom margin
            >
              {/* Status moved to top right */}
              <div className="absolute top-6 right-6">
                {getStatusIcon(booking.status)}
              </div>

              <div className="flex items-start space-x-6">
                {/* Property Image - increased size */}
                <div className="flex-shrink-0">
                  <img
                    src={
                      booking.listing.images[0]?.url ||
                      "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=200"
                    }
                    alt={booking.listing.title}
                    className="h-28 w-28 rounded-xl object-cover border-2 border-white dark:border-gray-600 shadow-sm"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {booking.listing.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {booking.guest.firstName} {booking.guest.lastName}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                          <span>
                            {new Date(booking.checkIn).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}{" "}
                            -{" "}
                            {new Date(booking.checkOut).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                            {booking.confirmationCode}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <span className="text-sm">
                            {calculateNights(booking.checkIn, booking.checkOut)}{" "}
                            nights
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price and Buttons in same line */}
                  <div className="mt-6 flex items-center justify-between">
                    {/* Buttons on the left */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 dark:hover:bg-blue-900/50 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>

                      <button
                        onClick={() => handleStatusUpdateClick(booking)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={
                          booking.status.includes("cancelled") ||
                          booking.status === "completed" ||
                          booking.status === "no_show"
                        }
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Update Status
                      </button>

                      <button
                        onClick={() => handleMessageGuest(booking)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-200"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Guest
                      </button>
                    </div>

                    {/* Price on the right */}
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {booking.pricing?.totalPrice != null
                          ? formatCurrency(
                              booking.pricing.totalPrice,
                              booking.pricing.currency
                            )
                          : "Price N/A"}
                      </div>
                      {booking.pricing?.basePrice && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {formatCurrency(
                            booking.pricing.basePrice,
                            booking.pricing.currency
                          )}{" "}
                          / night
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
