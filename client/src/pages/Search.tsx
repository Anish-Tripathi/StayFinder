import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import SearchHeader from "../components/search/SearchHeader";
import FilterSidebar from "../components/search/FilterSidebar";
import SearchResults from "../components/search/SearchResults";
import { Property, SearchFilters } from "../types/property";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Applied filters
  const [appliedFilters, setAppliedFilters] = useState<SearchFilters>({
    location: searchParams.get("q") || "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    minPrice: 0,
    maxPrice: 500000,
    propertyTypes: [],
    amenities: [],
    rating: 0,
  });

  // Temporary filters
  const [tempFilters, setTempFilters] = useState<SearchFilters>({
    location: searchParams.get("q") || "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    minPrice: 0,
    maxPrice: 500000,
    propertyTypes: [],
    amenities: [],
    rating: 0,
  });

  useEffect(() => {
    const fetchAllProperties = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/listings?fetchAll=true");
        const properties = response.data.listings || [];

        setAllProperties(properties);
        setFilteredProperties(properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setAllProperties([]);
        setFilteredProperties([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      if (!allProperties || !Array.isArray(allProperties)) {
        console.warn("No properties available to filter");
        setFilteredProperties([]);
        return;
      }

      let result = [...allProperties];

      console.log("Applying Filters:", appliedFilters);

      // Filter by location
      if (appliedFilters.location && appliedFilters.location.trim()) {
        const locationLower = appliedFilters.location.toLowerCase();
        result = result.filter(
          (property) =>
            property.title?.toLowerCase().includes(locationLower) ||
            property.location?.city?.toLowerCase().includes(locationLower) ||
            property.location?.address?.toLowerCase().includes(locationLower) ||
            property.location?.state?.toLowerCase().includes(locationLower) ||
            property.location?.country?.toLowerCase().includes(locationLower) ||
            property.location?.neighborhood
              ?.toLowerCase()
              .includes(locationLower)
        );
      }

      // Filter by check-in/check-out dates
      if (appliedFilters.checkIn && appliedFilters.checkOut) {
        const checkInDate = new Date(appliedFilters.checkIn);
        const checkOutDate = new Date(appliedFilters.checkOut);

        if (
          isNaN(checkInDate.getTime()) ||
          isNaN(checkOutDate.getTime()) ||
          checkInDate >= checkOutDate
        ) {
          console.warn(
            "Invalid check-in or check-out date:",
            appliedFilters.checkIn,
            appliedFilters.checkOut
          );
        } else {
          result = result.filter((property) => {
            const unavailableDates = property.availability?.calendar || [];

            // Create array of requested dates
            const requestedDates = [];
            const currentDate = new Date(checkInDate);

            while (currentDate < checkOutDate) {
              requestedDates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }

            // Check if any requested date conflicts with unavailable dates
            return !requestedDates.some((reqDate) =>
              unavailableDates.some((unavailableDate) => {
                const unavailable = new Date(unavailableDate);
                return unavailable.toDateString() === reqDate.toDateString();
              })
            );
          });
        }
      }

      // Filter by guests
      if (appliedFilters.guests >= 1) {
        result = result.filter(
          (property) => (property.guests || 0) >= appliedFilters.guests
        );
      }

      // Filter by price range
      if (appliedFilters.minPrice > 0) {
        result = result.filter(
          (property) => property.price >= appliedFilters.minPrice
        );
      }
      if (appliedFilters.maxPrice < 500000) {
        result = result.filter(
          (property) => property.price <= appliedFilters.maxPrice
        );
      }

      // Filter by property types
      if (appliedFilters.propertyTypes.length > 0) {
        result = result.filter((property) =>
          appliedFilters.propertyTypes.includes(property.type.toLowerCase())
        );
      }

      // Filter by amenities
      if (appliedFilters.amenities.length > 0) {
        result = result.filter((property) =>
          appliedFilters.amenities.every((amenity) =>
            property.amenities.includes(amenity)
          )
        );
      }

      // Filter by rating
      if (appliedFilters.rating > 0) {
        result = result.filter(
          (property) => property.rating.overall >= appliedFilters.rating
        );
      }

      setFilteredProperties(result);
    };

    applyFilters();
  }, [appliedFilters, allProperties]);

  // Handle temporary filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Apply temporary filters to actual filters
  const applyFilters = () => {
    setAppliedFilters({ ...tempFilters });
  };

  // Clear all filters
  const clearFilters = () => {
    const defaultFilters = {
      location: searchParams.get("q") || "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      minPrice: 0,
      maxPrice: 500000,
      propertyTypes: [],
      amenities: [],
      rating: 0,
    };
    setTempFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

  const toggleViewMode = () => {
    setShowMap((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <SearchHeader
        filters={tempFilters}
        onFilterChange={handleFilterChange}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        viewMode={showMap ? "map" : "grid"}
        onToggleViewMode={toggleViewMode}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar
            filters={tempFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            onApplyFilters={applyFilters}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />
          <div className="flex-1">
            <SearchResults
              filters={appliedFilters}
              properties={filteredProperties}
              isLoading={isLoading}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
