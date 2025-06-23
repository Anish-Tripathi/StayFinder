import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import api from "../../services/api";
import {
  BookingList,
  Filters,
  Pagination,
  BookingStatusModal,
  BookingDetailsModal,
} from "../../components/host/booking";

import { Booking, Pagination as PaginationType } from "../../types/dashboard";

const Bookings = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "",
    search: "",
  });
  const [updateStatusModal, setUpdateStatusModal] = useState<{
    show: boolean;
    booking: Booking | null;
    newStatus: string;
    reason: string;
    customReason: string;
    isUpdating: boolean;
    error: string;
  }>({
    show: false,
    booking: null,
    newStatus: "",
    reason: "",
    customReason: "",
    isUpdating: false,
    error: "",
  });
  const [detailsModal, setDetailsModal] = useState<{
    show: boolean;
    booking: Booking | null;
    isLoading: boolean;
  }>({
    show: false,
    booking: null,
    isLoading: false,
  });

  // Fetch all bookings on initial load
  useEffect(() => {
    fetchAllBookings();
  }, []);

  // Apply filters whenever filters or allBookings change
  useEffect(() => {
    applyFilters();
  }, [filters, allBookings]);

  const fetchAllBookings = async () => {
    try {
      setIsLoading(true);

      const response = await api.get(`/bookings`, {
        params: {
          role: "host",
        },
      });
      setAllBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookingDetails = async (bookingId: string) => {
    try {
      setDetailsModal((prev) => ({ ...prev, isLoading: true }));

      if (!/^[0-9a-fA-F]{24}$/.test(bookingId)) {
        throw new Error("Invalid booking ID format");
      }

      const response = await api.get(`/bookings/${bookingId}`);
      setDetailsModal({
        show: true,
        booking: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      console.error("Error fetching booking details:", error);
      toast.error(
        error.response?.data?.message || "Failed to load booking details"
      );
      setDetailsModal((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const applyFilters = () => {
    let result = [...allBookings];

    // Apply status filter
    if (filters.status) {
      result = result.filter(
        (booking: Booking) => booking.status === filters.status
      );
    }

    // Apply search filter (case insensitive)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (booking: Booking) =>
          `${booking.guest.firstName} ${booking.guest.lastName}`
            .toLowerCase()
            .includes(searchTerm) ||
          booking.listing.title.toLowerCase().includes(searchTerm) ||
          booking.confirmationCode.toLowerCase().includes(searchTerm)
      );
    }

    // Update pagination
    const totalItems = result.length;
    const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);

    setPagination((prev: PaginationType) => ({
      ...prev,
      totalItems,
      totalPages,
      currentPage: 1, // Reset to first page when filters change
    }));

    // Set filtered bookings
    setFilteredBookings(result);
  };

  // Get paginated bookings
  const getPaginatedBookings = (): Booking[] => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredBookings.slice(startIndex, endIndex);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStatusUpdateClick = (booking: Booking) => {
    setUpdateStatusModal({
      show: true,
      booking,
      newStatus: "",
      reason: "",
      customReason: "",
      isUpdating: false,
      error: "",
    });
  };

  const handleStatusUpdateConfirm = async () => {
    if (!updateStatusModal.booking) return;

    try {
      setUpdateStatusModal((prev) => ({
        ...prev,
        isUpdating: true,
        error: "",
      }));

      const payload: {
        status: string;
        reason?: string;
        customReason?: string;
      } = {
        status: updateStatusModal.newStatus,
      };
      if (updateStatusModal.newStatus.includes("cancelled")) {
        payload.reason = updateStatusModal.reason;
        if (updateStatusModal.reason === "other") {
          payload.customReason = updateStatusModal.customReason;
        }
      }

      await api.put(
        `/bookings/${updateStatusModal.booking._id}/status`,
        payload
      );

      // Update the booking in both allBookings and filteredBookings
      const updateBookingInList = (bookings: Booking[]) =>
        bookings.map((b: Booking) =>
          b._id === updateStatusModal.booking!._id
            ? { ...b, status: updateStatusModal.newStatus as Booking["status"] }
            : b
        );

      setAllBookings((prev) => updateBookingInList(prev));
      setFilteredBookings((prev) => updateBookingInList(prev));

      toast.success("Booking status updated successfully");
      setUpdateStatusModal({
        show: false,
        booking: null,
        newStatus: "",
        reason: "",
        customReason: "",
        isUpdating: false,
        error: "",
      });
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update booking status";
      setUpdateStatusModal((prev) => ({ ...prev, error: message }));
      toast.error(message);
    } finally {
      setUpdateStatusModal((prev) => ({ ...prev, isUpdating: false }));
    }
  };

  const handleStatusUpdateCancel = () => {
    setUpdateStatusModal({
      show: false,
      booking: null,
      newStatus: "",
      reason: "",
      customReason: "",
      isUpdating: false,
      error: "",
    });
  };

  const handleViewDetails = (booking: Booking) => {
    fetchBookingDetails(booking._id);
  };

  const handleMessageGuest = (booking: Booking) => {
    navigate(`/messages`);
  };

  const closeDetailsModal = () => {
    setDetailsModal({
      show: false,
      booking: null,
      isLoading: false,
    });
  };

  if (!user || user.role !== "host") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be a host to access this page.
          </p>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold">
            <span className="text-gray-900 dark:text-white">Property</span>{" "}
            <span className="text-blue-600">Bookings</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all your property bookings here
          </p>
        </motion.div>

        <Filters filters={filters} handleFilterChange={handleFilterChange} />
        <BookingList
          bookings={getPaginatedBookings()}
          isLoading={isLoading}
          handleViewDetails={handleViewDetails}
          handleStatusUpdateClick={handleStatusUpdateClick}
          handleMessageGuest={handleMessageGuest}
        />
        <Pagination pagination={pagination} setPagination={setPagination} />
        <BookingStatusModal
          updateStatusModal={updateStatusModal}
          setUpdateStatusModal={setUpdateStatusModal}
          handleStatusUpdateConfirm={handleStatusUpdateConfirm}
          handleStatusUpdateCancel={handleStatusUpdateCancel}
          userRole={user?.role as "host" | "guest" | "admin"}
        />
        <BookingDetailsModal
          detailsModal={detailsModal}
          closeDetailsModal={closeDetailsModal}
        />
      </div>
    </div>
  );
};

export default Bookings;
