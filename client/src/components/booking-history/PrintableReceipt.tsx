import { Calendar, MapPin, User, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { Booking } from "../../types/history";

interface PrintableReceiptProps {
  booking: Booking;
}

const PrintableReceipt = ({ booking }: PrintableReceiptProps) => {
  const totalGuests = booking.guests
    ? booking.guests.adults + booking.guests.children + booking.guests.infants
    : 1;

  return (
    <>
      {/* Company Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          <span className="text-gray-900 dark:text-white">Stay</span>
          <span className="text-blue-600 dark:text-blue-500">Finder</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Professional Accommodation Services
        </p>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-4"></div>
      </div>

      {/* Receipt Details */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Receipt Details
          </h3>
          <div className="space-y-3">
            <div className="flex">
              <span className="text-gray-500 dark:text-gray-400 min-w-[120px]">
                Receipt #:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {booking.confirmationCode ||
                  booking._id.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500 dark:text-gray-400 min-w-[120px]">
                Date Issued:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {format(
                  new Date(booking.createdAt || new Date()),
                  "MMM d, yyyy"
                )}
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500 dark:text-gray-400 min-w-[120px]">
                Status:
              </span>
              <span className="font-medium text-gray-900 dark:text-white capitalize">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {booking.status}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
            Booking Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <Calendar className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {format(new Date(booking.checkIn), "MMM d, yyyy")} -{" "}
                  {format(new Date(booking.checkOut), "MMM d, yyyy")}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {booking.nightsCount ||
                    booking.pricing.nights ||
                    booking.duration ||
                    1}{" "}
                  night(s)
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
              <div className="font-medium text-gray-900 dark:text-white">
                {totalGuests} guest{totalGuests !== 1 ? "s" : ""}
              </div>
            </div>
            {booking.payment && (
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white capitalize">
                    {booking.payment.method}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm capitalize">
                    {booking.payment.status}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
          Property Details
        </h3>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">
            {booking.listing.title}
          </h4>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            {booking.listing.location.city}, {booking.listing.location.country}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <User className="h-4 w-4 mr-2 flex-shrink-0" />
            Hosted by {booking.host.firstName} {booking.host.lastName}
          </div>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          Pricing Breakdown
        </h3>
        <div className="space-y-3">
          {booking.pricing.basePrice && booking.pricing.nights && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                ₹{booking.pricing.basePrice.toFixed(2)} ×{" "}
                {booking.pricing.nights} night
                {booking.pricing.nights !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                ₹
                {(booking.pricing.basePrice * booking.pricing.nights).toFixed(
                  2
                )}
              </span>
            </div>
          )}

          {booking.pricing.cleaningFee && booking.pricing.cleaningFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Cleaning Fee
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                ₹{booking.pricing.cleaningFee.toFixed(2)}
              </span>
            </div>
          )}

          {booking.pricing.serviceFee && booking.pricing.serviceFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Service Fee
              </span>
              <span className="text-gray-900 dark:text-white font-medium">
                ₹{booking.pricing.serviceFee.toFixed(2)}
              </span>
            </div>
          )}

          {booking.pricing.taxes && booking.pricing.taxes > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Taxes</span>
              <span className="text-gray-900 dark:text-white font-medium">
                ₹{booking.pricing.taxes.toFixed(2)}
              </span>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ₹{booking.pricing.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-6">
        <p>Thank you for choosing StayFinder!</p>
        <p className="mt-1">
          For support, contact us at support@stayfinder.com
        </p>
        <p className="mt-2 text-xs opacity-75">
          This is an automated receipt. No signature required.
        </p>
      </div>
    </>
  );
};

export default PrintableReceipt;
