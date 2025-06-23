import { motion } from "framer-motion";
import {
  CreditCard,
  Download,
  QrCode,
  HandCoins,
  HelpCircle,
} from "lucide-react";
import { Booking as BookingType } from "../../types/booking";
import { Booking as HistoryBookingType } from "../../types/history";
import ShareTripButton from "@/pages/ShareTripButton";

import { Link } from "react-router-dom";
import { useState } from "react";
import ReceiptModal from "../booking-history/ReceiptModal";

interface BookingSummaryProps {
  booking: BookingType;
}

export const BookingSummary = ({ booking }: BookingSummaryProps) => {
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const handleDownloadReceipt = () => {
    setIsReceiptModalOpen(true);
  };

  const handleCloseReceiptModal = () => {
    setIsReceiptModalOpen(false);
  };

  const handleDownload = () => {
    setIsReceiptModalOpen(false);
  };

  const historyBooking: HistoryBookingType = {
    _id: booking._id,
    status: booking.status,
    listing: {
      _id: booking.listing._id,
      title: booking.listing.title,
      images: booking.listing.images.map((img) => ({ url: img.url })),
      location: booking.listing.location,
      rating: booking.rating ? { overall: booking.rating } : undefined,
      price: booking.listing.price,
      amenities: booking.listing.amenities,
      guests: booking.guests,
    },
    host: {
      _id: booking.listing.host._id,
      firstName: booking.listing.host.firstName,
      lastName: booking.listing.host.lastName,
    },
    checkIn: booking.checkIn,
    checkOut: booking.checkOut,
    pricing: {
      totalPrice: booking.pricing.totalPrice,
      basePrice: booking.pricing.basePrice,
      cleaningFee: booking.pricing.cleaningFee,
      serviceFee: booking.pricing.serviceFee,
      taxes: booking.pricing.taxes,
      nights: booking.pricing.nights,
      subtotal: booking.pricing.subtotal,
      currency: booking.pricing.currency,
      discounts: booking.pricing.discounts
        ? {
            amount:
              booking.pricing.discounts.coupon.amount ||
              booking.pricing.discounts.weekly ||
              booking.pricing.discounts.monthly,
            type: booking.pricing.discounts.coupon.amount
              ? "coupon"
              : booking.pricing.discounts.weekly
              ? "weekly"
              : "monthly",
          }
        : undefined,
    },
    confirmationCode: booking.confirmationCode,
    guests: booking.guests,
    nightsCount: booking.pricing.nights,
    payment: booking.payment
      ? {
          method: booking.payment.method,
          status: booking.payment.status,
          refundAmount: booking.payment.refundAmount,
        }
      : undefined,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Booking Summary
        </h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Confirmation Code
            </span>
            <span className="font-mono font-semibold text-gray-900 dark:text-white">
              {booking.confirmationCode}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Booking Date
            </span>
            <span className="text-gray-900 dark:text-white">
              {new Date(booking.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Status</span>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200">
              {booking.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Special Requests
            </span>
            <span className="text-gray-900 dark:text-white text-right max-w-[60%]">
              {booking.specialRequests?.trim()
                ? booking.specialRequests
                : "Not Available"}
            </span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Pricing Breakdown
          </h3>
          {booking.pricing.basePrice && booking.pricing.nights ? (
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                ₹{booking.pricing.basePrice.toFixed(2)} ×{" "}
                {booking.pricing.nights} night
                {booking.pricing.nights !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-900 dark:text-white">
                ₹
                {(booking.pricing.basePrice * booking.pricing.nights).toFixed(
                  2
                )}
              </span>
            </div>
          ) : null}
          {booking.pricing.cleaningFee && booking.pricing.cleaningFee > 0 ? (
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                Cleaning Fee
              </span>
              <span className="text-gray-900 dark:text-white">
                ₹{booking.pricing.cleaningFee.toFixed(2)}
              </span>
            </div>
          ) : null}
          {booking.pricing.serviceFee && booking.pricing.serviceFee > 0 ? (
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">
                Service Fee
              </span>
              <span className="text-gray-900 dark:text-white">
                ₹{booking.pricing.serviceFee.toFixed(2)}
              </span>
            </div>
          ) : null}
          {booking.pricing.taxes && booking.pricing.taxes > 0 ? (
            <div className="flex justify-between mb-2">
              <span className="text-gray-600 dark:text-gray-400">Taxes</span>
              <span className="text-gray-900 dark:text-white">
                ₹{booking.pricing.taxes.toFixed(2)}
              </span>
            </div>
          ) : null}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Total Paid
            </span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              ₹{booking.pricing.totalPrice?.toFixed(2) || "0.00"}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
            {booking.payment.method === "credit_card" && (
              <>
                <CreditCard className="h-4 w-4 mr-1" />
                <span>Paid with credit card</span>
              </>
            )}
            {booking.payment.method === "upi" && (
              <>
                <QrCode className="h-4 w-4 mr-1" />
                <span>Paid via UPI</span>
              </>
            )}
            {booking.payment.method === "cash" && (
              <>
                <HandCoins className="h-4 w-4 mr-1" />
                <span>Cash on arrival</span>
              </>
            )}
            {!["credit_card", "upi", "cash"].includes(
              booking.payment.method
            ) && (
              <>
                <HelpCircle className="h-4 w-4 mr-1 text-yellow-500" />
                <span>Payment method: {booking.payment.method}</span>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDownloadReceipt}
            className="w-full btn-primary flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Receipt</span>
          </button>

          <ShareTripButton bookingId={booking._id} />
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">
            Need Help?
          </h3>
          <div className="space-y-2 text-sm">
            <Link
              to="/feedback"
              className="block text-primary-600 dark:text-primary-400 hover:underline"
            >
              Let Us Know
            </Link>
            <Link
              to="/feedback"
              className="block text-primary-600 dark:text-primary-400 hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </motion.div>

      <ReceiptModal
        booking={historyBooking}
        isOpen={isReceiptModalOpen}
        onClose={handleCloseReceiptModal}
        onDownload={handleDownload}
      />
    </>
  );
};
