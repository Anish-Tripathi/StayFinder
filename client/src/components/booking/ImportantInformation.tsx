import { motion } from "framer-motion";

export const ImportantInformation = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="card p-6"
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Important Information
    </h2>
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">
          House Rules
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Check-in: 3:00 PM - 9:00 PM</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Check-out: 11:00 AM</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>No smoking</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>No pets allowed</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>No parties or events</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-3">
          Cancellation Policy
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Free cancellation until 48 hours before check-in. After that, cancel
          before check-in and get a 50% refund, minus service fees.
        </p>
      </div>
    </div>
  </motion.div>
);
