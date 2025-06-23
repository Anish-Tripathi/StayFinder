import { motion } from "framer-motion";

const BookingsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 text-center"
    >
      <h1 className="text-4xl font-bold mb-2">
        <span className="text-gray-900 dark:text-white">Your </span>
        <span className="text-blue-600">Bookings</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg">
        Manage all your property bookings in one place
      </p>
    </motion.div>
  );
};

export default BookingsHeader;
