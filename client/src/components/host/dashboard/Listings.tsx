import { Home } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Listing } from "../../../types/booking";
import ListingCard from "./ListingCard";

interface ListingsProps {
  listings: Listing[];
  isLoading: boolean;
  onViewClick: (listing: Listing) => void;
  onDeleteClick: (listing: Listing) => void;
}

const Listings = ({
  listings,
  isLoading,
  onViewClick,
  onDeleteClick,
}: ListingsProps) => {
  console.log("Listings received:", listings);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          <span className="text-gray-900 dark:text-white">Your </span>
          <span className="text-blue-600">Listings</span>
        </h2>

        <Link
          to="/host/listings/new"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          <Home className="h-5 w-5" />
          <span>Add New</span>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-12">
          <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No listings yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start earning by listing your first property on StayFinder.
          </p>
          <Link
            to="/host/listings/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              onViewClick={onViewClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Listings;
