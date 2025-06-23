import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { propertyTypes, amenitiesList } from "../../utils/history";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    dateRange: [Date | null, Date | null];
    priceRange: [number, number];
    propertyType: string[];
    amenities: string[];
  };
  onApplyFilters: (filters: {
    dateRange: [Date | null, Date | null];
    priceRange: [number, number];
    propertyType: string[];
    amenities: string[];
  }) => void;
}

const FilterSidebar = ({
  isOpen,
  onClose,
  filters: initialFilters,
  onApplyFilters,
}: FilterSidebarProps) => {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateRange: [null, null] as [Date | null, Date | null],
      priceRange: [0, 1000] as [number, number],
      propertyType: [] as string[],
      amenities: [] as string[],
    };
    setFilters(resetFilters);
  };

  // Format date for input
  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  // Parse date from input
  const parseDateFromInput = (dateString: string) => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-hidden z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={onClose}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  {/* Date Range Filter */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Dates
                    </h3>
                    <div className="flex flex-col space-y-2">
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Check-in date
                        </label>
                        <input
                          type="date"
                          value={formatDateForInput(filters.dateRange[0])}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              dateRange: [
                                parseDateFromInput(e.target.value),
                                filters.dateRange[1],
                              ],
                            })
                          }
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                          Check-out date
                        </label>
                        <input
                          type="date"
                          value={formatDateForInput(filters.dateRange[1])}
                          min={formatDateForInput(filters.dateRange[0])}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              dateRange: [
                                filters.dateRange[0],
                                parseDateFromInput(e.target.value),
                              ],
                            })
                          }
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      {filters.dateRange[0] || filters.dateRange[1] ? (
                        <button
                          onClick={() =>
                            setFilters({
                              ...filters,
                              dateRange: [null, null],
                            })
                          }
                          className="text-xs text-blue-600 dark:text-blue-400 hover:underline self-start"
                        >
                          Clear dates
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Price range (₹{filters.priceRange[0]} - ₹
                      {filters.priceRange[1]})
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Min price
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="1000"
                            value={filters.priceRange[0]}
                            onChange={(e) => {
                              const min = parseInt(e.target.value) || 0;
                              setFilters({
                                ...filters,
                                priceRange: [
                                  Math.min(min, filters.priceRange[1]),
                                  filters.priceRange[1],
                                ],
                              });
                            }}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                            Max price
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="1000"
                            value={filters.priceRange[1]}
                            onChange={(e) => {
                              const max = parseInt(e.target.value) || 1000;
                              setFilters({
                                ...filters,
                                priceRange: [
                                  filters.priceRange[0],
                                  Math.max(max, filters.priceRange[0]),
                                ],
                              });
                            }}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          step="50"
                          value={filters.priceRange[1]}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              priceRange: [
                                filters.priceRange[0],
                                parseInt(e.target.value),
                              ],
                            })
                          }
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Type Filter */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Property type
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            id={`type-${type}`}
                            name="property-type"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={filters.propertyType.includes(type)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters({
                                  ...filters,
                                  propertyType: [...filters.propertyType, type],
                                });
                              } else {
                                setFilters({
                                  ...filters,
                                  propertyType: filters.propertyType.filter(
                                    (t) => t !== type
                                  ),
                                });
                              }
                            }}
                          />
                          <label
                            htmlFor={`type-${type}`}
                            className="ml-3 text-sm text-gray-700 dark:text-gray-300 capitalize"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                    {filters.propertyType.length > 0 && (
                      <button
                        onClick={() =>
                          setFilters({
                            ...filters,
                            propertyType: [],
                          })
                        }
                        className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Clear property types ({filters.propertyType.length})
                      </button>
                    )}
                  </div>

                  {/* Amenities Filter */}
                  <div className="mb-8">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Amenities
                    </h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <input
                            id={`amenity-${amenity}`}
                            name="amenities"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            checked={filters.amenities.includes(amenity)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilters({
                                  ...filters,
                                  amenities: [...filters.amenities, amenity],
                                });
                              } else {
                                setFilters({
                                  ...filters,
                                  amenities: filters.amenities.filter(
                                    (a) => a !== amenity
                                  ),
                                });
                              }
                            }}
                          />
                          <label
                            htmlFor={`amenity-${amenity}`}
                            className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                          >
                            {amenity
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </label>
                        </div>
                      ))}
                    </div>
                    {filters.amenities.length > 0 && (
                      <button
                        onClick={() =>
                          setFilters({
                            ...filters,
                            amenities: [],
                          })
                        }
                        className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Clear amenities ({filters.amenities.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 py-6 px-4 sm:px-6">
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    onClick={handleResetFilters}
                  >
                    Reset all
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    onClick={handleApplyFilters}
                  >
                    Apply filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
