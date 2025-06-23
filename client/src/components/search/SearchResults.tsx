import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, MapPinIcon, SortAsc, Filter, SearchX } from "lucide-react";
import { Property, SearchFilters } from "../../types/property";
import PropertyGrid from "./PropertyGrid";
import MapView from "./MapView";

interface SearchResultsProps {
  properties: Property[];
  filters: SearchFilters;
  isLoading: boolean;
  onClearFilters: () => void;
}

type SortOption =
  | "relevance"
  | "price_low"
  | "price_high"
  | "rating"
  | "newest";

const SearchResults = ({
  properties,
  filters,
  isLoading,
  onClearFilters,
}: SearchResultsProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // Calculate center based on properties or use a default
  const center = useMemo<[number, number] | null>(() => {
    if (properties.length === 0) {
      return [40.7128, -74.006];
    }

    // Calculate average coordinates from properties
    const validProperties = properties.filter(
      (p) =>
        p.location?.coordinates &&
        Array.isArray(p.location.coordinates) &&
        p.location.coordinates.length === 2 &&
        typeof p.location.coordinates[0] === "number" &&
        typeof p.location.coordinates[1] === "number" &&
        !isNaN(p.location.coordinates[0]) &&
        !isNaN(p.location.coordinates[1])
    );

    if (validProperties.length === 0) {
      return [40.7128, -74.006]; // Fallback if no valid coordinates
    }

    const avgLat =
      validProperties.reduce((sum, p) => sum + p.location.coordinates[0], 0) /
      validProperties.length;
    const avgLng =
      validProperties.reduce((sum, p) => sum + p.location.coordinates[1], 0) /
      validProperties.length;

    return [avgLat, avgLng];
  }, [properties]);

  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
  ];

  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        return (b.rating?.overall ?? 0) - (a.rating?.overall ?? 0);
      case "newest":
        return (
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
        );
      default:
        return 0;
    }
  });

  const hasActiveFilters =
    filters.minPrice > 0 ||
    filters.maxPrice < 1000 ||
    filters.propertyTypes.length > 0 ||
    filters.amenities.length > 0 ||
    filters.rating > 0;

  if ((viewMode as "map") === "map") {
    return (
      <MapView
        properties={sortedProperties}
        fullProperties={properties}
        onClose={() => setViewMode("grid")}
        center={center}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            {filters.location ? (
              <>
                <span className="text-gray-900">Stays in </span>
                <span className="text-primary-600">{filters.location}</span>
              </>
            ) : (
              <>
                <span className="text-gray-900">Explore </span>
                <span className="text-primary-600">All Stays</span>
              </>
            )}
          </h1>

          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                {properties.length} propert
                {properties.length === 1 ? "y" : "ies"} found
                {hasActiveFilters && (
                  <span className="ml-2 text-primary-600 dark:text-primary-400">
                    (filtered)
                  </span>
                )}
              </>
            )}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* View Toggle */}
          <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            {/* Grid Button */}
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>

            {/* Map Button with Tooltip */}
            <div className="relative group">
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  viewMode === "map"
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                aria-label="Map view"
              >
                <MapPinIcon className="h-4 w-4" />
              </button>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                Toggle to Map View
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap items-center gap-2 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800"
          >
            <Filter className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Active filters:
            </span>

            {filters.minPrice > 0 && (
              <span
                className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary- macrophages
              300 rounded-full text-xs"
              >
                Min: ${filters.minPrice}
              </span>
            )}

            {filters.maxPrice < 1000 && (
              <span className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                Max: ${filters.maxPrice}
              </span>
            )}

            {filters.propertyTypes.map((type) => (
              <span
                key={type}
                className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-full text-xs"
              >
                {type}
              </span>
            ))}

            {filters.amenities.map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-full text-xs"
              >
                {amenity}
              </span>
            ))}

            {filters.rating > 0 && (
              <span className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 rounded-full text-xs">
                {filters.rating}+ stars
              </span>
            )}

            <button
              onClick={onClearFilters}
              className="ml-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200 font-medium"
            >
              Clear all
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Content */}
      {!isLoading && properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <SearchX className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No properties found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            We couldn't find any properties matching your criteria. Try
            adjusting your filters or search terms.
          </p>
          <div className="space-x-4">
            <button
              onClick={onClearFilters}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </motion.div>
      ) : (
        <PropertyGrid properties={sortedProperties} isLoading={isLoading} />
      )}
    </div>
  );
};

export default SearchResults;
