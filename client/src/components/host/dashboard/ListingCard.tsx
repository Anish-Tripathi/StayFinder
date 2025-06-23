import {
  Eye,
  Edit,
  Trash2,
  Home,
  Users,
  Bed,
  Bath,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Listing } from "../../../types/booking";

interface ListingCardProps {
  listing: Listing;
  onViewClick: (listing: Listing) => void;
  onDeleteClick: (listing: Listing) => void;
}

const ListingCard = ({
  listing,
  onViewClick,
  onDeleteClick,
}: ListingCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <img
          src={
            listing.images[0]?.url ||
            "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400"
          }
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              listing.status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : listing.status === "inactive"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
            }`}
          >
            {listing.status}
          </span>
          {listing.featured && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg truncate max-w-[70%]">
            {listing.title}
          </h3>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{listing.price.toLocaleString("en-IN")}
            <span className="text-sm font-normal text-gray-500">/night</span>
          </span>
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {listing.location.city}, {listing.location.country}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Users className="h-5 w-5 mb-1 text-gray-700 dark:text-gray-300" />
            <span className="text-xs font-medium">
              {listing.guests} {listing.guests === 1 ? "guest" : "guests"}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Bed className="h-5 w-5 mb-1 text-gray-700 dark:text-gray-300" />
            <span className="text-xs font-medium">
              {listing.bedrooms} {listing.bedrooms === 1 ? "bed" : "beds"}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Bath className="h-5 w-5 mb-1 text-gray-700 dark:text-gray-300" />
            <span className="text-xs font-medium">
              {listing.bathrooms} {listing.bathrooms === 1 ? "bath" : "baths"}
            </span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Home className="h-5 w-5 mb-1 text-gray-700 dark:text-gray-300" />
            <span className="text-xs font-medium">{listing.type}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
            {listing.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {listing.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {listing.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full">
              +{listing.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onViewClick(listing)}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-1" />
            Details
          </button>
          <Link
            to={`/host/listings/${listing._id}/edit`}
            state={{ listing }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Link>
          <button
            onClick={() => onDeleteClick(listing)}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
