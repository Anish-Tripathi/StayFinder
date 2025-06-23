import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Listing } from "../../../types/booking";

interface DeleteModalProps {
  show: boolean;
  listing: Listing | null;
  isDeleting: boolean;
  deleteError: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({
  show,
  listing,
  isDeleting,
  deleteError,
  onConfirm,
  onCancel,
}: DeleteModalProps) => {
  if (!show || !listing) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
            <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Listing
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete "{listing.title}"? This action cannot
          be undone.
        </p>
        {deleteError && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
            <p className="text-red-800 dark:text-red-200 text-sm">
              {deleteError}
            </p>
          </div>
        )}
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 transition-colors"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteModal;
