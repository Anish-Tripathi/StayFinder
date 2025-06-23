import React, { useState, useEffect } from "react";
import {
  Heart,
  Grid3X3,
  List,
  Filter,
  SortAsc,
  SortDesc,
  X,
} from "lucide-react";
import ListingCard from "../components/favorites/ListingCard";
import FiltersPanel from "../components/favorites/FiltersPanel";
import { Listing } from "../types/favorites";

const Favorites: React.FC = () => {
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [listingToRemove, setListingToRemove] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    propertyType: "",
    priceMin: "",
    priceMax: "",
    guestCount: "",
  });

  // Fetch all favorites
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/favorites?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setAllListings(data.listings || []);
      setListings(data.listings || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      alert("Failed to load favorites. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Remove from favorites
  const removeFromFavorites = async () => {
    if (!listingToRemove) return;

    try {
      await fetch(`/api/favorites/${listingToRemove}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAllListings(
        allListings.filter((listing) => listing._id !== listingToRemove)
      );
      setListings(
        listings.filter((listing) => listing._id !== listingToRemove)
      );
      setShowConfirmation(false);
      setListingToRemove(null);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filteredListings = [...allListings];

    // Apply filters
    if (filters.propertyType) {
      filteredListings = filteredListings.filter(
        (listing) => listing.type === filters.propertyType
      );
    }
    if (filters.priceMin) {
      filteredListings = filteredListings.filter(
        (listing) => listing.price >= Number(filters.priceMin)
      );
    }
    if (filters.priceMax) {
      filteredListings = filteredListings.filter(
        (listing) => listing.price <= Number(filters.priceMax)
      );
    }
    if (filters.guestCount) {
      filteredListings = filteredListings.filter(
        (listing) => listing.guests >= Number(filters.guestCount)
      );
    }

    // Apply sorting
    filteredListings.sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortBy === "rating") {
        return sortOrder === "asc"
          ? a.rating.overall - b.rating.overall
          : b.rating.overall - a.rating.overall;
      } else {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setListings(filteredListings);
  }, [filters, sortBy, sortOrder, allListings]);

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("desc");
    }
  };

  const openConfirmation = (listingId: string) => {
    setListingToRemove(listingId);
    setShowConfirmation(true);
  };

  const handleApplyFilters = (newFilters: typeof filters) => {
    if (
      newFilters.priceMin &&
      newFilters.priceMax &&
      Number(newFilters.priceMin) > Number(newFilters.priceMax)
    ) {
      alert("Minimum price cannot be greater than maximum price.");
      return;
    }

    setFilters(newFilters);
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Remove from favorites
              </h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this property from your favorites?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={removeFromFavorites}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 text-center mt-2">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-900">Your </span>
            <span className="text-blue-600">Favourites</span>
          </h1>
          <p className="text-gray-600 mt-2">
            {allListings.length} saved properties
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mt-12 mb-5" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600">
              Start exploring and save properties you love!
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex bg-white rounded-lg shadow-sm border">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-l-lg ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-r-lg ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">
                  Sort by:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSortChange("price")}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm border ${
                      sortBy === "price"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "text-gray-600 hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    Price
                    {sortBy === "price" &&
                      (sortOrder === "asc" ? (
                        <SortAsc className="w-3 h-3" />
                      ) : (
                        <SortDesc className="w-3 h-3" />
                      ))}
                  </button>
                  <button
                    onClick={() => handleSortChange("rating")}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm border ${
                      sortBy === "rating"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "text-gray-600 hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    Rating
                    {sortBy === "rating" &&
                      (sortOrder === "asc" ? (
                        <SortAsc className="w-3 h-3" />
                      ) : (
                        <SortDesc className="w-3 h-3" />
                      ))}
                  </button>
                  <button
                    onClick={() => handleSortChange("createdAt")}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm border ${
                      sortBy === "createdAt"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "text-gray-600 hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    Recently Added
                    {sortBy === "createdAt" &&
                      (sortOrder === "asc" ? (
                        <SortAsc className="w-3 h-3" />
                      ) : (
                        <SortDesc className="w-3 h-3" />
                      ))}
                  </button>
                </div>
              </div>
            </div>

            {showFilters && (
              <FiltersPanel
                filters={filters}
                setFilters={setFilters}
                setShowFilters={setShowFilters}
                onApplyFilters={handleApplyFilters}
                propertyTypes={[...new Set(allListings.map((l) => l.type))]}
              />
            )}

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {listings.map((listing) => (
                <ListingCard
                  key={listing._id}
                  listing={listing}
                  isListView={viewMode === "list"}
                  openConfirmation={openConfirmation}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
