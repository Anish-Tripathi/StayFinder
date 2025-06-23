import {
  X,
  Calendar,
  MapPin,
  User,
  Star,
  CreditCard,
  Shield,
  Clock,
  Users,
  Phone,
  Mail,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import { Booking } from "../../types/history";

interface BookingDetailModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

const BookingDetailModal = ({
  booking,
  isOpen,
  onClose,
}: BookingDetailModalProps) => {
  if (!isOpen) return null;

  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  };

  const isCancelled = booking.status.includes("cancelled");

  const totalGuests = booking.guests
    ? booking.guests.adults + booking.guests.children + booking.guests.infants
    : 1;

  const cancellationReasonMap: Record<string, string> = {
    change_of_plans: "Change of Plans",
    emergency: "Emergency",
    property_issue: "Property Issue",
    host_cancelled: "Host Cancelled",
    payment_failed: "Payment Failed",
    policy_violation: "Policy Violation",
    other: "Other",
  };

  const getCancellationReason = () => {
    return (
      cancellationReasonMap[booking.cancellation?.reason || ""] ||
      booking.cancellation?.reason ||
      "N/A"
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Booking Details
            </h2>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${
                statusColors[isCancelled ? "cancelled" : booking.status] ||
                "bg-gray-100 text-gray-800 border-gray-200"
              }`}
            >
              {isCancelled
                ? "Cancelled"
                : booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          {/* Property Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Property Information
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-80 h-48 flex-shrink-0">
                  <img
                    src={
                      booking.listing.images[0]?.url ||
                      "/placeholder-property.jpg"
                    }
                    alt={booking.listing.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {booking.listing.title}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>
                        {booking.listing.location.city},{" "}
                        {booking.listing.location.country}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <User className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>
                        Hosted by {booking.host.firstName}{" "}
                        {booking.host.lastName}
                      </span>
                    </div>
                    {booking.listing.rating?.overall && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Star className="h-5 w-5 mr-3 flex-shrink-0 text-yellow-400 fill-yellow-400" />
                        <span>{booking.listing.rating.overall} rating</span>
                      </div>
                    )}
                    {booking.listing.price && (
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        ₹{booking.listing.price.toFixed(2)}/night
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Details (if cancelled) */}
          {isCancelled && booking.cancellation && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Cancellation Details
              </h3>
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Cancellation Reason
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {getCancellationReason()}
                      </div>
                    </div>
                  </div>
                  {booking.cancellation.cancelledAt && (
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          Cancelled On
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {format(
                            new Date(booking.cancellation.cancelledAt),
                            "EEEE, MMMM d, yyyy 'at' h:mm a"
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {booking.cancellation.refundAmount && (
                    <div className="flex items-start space-x-3">
                      <CreditCard className="h-5 w-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          Refund Amount
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          ₹{booking.cancellation.refundAmount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}
                  {booking.cancellation.customReason && (
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          Additional Information
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {booking.cancellation.customReason
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (char) =>
                              char.toUpperCase()
                            )}{" "}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Booking Information Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Stay Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Stay Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Check-in
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {format(
                        new Date(booking.checkIn),
                        "EEEE, MMM d, yyyy 'at' h:mm a"
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Check-out
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {format(
                        new Date(booking.checkOut),
                        "EEEE, MMM d, yyyy 'at' h:mm a"
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Duration
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {booking.nightsCount || booking.duration || 1}{" "}
                      {(booking.nightsCount || booking.duration || 1) === 1
                        ? "night"
                        : "nights"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Guests
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {totalGuests} {totalGuests === 1 ? "guest" : "guests"}
                      {booking.guests?.pets &&
                        booking.guests.pets > 0 &&
                        `, ${booking.guests.pets} ${
                          booking.guests.pets === 1 ? "pet" : "pets"
                        }`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Guest Information
              </h3>
              <div className="space-y-4">
                {booking.guest && (
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Guest Name
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {booking.guest.fullName ||
                          `${booking.guest.firstName} ${booking.guest.lastName}`}
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Confirmation Code
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {booking.confirmationCode || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Booking Date
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {booking.createdAt
                        ? format(new Date(booking.createdAt), "MMM d, yyyy")
                        : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Pricing Breakdown
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <div className="space-y-3">
                {booking.pricing.basePrice && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      ₹{booking.pricing.basePrice} x{" "}
                      {booking.pricing.nights || booking.nightsCount || 1}{" "}
                      nights
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ₹
                      {(
                        booking.pricing.basePrice *
                        (booking.pricing.nights || booking.nightsCount || 1)
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                {booking.pricing.cleaningFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Cleaning fee
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ₹{booking.pricing.cleaningFee.toFixed(2)}
                    </span>
                  </div>
                )}
                {booking.pricing.serviceFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Service fee
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ₹{booking.pricing.serviceFee.toFixed(2)}
                    </span>
                  </div>
                )}
                {booking.pricing.taxes && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Taxes
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      ₹{booking.pricing.taxes.toFixed(2)}
                    </span>
                  </div>
                )}
                {booking.pricing.discounts?.amount && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>
                      Discount ({booking.pricing.discounts.type || "promotion"})
                    </span>
                    <span>-₹{booking.pricing.discounts.amount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3 flex justify-between font-semibold text-lg">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">
                    ₹{booking.pricing.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Protection */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <CreditCard className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Payment Method
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {booking.payment?.method
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase()) || "N/A"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Payment Status
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {booking.payment?.status
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase()) || "N/A"}
                    </div>
                  </div>
                </div>
                {booking.payment?.refundAmount && (
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Refund Amount
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        ₹{booking.payment.refundAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Protection Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Protection
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
                {booking.cancellation?.refundAmount && (
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Cancellation Refund
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        ₹{booking.cancellation.refundAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {(booking.specialRequests ||
            (booking.additionalServices &&
              booking.additionalServices.length > 0)) && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Additional Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                {booking.specialRequests && (
                  <div className="mb-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      Special Requests
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {booking.specialRequests}
                    </div>
                  </div>
                )}
                {booking.additionalServices &&
                  booking.additionalServices.length > 0 && (
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white mb-2">
                        Additional Services
                      </div>
                      <ul className="list-disc pl-5 space-y-2">
                        {booking.additionalServices.map((service, index) => (
                          <li
                            key={index}
                            className="text-gray-600 dark:text-gray-400"
                          >
                            {service.name || service.description}: ₹
                            {service.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Contact Information
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Host Contact
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <User className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>
                      {booking.host.firstName} {booking.host.lastName}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>
                      {booking.host.phone ||
                        "Phone number available after booking"}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>
                      {booking.host.email || "Email available after booking"}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Customer Support
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>+91-9876543210</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>support@stayfinder.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailModal;
