import React from "react";
import { Heart, MapPin, Star, Users, Bed, Bath, Trash2 } from "lucide-react";
import { Listing } from "../../types/favorites";

interface ListingCardProps {
  listing: Listing;
  isListView?: boolean;
  openConfirmation: (listingId: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  isListView = false,
  openConfirmation,
}) => (
  <div
    className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
      isListView ? "flex" : ""
    }`}
  >
    <div className={`relative ${isListView ? "w-80 flex-shrink-0" : ""}`}>
      <img
        src={
          listing.images.find((img) => img.isPrimary)?.url ||
          listing.images[0]?.url
        }
        alt={listing.title}
        className={`w-full object-cover ${isListView ? "h-48" : "h-48"}`}
      />
      <button
        onClick={() => openConfirmation(listing._id)}
        className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
      <div className="absolute top-3 left-3">
        <Heart className="w-5 h-5 text-red-500 fill-current" />
      </div>
    </div>

    <div className={`p-4 ${isListView ? "flex-1" : ""}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-600 capitalize">{listing.type}</span>
        {listing.host.hostInfo?.isSuperhost && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Superhost
          </span>
        )}
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
        {listing.title}
      </h3>

      <div className="flex items-center gap-1 mb-2 text-gray-600">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">
          {listing.location.city}, {listing.location.country}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{listing.guests} guests</span>
        </div>
        <div className="flex items-center gap-1">
          <Bed className="w-4 h-4" />
          <span>{listing.bedrooms} beds</span>
        </div>
        <div className="flex items-center gap-1">
          <Bath className="w-4 h-4" />
          <span>{listing.bathrooms} baths</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">
            {listing.rating.overall.toFixed(1)}
          </span>
          <span className="text-sm text-gray-600">
            ({listing.reviewCount} reviews)
          </span>
        </div>
        <div className="text-right">
          <span className="font-semibold text-gray-900">
            ₹{listing.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-600"> / night</span>
        </div>
      </div>
    </div>
  </div>
);

export default ListingCard;
