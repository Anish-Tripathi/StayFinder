import { motion } from "framer-motion";
import { Booking } from "../../../types/dashboard";

interface UpdateStatusModalProps {
  updateStatusModal: {
    show: boolean;
    booking: Booking | null;
    newStatus: string;
    reason: string;
    customReason: string;
    isUpdating: boolean;
    error: string;
  };
  setUpdateStatusModal: React.Dispatch<
    React.SetStateAction<{
      show: boolean;
      booking: Booking | null;
      newStatus: string;
      reason: string;
      customReason: string;
      isUpdating: boolean;
      error: string;
    }>
  >;
  handleStatusUpdateConfirm: () => void;
  handleStatusUpdateCancel: () => void;
  userRole: "host" | "guest";
}

const BookingStatusModal = ({
  updateStatusModal,
  setUpdateStatusModal,
  handleStatusUpdateConfirm,
  handleStatusUpdateCancel,
  userRole,
}: UpdateStatusModalProps) => {
  const isCancellation = updateStatusModal.newStatus.includes("cancelled");

  return (
    <>
      {updateStatusModal.show && updateStatusModal.booking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Update Booking Status
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Update status for booking at{" "}
              {updateStatusModal.booking.listing.title}
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Status
              </label>
              <select
                value={updateStatusModal.newStatus}
                onChange={(e) =>
                  setUpdateStatusModal((prev) => ({
                    ...prev,
                    newStatus: e.target.value,
                    reason: "", // Reset reason when status changes
                    customReason: "", // Reset custom reason
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="">Select Status</option>
                {userRole === "host" && (
                  <>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled_by_host">Cancel by Host</option>
                  </>
                )}
                {userRole === "guest" && (
                  <option value="cancelled_by_guest">Cancel by Guest</option>
                )}
              </select>
            </div>

            {isCancellation && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cancellation Reason
                </label>
                <select
                  value={updateStatusModal.reason}
                  onChange={(e) =>
                    setUpdateStatusModal((prev) => ({
                      ...prev,
                      reason: e.target.value,
                      customReason:
                        e.target.value !== "other" ? "" : prev.customReason,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Select Reason</option>
                  <option value="change_of_plans">Change of Plans</option>
                  <option value="emergency">Emergency</option>
                  <option value="property_issue">Property Issue</option>
                  <option value="host_cancelled">Host Cancelled</option>
                  <option value="payment_failed">Payment Failed</option>
                  <option value="policy_violation">Policy Violation</option>
                  <option value="other">Other</option>
                </select>
                {updateStatusModal.reason === "other" && (
                  <textarea
                    value={updateStatusModal.customReason}
                    onChange={(e) =>
                      setUpdateStatusModal((prev) => ({
                        ...prev,
                        customReason: e.target.value,
                      }))
                    }
                    placeholder="Enter custom reason for cancellation (max 500 characters)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    rows={4}
                    maxLength={500}
                  />
                )}
              </div>
            )}

            {updateStatusModal.error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
                <p className="text-red-600 dark:text-red-400 text-sm">
                  {updateStatusModal.error}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={handleStatusUpdateCancel}
                className="flex-1 text-sm py-2 px-4 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50"
                disabled={updateStatusModal.isUpdating}
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdateConfirm}
                className="flex-1 text-sm py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 disabled:opacity-50"
                disabled={
                  updateStatusModal.isUpdating ||
                  !updateStatusModal.newStatus ||
                  (isCancellation && !updateStatusModal.reason) ||
                  (updateStatusModal.reason === "other" &&
                    !updateStatusModal.customReason)
                }
              >
                {updateStatusModal.isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default BookingStatusModal;
