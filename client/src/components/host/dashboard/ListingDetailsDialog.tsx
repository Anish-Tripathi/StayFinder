import { Listing } from "../../../types/booking";

interface ListingDetailsDialogProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
}

const ListingDetailsDialog = ({
  listing,
  isOpen,
  onClose,
}: ListingDetailsDialogProps) => {
  if (!isOpen || !listing) return null;

  const formatPrice = (price: number, currency: string) => {
    return `${currency === "INR" ? "₹" : "$"}${price.toLocaleString()}`;
  };

  const formatAmenity = (amenity: string) => {
    return amenity.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {listing.title}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {listing.location.city}, {listing.location.country}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {listing.rating && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {listing.rating.overall} ({listing.reviewCount} reviews)
                  </p>
                )}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Images */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Photos
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {listing.images.map((image, index) => (
                    <div key={image._id} className="relative">
                      <img
                        src={image.url}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {image.isPrimary && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Property Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Property Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {listing.guests}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Guests
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {listing.bedrooms}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Bedrooms
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {listing.beds}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Beds
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {listing.bathrooms}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Bathrooms
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                    >
                      {formatAmenity(amenity)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Pricing
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Nightly Rate
                    </span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(listing.price, listing.currency)}
                    </span>
                  </div>
                  {listing?.cleaningFee && listing.cleaningFee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Cleaning Fee
                      </span>
                      <span className="text-gray-900 dark:text-white">
                        {formatPrice(listing.cleaningFee, listing.currency)}
                      </span>
                    </div>
                  )}

                  {listing?.weeklyDiscount && listing.weeklyDiscount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Weekly Discount
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        -{listing.weeklyDiscount}%
                      </span>
                    </div>
                  )}

                  {listing?.monthlyDiscount && listing.monthlyDiscount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">
                        Monthly Discount
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        -{listing.monthlyDiscount}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* House Rules */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  House Rules
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Check-in
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {listing.houseRules.checkIn.from} -{" "}
                      {listing.houseRules.checkIn.to}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Check-out
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {listing.houseRules.checkOut}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div
                      className={`p-2 rounded text-center ${
                        listing.houseRules.smokingAllowed
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {listing.houseRules.smokingAllowed ? "✓" : "✗"} Smoking
                    </div>
                    <div
                      className={`p-2 rounded text-center ${
                        listing.houseRules.petsAllowed
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {listing.houseRules.petsAllowed ? "✓" : "✗"} Pets
                    </div>
                    <div
                      className={`p-2 rounded text-center ${
                        listing.houseRules.partiesAllowed
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {listing.houseRules.partiesAllowed ? "✓" : "✗"} Parties
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Booking Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Property Type
                    </span>
                    <span className="text-gray-900 dark:text-white capitalize">
                      {listing.type} • {listing.category.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Min Stay
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {listing.availability.minStay} night
                      {listing.availability.minStay > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Cancellation
                    </span>
                    <span className="text-gray-900 dark:text-white capitalize">
                      {listing.cancellationPolicy}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Instant Book
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        listing.instantBook
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200"
                      }`}
                    >
                      {listing.instantBook ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>{listing.views} views</span>
            <span>•</span>

            {listing.featured && (
              <>
                <span>•</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  Featured
                </span>
              </>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsDialog;
