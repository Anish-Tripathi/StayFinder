import { Booking } from "../../../types/dashboard";
import { motion } from "framer-motion";
import { X, XCircle } from "lucide-react";
import BookingInfoSection from "./BookingInfoSection";
import BookingDetailsSection from "./BookingDetailsSection";

interface BookingDetailsModalProps {
  detailsModal: {
    show: boolean;
    booking: Booking | null;
    isLoading: boolean;
  };
  closeDetailsModal: () => void;
}

const BookingDetailsModal = ({
  detailsModal,
  closeDetailsModal,
}: BookingDetailsModalProps) => {
  const getStatusProps = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return {
          icon: "CheckCircle",
          className:
            "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
          text: "Confirmed",
        };
      case "pending":
        return {
          icon: "Clock",
          className:
            "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
          text: "Pending",
        };
      case "in_progress":
        return {
          icon: "AlertCircle",
          className:
            "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
          text: "In Progress",
        };
      case "completed":
        return {
          icon: "CheckCircle",
          className:
            "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/30 dark:text-gray-300 dark:border-gray-800",
          text: "Completed",
        };
      case "cancelled":
        return {
          icon: "XCircle",
          className:
            "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
          text: "Cancelled",
        };
      default:
        return {
          icon: "XCircle",
          className:
            "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
          text: status
            .replace("_", " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        };
    }
  };

  return (
    <>
      {detailsModal.show && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col"
          >
            {detailsModal.isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Loading booking details...
                </p>
              </div>
            ) : detailsModal.booking ? (
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex-shrink-0">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Booking Details
                    </h2>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      #{detailsModal.booking.confirmationCode}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {(() => {
                      const statusProps = getStatusProps(
                        detailsModal.booking.status
                      );
                      return (
                        <div
                          className={`inline-flex items-center px-3 py-2 rounded-lg border ${statusProps.className}`}
                        >
                          <span className="font-medium">
                            {statusProps.text}
                          </span>
                        </div>
                      );
                    })()}
                    <button
                      onClick={closeDetailsModal}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="size-6" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <BookingInfoSection booking={detailsModal.booking} />
                      <BookingDetailsSection booking={detailsModal.booking} />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end bg-gray-50 dark:bg-gray-700/50 flex-shrink-0">
                  <button
                    onClick={closeDetailsModal}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <XCircle className="size-12 text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Booking Not Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The booking details could not be loaded.
                </p>
                <button
                  onClick={closeDetailsModal}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BookingDetailsModal;
