import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  Hotel,
  Landmark,
  TentTree,
  BedDouble,
  Castle,
  Wifi,
  Coffee,
  Car,
  Snowflake,
  Flame,
  BarChart3,
  Dumbbell,
  WashingMachine,
  Tv,
  Droplets,
  PawPrint,
  Leaf,
  Star,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";
import { SearchFilters } from "../../types/property";

interface FilterSidebarProps {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: any) => void;
  onClearFilters: () => void;
  onApplyFilters: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  onApplyFilters,
  showFilters,
  onToggleFilters,
}: FilterSidebarProps) => {
  // State for collapsible sections
  const [openSections, setOpenSections] = useState({
    price: true,
    propertyTypes: true,
    amenities: true,
    rating: true,
  });

  // State to track if filters are applied
  const [filtersApplied, setFiltersApplied] = useState(false);

  // Toggle section visibility
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Static property types and amenities
  const propertyTypes = [
    { id: "haveli", name: "Haveli", icon: Castle, count: 123 },
    { id: "house", name: "Independent House", icon: Home, count: 856 },
    { id: "cottage", name: "Cottage", icon: Landmark, count: 432 },
    { id: "apartment", name: "Apartment", icon: Building2, count: 1234 },
    { id: "villa", name: "Villa", icon: Home, count: 678 },
    { id: "resort", name: "Resort", icon: Hotel, count: 410 },
    { id: "bungalow", name: "Bungalow", icon: BedDouble, count: 259 },
    { id: "tent", name: "Tent", icon: TentTree, count: 90 },
    { id: "guesthouse", name: "Guest House", icon: BedDouble, count: 300 },
  ];

  const amenitiesList = [
    {
      id: "wifi",
      name: "WiFi",
      icon: Wifi,
      description: "High-speed internet access",
    },
    {
      id: "kitchen",
      name: "Kitchen",
      icon: Coffee,
      description: "Fully equipped kitchen",
    },
    {
      id: "courtyard",
      name: "Courtyard",
      icon: Leaf,
      description: "Private outdoor space",
    },
    {
      id: "parking",
      name: "Parking",
      icon: Car,
      description: "Free parking on premises",
    },
    {
      id: "air_conditioning",
      name: "AC",
      icon: Snowflake,
      description: "Air conditioning units",
    },
    {
      id: "heating",
      name: "Heating",
      icon: Flame,
      description: "Heating system",
    },
    {
      id: "elevator",
      name: "Elevator",
      icon: BarChart3,
      description: "Elevator access",
    },
    {
      id: "gym",
      name: "Gym",
      icon: Dumbbell,
      description: "On-site fitness center",
    },
    {
      id: "washer",
      name: "Washer",
      icon: WashingMachine,
      description: "Washing machine",
    },
    {
      id: "tv",
      name: "TV",
      icon: Tv,
      description: "Television with streaming",
    },
    {
      id: "pool",
      name: "Pool",
      icon: Droplets,
      description: "Private or shared pool",
    },
    {
      id: "pet_friendly",
      name: "Pet Friendly",
      icon: PawPrint,
      description: "Pets allowed",
    },
  ];

  // Price range options
  const priceRanges = [
    { label: "Any Price", value: { min: 0, max: 500000 } },
    { label: "Under ₹5,000", value: { min: 0, max: 5000 } },
    { label: "₹5,000 - ₹10,000", value: { min: 5000, max: 10000 } },
    { label: "₹10,000 - ₹20,000", value: { min: 10000, max: 20000 } },
    { label: "₹20,000 - ₹30,000", value: { min: 20000, max: 30000 } },
    { label: "₹30,000 - ₹50,000", value: { min: 30000, max: 50000 } },
    { label: "₹50,000 - ₹75,000", value: { min: 50000, max: 75000 } },
    { label: "₹75,000+", value: { min: 75000, max: 500000 } },
  ];

  // Toggle property type filter
  const togglePropertyType = (type: string) => {
    onFilterChange(
      "propertyTypes",
      filters.propertyTypes.includes(type)
        ? filters.propertyTypes.filter((t) => t !== type)
        : [...filters.propertyTypes, type]
    );
  };

  // Toggle amenity filter
  const toggleAmenity = (amenity: string) => {
    onFilterChange(
      "amenities",
      filters.amenities.includes(amenity)
        ? filters.amenities.filter((a) => a !== amenity)
        : [...filters.amenities, amenity]
    );
  };

  // Handle price range change
  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    onFilterChange("minPrice", range.min);
    onFilterChange("maxPrice", range.max);
  };

  // Get current price range label
  const getCurrentPriceRangeLabel = () => {
    const range = priceRanges.find(
      (r) =>
        r.value.min === filters.minPrice && r.value.max === filters.maxPrice
    );
    return range ? range.label : `₹${filters.minPrice} - ₹${filters.maxPrice}`;
  };

  // Calculate active filters count
  const activeFiltersCount =
    filters.propertyTypes.length +
    filters.amenities.length +
    (filters.minPrice > 0 || filters.maxPrice < 500000 ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0);

  // Handle filter button click
  const handleFilterButtonClick = () => {
    if (filtersApplied) {
      onClearFilters();
      setFiltersApplied(false);
    } else {
      onApplyFilters();
      setFiltersApplied(true);
      if (window.innerWidth < 1024) {
        onToggleFilters();
      }
    }
  };

  return (
    <AnimatePresence>
      {showFilters && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onToggleFilters}
            aria-label="Close filters"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 z-50 lg:relative lg:z-0 overflow-y-auto shadow-xl lg:shadow-none border-r border-gray-200 dark:border-gray-700"
          >
            <div className="p-4 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleFilterButtonClick}
                    className="flex items-center justify-center px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200 font-medium"
                    aria-label={
                      filtersApplied ? "Clear filters" : "Apply filters"
                    }
                  >
                    {filtersApplied ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Clear
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Apply
                      </>
                    )}
                  </button>
                  <button
                    onClick={onToggleFilters}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline lg:hidden"
                    aria-label="Close filter sidebar"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Scrollable Filter Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Price Range Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("price")}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-white py-2"
                    aria-expanded={openSections.price}
                    aria-controls="price-section"
                  >
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 mr-2 text-blue-500" />
                      Monthly Rent
                    </div>
                    {openSections.price ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openSections.price && (
                      <motion.div
                        id="price-section"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <select
                          value={getCurrentPriceRangeLabel()}
                          onChange={(e) => {
                            const selectedRange = priceRanges.find(
                              (r) => r.label === e.target.value
                            );
                            if (selectedRange) {
                              handlePriceRangeChange(selectedRange.value);
                            }
                          }}
                          className="w-full px-3 py-2 mt-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                          aria-label="Select price range"
                        >
                          {priceRanges.map((range) => (
                            <option key={range.label} value={range.label}>
                              {range.label}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Property Types Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("propertyTypes")}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-white py-2"
                    aria-expanded={openSections.propertyTypes}
                    aria-controls="property-types-section"
                  >
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-2 text-blue-500" />
                      Property Type
                    </div>
                    {openSections.propertyTypes ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openSections.propertyTypes && (
                      <motion.div
                        id="property-types-section"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden space-y-2 mt-2"
                      >
                        {propertyTypes.map((type) => (
                          <label
                            key={type.id}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={filters.propertyTypes.includes(
                                  type.id
                                )}
                                onChange={() => togglePropertyType(type.id)}
                                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                aria-label={`Select ${type.name}`}
                              />
                              <type.icon className="h-4 w-4 ml-2 mr-2 text-gray-600 dark:text-gray-300" />
                              <span className="text-sm text-gray-900 dark:text-white">
                                {type.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {type.count}
                            </span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Amenities Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("amenities")}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-white py-2"
                    aria-expanded={openSections.amenities}
                    aria-controls="amenities-section"
                  >
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-blue-500" />
                      Amenities
                    </div>
                    {openSections.amenities ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openSections.amenities && (
                      <motion.div
                        id="amenities-section"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden grid grid-cols-2 gap-2 mt-2"
                      >
                        {amenitiesList.map((amenity) => (
                          <label
                            key={amenity.id}
                            className="group relative flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={filters.amenities.includes(amenity.id)}
                              onChange={() => toggleAmenity(amenity.id)}
                              className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                              aria-label={`Select ${amenity.name}`}
                            />
                            <amenity.icon className="h-4 w-4 ml-2 mr-2 text-gray-600 dark:text-gray-300" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {amenity.name}
                            </span>
                            <span className="absolute hidden group-hover:block text-xs text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 p-2 rounded-md -top-10 left-1/2 transform -translate-x-1/2 z-10">
                              {amenity.description}
                            </span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Rating Section */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleSection("rating")}
                    className="flex items-center justify-between w-full text-left font-semibold text-gray-900 dark:text-white py-2"
                    aria-expanded={openSections.rating}
                    aria-controls="rating-section"
                  >
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-blue-500" />
                      Minimum Rating
                    </div>
                    {openSections.rating ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openSections.rating && (
                      <motion.div
                        id="rating-section"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() =>
                                onFilterChange(
                                  "rating",
                                  filters.rating === star ? 0 : star
                                )
                              }
                              className={`p-1 rounded-md transition-colors ${
                                filters.rating >= star
                                  ? "text-yellow-400"
                                  : "text-gray-300 dark:text-gray-600 hover:text-yellow-300"
                              }`}
                              aria-label={`Set minimum rating to ${star} stars`}
                            >
                              <Star className="h-5 w-5 fill-current" />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;
