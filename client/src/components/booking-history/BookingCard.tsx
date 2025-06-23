import { MapPin, Calendar, User, Download, Star, Eye, X } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReceiptModal from "./ReceiptModal";
import BookingDetailModal from "./BookingDetailsModal";
import { Booking } from "../../types/history";
import api from "../../services/api";
import toast from "react-hot-toast";

interface BookingCardProps {
  booking: Booking;
  onDownloadReceipt: (bookingId: string) => void;
}

const BookingCard = ({ booking, onDownloadReceipt }: BookingCardProps) => {
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const isCancelledByHost = booking.status === "cancelled_by_host";
  const isCancelledByGuest = booking.status === "cancelled_by_guest";
  const isCancelled = isCancelledByHost || isCancelledByGuest;
  const isCheckoutPassed = new Date(booking.checkOut) < new Date();
  const isFutureCheckIn = new Date(booking.checkIn) > new Date();

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const getStatusText = () => {
    if (isCancelled) return "Cancelled";
    return booking.status.charAt(0).toUpperCase() + booking.status.slice(1);
  };

  const handleReceiptClick = () => {
    setShowReceiptModal(true);
  };

  const handleViewDetails = () => {
    setShowDetailModal(true);
  };

  const handleMessageHost = () => {
    navigate("/messages");
  };

  const handlePayNow = () => {
    navigate("/payment", {
      state: {
        listingId: booking.listing._id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests || {
          adults: 1,
          children: 0,
          infants: 0,
          pets: 0,
        },
        property: {
          _id: booking.listing._id,
          title: booking.listing.title,
          price: booking.listing.price || 0,
          location: booking.listing.location,
          images: booking.listing.images,
          amenities: booking.listing.amenities || [],
          host: {
            ...booking.host,
            hostInfo: {
              isSuperhost: booking.host.hostInfo?.isSuperhost || true,
              responseRate: booking.host.hostInfo?.responseRate || 90,
              responseTime:
                booking.host.hostInfo?.responseTime || "within an hour",
              languages: booking.host.hostInfo?.languages || ["English"],
            },
          },
          guests: booking.listing.guests || {
            adults: 1,
            children: 0,
            infants: 0,
            pets: 0,
          },
          currency: booking.pricing.currency || "INR",
        },
        bookingId: booking._id,
        pricing: {
          totalPrice: booking.pricing.totalPrice,
          basePrice: booking.pricing.basePrice || booking.pricing.totalPrice,
          cleaningFee: booking.pricing.cleaningFee || 0,
          serviceFee: booking.pricing.serviceFee || 0,
          taxes: booking.pricing.taxes || 0,
          nights: booking.nightsCount || booking.duration || 1,
          subtotal: booking.pricing.subtotal || booking.pricing.totalPrice,
          discounts: booking.pricing.discounts || { amount: 0, type: "" },
          currency: booking.pricing.currency || "INR",
        },
        specialRequests: booking.specialRequests || "",
        confirmationCode: booking.confirmationCode || "",
      },
    });
  };

  const handleCancelBooking = async () => {
    setIsCancelling(true);
    try {
      await api.put(`/bookings/${booking._id}/status`, {
        status: "cancelled_by_guest",
        reason: "Guest cancelled booking",
      });
      toast.success("Booking cancelled successfully");
      setShowCancelModal(false);
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error("Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }
    toast.success("Review submitted successfully!");
    setShowReviewModal(false);
    setRating(0);
    setFeedback("");
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="sm:w-80 h-36 sm:h-auto flex-shrink-0">
            <div className="relative h-full w-full">
              <img
                src={
                  booking.listing.images[0]?.url || "/placeholder-property.jpg"
                }
                alt={booking.listing.title}
                className="h-full w-full object-cover"
              />
              <span
                className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                  statusColors[isCancelled ? "cancelled" : booking.status] ||
                  "bg-gray-100 text-gray-800 border-gray-200"
                }`}
              >
                {getStatusText()}
              </span>
              {booking.listing.rating?.overall && (
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-md px-1.5 py-0.5 shadow-sm">
                  <div className="flex items-center text-xs font-medium">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-gray-900 dark:text-white">
                      {booking.listing.rating.overall}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Booking Details Section */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="h-full flex flex-col justify-between">
              {/* Property Info */}
              <div>
                <div className="flex justify-between items-start mb-1.5">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    {booking.listing.title}
                  </h2>
                  <button
                    onClick={handleMessageHost}
                    className="flex items-center gap-1 px-2 py-1 border border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600/10 dark:hover:text-blue-400 rounded-md text-sm font-medium transition-colors"
                    title="Message Host"
                  >
                    <span>Message Host</span>
                  </button>
                </div>

                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1 text-xs">
                  <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span>
                    {booking.listing.location.city},{" "}
                    {booking.listing.location.country}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3 text-xs">
                  <User className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                  <span>
                    Hosted by {booking.host.firstName} {booking.host.lastName}
                  </span>
                </div>

                {/* Date and Price Info */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-4">
                  <div className="flex items-center text-gray-700 dark:text-gray-300 mb-2 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                    <div>
                      <div className="font-medium text-xs">
                        {format(new Date(booking.checkIn), "MMM d, yyyy")} -{" "}
                        {format(new Date(booking.checkOut), "MMM d, yyyy")}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {booking.nightsCount || booking.duration || 1} night
                        {(booking.nightsCount || booking.duration || 1) !== 1
                          ? "s"
                          : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 ml-5">
                      Total
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ₹{booking.pricing.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                {booking.status === "pending" && (
                  <button
                    onClick={handlePayNow}
                    className="flex-1 px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    Pay Now
                  </button>
                )}
                {isFutureCheckIn && !isCancelled && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex-1 px-4 py-2 border border-red-300 dark:border-red-600 rounded-lg text-sm font-medium text-red-700 dark:text-red-300 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                  >
                    <X className="h-3.5 w-3.5 mr-1 inline" />
                    Cancel Booking
                  </button>
                )}
                {isCancelledByHost && (
                  <span className="flex-1 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                    Cancelled by Host
                  </span>
                )}
                {isCheckoutPassed && !isCancelled && (
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="flex-1 px-4 py-2 border border-yellow-600 dark:border-yellow-900 rounded-lg text-sm font-medium text-yellow-700 dark:text-yellow-300 bg-white dark:bg-gray-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors"
                  >
                    <Star className="h-3.5 w-3.5 mr-1 inline" />
                    Rate Your Stay
                  </button>
                )}
                <button
                  onClick={handleReceiptClick}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <Download className="h-3.5 w-3.5 mr-1 inline" />
                  Receipt
                </button>
                <button
                  onClick={handleViewDetails}
                  className="flex-1 px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  <Eye className="h-3.5 w-3.5 mr-1 inline" />
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showReceiptModal && (
        <ReceiptModal
          booking={booking}
          isOpen={showReceiptModal}
          onClose={() => setShowReceiptModal(false)}
          onDownload={() => onDownloadReceipt(booking._id)}
        />
      )}
      {showDetailModal && (
        <BookingDetailModal
          booking={booking}
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
        />
      )}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Cancel Booking
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to cancel your booking for{" "}
              <span className="font-medium">{booking.listing.title}</span>? This
              action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={isCancelling}
                className="flex-1 px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 transition-colors"
              >
                {isCancelling ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Rate Your Stay
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              How was your stay at{" "}
              <span className="font-medium">{booking.listing.title}</span>?
            </p>
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-500"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your feedback..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-y mb-4"
              rows={4}
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setRating(0);
                  setFeedback("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="flex-1 px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingCard;
