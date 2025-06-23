import { IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardStats } from "../../../types/booking";

interface PerformanceMetricsProps {
  stats: DashboardStats;
}

const PerformanceMetrics = ({ stats }: PerformanceMetricsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-6"
  >
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Occupancy Rate
      </h3>
      <div className="flex items-center space-x-4">
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${stats.occupancyRate || 80}%` }}
          ></div>
        </div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.occupancyRate || 80}%
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        +5% from last month
      </p>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Response Rate
      </h3>
      <div className="flex items-center space-x-4">
        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full"
            style={{ width: `${stats.responseRate || 75}%` }}
          ></div>
        </div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {stats.responseRate || 75}%
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        Excellent response time
      </p>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Revenue
      </h3>
      <div className="flex items-center space-x-4">
        <IndianRupee className="h-8 w-8 text-blue-600" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          ₹{stats.monthlyRevenue?.toLocaleString("en-IN") || "0"}
        </span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        +12% from last month
      </p>
    </div>
  </motion.div>
);

export default PerformanceMetrics;
