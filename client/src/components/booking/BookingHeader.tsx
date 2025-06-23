import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export const BookingHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-8"
  >
    <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900 rounded-full mb-4">
      <CheckCircle className="h-8 w-8 text-success-600 dark:text-success-400" />
    </div>
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
      Booking Confirmed!
    </h1>
    <p className="text-gray-600 dark:text-gray-400">
      Your reservation has been successfully confirmed. We've sent you a
      confirmation email.
    </p>
  </motion.div>
);
