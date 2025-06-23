import { motion } from "framer-motion";

import RecentBookings from "./RecentBookings";
import { Booking } from "../../../types/booking";

interface BookingsProps {
  bookings: Booking[];
  isLoading: boolean;
}

const Bookings = ({ bookings, isLoading }: BookingsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
  >
    <RecentBookings bookings={bookings} isLoading={isLoading} />
  </motion.div>
);

export default Bookings;
