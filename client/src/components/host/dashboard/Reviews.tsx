import { Star } from "lucide-react";
import { motion } from "framer-motion";
import RecentReviews from "./RecentReviews";

const Reviews = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">
        <span className="text-gray-900 dark:text-white">Guest </span>
        <span className="text-blue-600">Reviews</span>
      </h2>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Average Rating:
        </span>
        <div className="flex items-center">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 font-medium">4.8</span>
          <span className="text-sm text-gray-500 ml-1">(128 reviews)</span>
        </div>
      </div>
    </div>
    <RecentReviews />
  </motion.div>
);

export default Reviews;
