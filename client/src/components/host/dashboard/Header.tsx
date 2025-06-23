import { Plus, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";

const Header = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleMessagesClick = () => navigate("/messages");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back,{" "}
          <span className="text-blue-600">{user?.firstName || "Host"}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage your properties with ease on StayFinder.
        </p>
      </div>
      <div className="mt-4 md:mt-0 flex space-x-4">
        <Link
          to="/host/listings/new"
          className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Listing</span>
        </Link>
        <button
          onClick={handleMessagesClick}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Messages</span>
        </button>
      </div>
    </motion.div>
  );
};

export default Header;
