import {
  MapPin,
  Calendar,
  Users,
  SlidersHorizontal,
  Search,
  X,
} from "lucide-react";
import { SearchFilters } from "../../types/property";
import { useState } from "react";

interface SearchHeaderProps {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: any) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  viewMode: "grid" | "map";
  onToggleViewMode: () => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const SearchHeader = ({
  filters,
  onFilterChange,
  showFilters,
  onToggleFilters,
  onApplyFilters,
  onClearFilters,
}: SearchHeaderProps) => {
  // State to track if filters are applied
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Handle filter button click
  const handleFilterButtonClick = () => {
    if (filtersApplied) {
      onClearFilters();
      setFiltersApplied(false);
    } else {
      onApplyFilters();
      setFiltersApplied(true);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-700 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search Form */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Location Input */}
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="City, region, or property name"
                value={filters.location}
                onChange={(e) => onFilterChange("location", e.target.value)}
                className="w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </div>

            {/* Check-in Date */}
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="date"
                placeholder="Check-in"
                value={filters.checkIn}
                onChange={(e) => onFilterChange("checkIn", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </div>

            {/* Check-out Date */}
            <div className="relative group">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="date"
                placeholder="Check-out"
                value={filters.checkOut}
                onChange={(e) => onFilterChange("checkOut", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </div>

            {/* Guests Selector */}
            <div className="relative group">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <select
                value={filters.guests}
                onChange={(e) =>
                  onFilterChange("guests", parseInt(e.target.value))
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 appearance-none cursor-pointer"
              >
                <option value={1}>1 guest</option>
                <option value={2}>2 guests</option>
                <option value={3}>3 guests</option>
                <option value={4}>4 guests</option>
                <option value={5}>5+ guests</option>
                <option value={10}>10+ guests</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {/* Apply/Clear Filter Button */}
            <button
              onClick={handleFilterButtonClick}
              className="flex items-center space-x-2 px-4 py-3 border rounded-xl transition-all duration-200 font-medium dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-transparent hover:bg-blue-600 hover:text-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 font-medium"
              aria-label={filtersApplied ? "Clear filters" : "Apply filters"}
            >
              {filtersApplied ? (
                <>
                  <X className="h-4 w-4" />
                  <span>Clear</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span>Apply</span>
                </>
              )}
            </button>

            {/* More Filters Button */}
            <button
              onClick={onToggleFilters}
              className={`flex items-center space-x-2 px-4 py-3 border rounded-xl transition-all duration-200 font-medium ${
                showFilters
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
