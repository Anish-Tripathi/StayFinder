import { Booking } from "../../../types/dashboard";
import {
  Calendar,
  CreditCard,
  Globe,
  MessageSquare,
  Shield,
  Tag,
} from "lucide-react";

interface BookingDetailsSectionProps {
  booking: Booking;
}

const BookingDetailsSection = ({ booking }: BookingDetailsSectionProps) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Dates & Booking Info */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
            <Calendar className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
            Booking Information
          </h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Check-in
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {formatDateTime(booking.checkIn)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Check-out
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {formatDateTime(booking.checkOut)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              Duration
            </p>
            <p className="text-gray-900 dark:text-white font-medium">
              {calculateNights(booking.checkIn, booking.checkOut)} nights
            </p>
          </div>
          {booking.source && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Booking Source
              </p>
              <div className="flex items-center">
                <Globe className="size-4 mr-2 text-blue-500" />
                <span className="text-gray-900 dark:text-white font-medium capitalize">
                  {booking.source}
                </span>
              </div>
            </div>
          )}
          {booking.createdAt && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Booked on
              </p>
              <p className="text-gray-900 dark:text-white font-medium">
                {formatDateTime(booking.createdAt)}
              </p>
            </div>
          )}
          {booking.updatedAt && (
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Last Updated
              </p>
              <p className="text-gray-900 dark:text-white font-medium">
                {formatDateTime(booking.updatedAt)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
            <CreditCard className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
            Pricing Breakdown
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">
              Base Price ({booking?.pricing?.nights ?? 0} nights)
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {formatCurrency(
                booking?.pricing?.subtotal ?? 0,
                booking?.pricing?.currency ?? "USD"
              )}
            </span>
          </div>
          {(booking?.pricing?.cleaningFee ?? 0) > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Cleaning Fee
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(
                  booking.pricing.cleaningFee ?? 0,
                  booking.pricing.currency ?? "USD"
                )}
              </span>
            </div>
          )}
          {(booking?.pricing?.serviceFee ?? 0) > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Service Fee
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(
                  booking.pricing.serviceFee ?? 0,
                  booking.pricing.currency ?? "USD"
                )}
              </span>
            </div>
          )}
          {(booking?.pricing?.taxes ?? 0) > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Taxes</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatCurrency(
                  booking.pricing.taxes ?? 0,
                  booking.pricing.currency ?? "USD"
                )}
              </span>
            </div>
          )}
          {(booking?.pricing?.discounts?.weekly ?? 0) > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-green-600 dark:text-green-400">
                Weekly Discount
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                -
                {formatCurrency(
                  booking.pricing.discounts?.weekly ?? 0,
                  booking.pricing.currency ?? "USD"
                )}
              </span>
            </div>
          )}
          {(booking?.pricing?.discounts?.monthly ?? 0) > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-green-600 dark:text-green-400">
                Monthly Discount
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                -
                {formatCurrency(
                  booking.pricing.discounts?.monthly ?? 0,
                  booking.pricing.currency ?? "USD"
                )}
              </span>
            </div>
          )}
          {(booking?.pricing?.discounts?.coupon ?? 0) > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-green-600 dark:text-green-400 flex items-center">
                <Tag className="size-4 mr-1" />
                Coupon Discount
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                -
                {formatCurrency(
                  booking.pricing.discounts?.coupon ?? 0,
                  booking.pricing.currency ?? "USD"
                )}
              </span>
            </div>
          )}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total
              </span>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatCurrency(
                  booking?.pricing?.totalPrice ?? 0,
                  booking?.pricing?.currency ?? "USD"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      {booking?.payment && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
              <CreditCard className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
              Payment Information
            </h3>
          </div>
          <div className="space-y-3">
            {booking.payment.method && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Payment Method
                </span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">
                  {booking.payment.method.replace("_", " ")}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Payment Status
              </span>
              <span
                className={`font-medium capitalize ${
                  booking.payment.status === "paid"
                    ? "text-green-600 dark:text-green-400"
                    : booking.payment.status === "pending"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {booking.payment.status}
              </span>
            </div>
            {(booking.payment.refundAmount ?? 0) > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Refund Amount
                </span>
                <span className="font-medium text-red-600 dark:text-red-400">
                  -
                  {formatCurrency(
                    booking.payment.refundAmount ?? 0,
                    booking.pricing?.currency ?? "USD"
                  )}
                </span>
              </div>
            )}
            {booking.payment.transactionId && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">
                  Transaction ID
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {booking.payment.transactionId}
                </span>
              </div>
            )}
            {booking.payment.paidAt && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Paid on
                </p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {formatDateTime(booking.payment.paidAt)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Special Requests */}
      {booking?.specialRequests && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
              <MessageSquare className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
              Special Requests
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {booking.specialRequests}
          </p>
        </div>
      )}

      {/* Cancellation Policy */}
      {booking?.cancellationPolicy && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
              <Shield className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
              Cancellation Policy
            </h3>
          </div>
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300 capitalize">
              {typeof booking.cancellationPolicy === "string"
                ? booking.cancellationPolicy.replace(/_/g, " ")
                : (
                    booking.cancellationPolicy as { type: string }
                  )?.type?.replace(/_/g, " ")}
            </p>
            {typeof booking.cancellationPolicy !== "string" &&
              (booking.cancellationPolicy as { description?: string })
                ?.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {
                    (booking.cancellationPolicy as { description: string })
                      .description
                  }
                </p>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsSection;
