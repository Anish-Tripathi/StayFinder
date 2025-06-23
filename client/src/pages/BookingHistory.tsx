import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Filter, Search } from "lucide-react";
import BookingCard from "../components/booking-history/BookingCard";
import FilterSidebar from "../components/booking-history/FilterSidebar";
import api from "../services/api";
import { Booking } from "../types/history";

interface FilterOptions {
  dateRange: [Date | null, Date | null];
  priceRange: [number, number];
  propertyType: string[];
  amenities: string[];
}

const BookingHistory = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled" | "confirmed"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterOptions>({
    dateRange: [null, null],
    priceRange: [0, 1000],
    propertyType: [],
    amenities: [],
  });

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get<{ bookings: Booking[] }>(
          "/bookings?role=guest"
        );
        // Convert string dates to Date objects
        const bookingsWithDates = response.data.bookings.map((booking) => ({
          ...booking,
          checkIn: new Date(booking.checkIn),
          checkOut: new Date(booking.checkOut),
          createdAt: booking.createdAt
            ? new Date(booking.createdAt)
            : undefined,
          updatedAt: booking.updatedAt
            ? new Date(booking.updatedAt)
            : undefined,
        }));
        setBookings(bookingsWithDates);
        setFilteredBookings(bookingsWithDates);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Apply filters whenever any filter changes
  useEffect(() => {
    if (bookings.length === 0) return;

    let result = [...bookings];

    // Status filter
    if (activeFilter !== "all") {
      result = result.filter((booking) => {
        if (activeFilter === "cancelled") {
          return (
            booking.status === "cancelled_by_host" ||
            booking.status === "cancelled_by_guest" ||
            booking.status === "cancelled"
          );
        }
        return booking.status === activeFilter;
      });
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.listing.title.toLowerCase().includes(query) ||
          booking.listing.location.city.toLowerCase().includes(query) ||
          booking.listing.location.country.toLowerCase().includes(query)
      );
    }

    if (advancedFilters.dateRange[0] && advancedFilters.dateRange[1]) {
      const [startDate, endDate] = advancedFilters.dateRange;
      result = result.filter((booking) => {
        const checkIn =
          booking.checkIn instanceof Date
            ? booking.checkIn
            : new Date(booking.checkIn);
        const checkOut =
          booking.checkOut instanceof Date
            ? booking.checkOut
            : new Date(booking.checkOut);

        return (
          (checkIn >= startDate && checkIn <= endDate) ||
          (checkOut >= startDate && checkOut <= endDate) ||
          (checkIn <= startDate && checkOut >= endDate)
        );
      });
    }

    // Price range filter
    if (
      advancedFilters.priceRange[1] < 1000 ||
      advancedFilters.priceRange[0] > 0
    ) {
      result = result.filter(
        (booking) =>
          booking.pricing.totalPrice >= advancedFilters.priceRange[0] &&
          booking.pricing.totalPrice <= advancedFilters.priceRange[1]
      );
    }

    // Property type filter
    if (advancedFilters.propertyType.length > 0) {
      result = result.filter((booking) =>
        advancedFilters.propertyType.includes(booking.listing.type)
      );
    }

    // Amenities filter
    if (advancedFilters.amenities.length > 0) {
      result = result.filter((booking) => {
        if (
          !booking.listing.amenities ||
          booking.listing.amenities.length === 0
        )
          return false;
        return advancedFilters.amenities.every((amenity) =>
          booking.listing.amenities?.includes(amenity)
        );
      });
    }

    setFilteredBookings(result);
  }, [activeFilter, searchQuery, bookings, advancedFilters]);

  const handleDownloadReceipt = async (bookingId: string) => {
    try {
      const response = await api.get(`/bookings/${bookingId}/receipt`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `receipt-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading receipt:", error);
      alert("Failed to download receipt. Please try again.");
    }
  };

  // Check if filters are active
  const areFiltersActive = () => {
    return (
      activeFilter !== "all" ||
      searchQuery !== "" ||
      advancedFilters.dateRange[0] !== null ||
      advancedFilters.dateRange[1] !== null ||
      advancedFilters.priceRange[0] !== 0 ||
      advancedFilters.priceRange[1] !== 1000 ||
      advancedFilters.propertyType.length > 0 ||
      advancedFilters.amenities.length > 0
    );
  };

  const clearAllFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
    setAdvancedFilters({
      dateRange: [null, null],
      priceRange: [0, 1000],
      propertyType: [],
      amenities: [],
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h3 className="text-lg font-medium text-red-800 mb-2">Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-gray-900 dark:text-white">Your</span>{" "}
            <span className="text-blue-600">Bookings</span>
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your upcoming, completed, cancelled, and confirmed bookings
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {["all", "upcoming", "completed", "cancelled", "confirmed"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter(
                      filter as
                        | "all"
                        | "upcoming"
                        | "completed"
                        | "cancelled"
                        | "confirmed"
                    )
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? "bg-primary-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              )
            )}
          </div>

          {/* Search and Advanced Filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search bookings by title, city, or country..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                areFiltersActive() ? "ring-2 ring-primary-500" : ""
              }`}
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {areFiltersActive() && (
                <span className="bg-primary-600 text-white rounded-full w-2 h-2"></span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {areFiltersActive() && (
          <div className="mb-6 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
              <span>Filters applied</span>
              <span className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded">
                {filteredBookings.length} of {bookings.length} bookings
              </span>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Booking List */}
        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onDownloadReceipt={handleDownloadReceipt}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-24 w-24 text-gray-400">
                <Calendar className="w-full h-full" />
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No bookings found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {!areFiltersActive()
                  ? "You don't have any bookings yet."
                  : "No bookings match your current filters. Try adjusting your search criteria."}
              </p>
              <div className="mt-6 flex gap-4 justify-center">
                {areFiltersActive() && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Clear filters
                  </button>
                )}
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Browse listings
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={advancedFilters}
        onApplyFilters={(filters: FilterOptions) => {
          setAdvancedFilters(filters);
          setIsFilterOpen(false);
        }}
      />
    </div>
  );
};

export default BookingHistory;
