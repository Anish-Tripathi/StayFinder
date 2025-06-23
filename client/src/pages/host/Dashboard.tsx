import { useState, useEffect } from "react";
import { Home, Calendar, IndianRupee, Star } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useAuthStore } from "../../store/authStore";
import { DashboardStats, Listing, Booking } from "../../types/booking";
import {
  Header,
  StatCard,
  Tabs,
  Listings,
  Bookings,
  Reviews,
  DeleteModal,
  RecentBookings,
  RecentReviews,
  PerformanceMetrics,
  ListingDetailsDialog,
} from "@/components/host/dashboard";

const HostDashboard = () => {
  const { user } = useAuthStore();

  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0,
    occupancyRate: 0,
    responseRate: 0,
    monthlyRevenue: 0,
  });
  const [listings, setListings] = useState<Listing[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<Listing | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsRes, listingsRes, bookingsRes] = await Promise.all([
        api.get("/host/stats"),
        api.get("/host/listings"),
        api.get("/bookings?role=host&limit=5"),
      ]);

      setStats(statsRes.data);
      setListings(Array.isArray(listingsRes.data) ? listingsRes.data : []);

      let bookingsArr = [];
      if (Array.isArray(bookingsRes.data)) {
        bookingsArr = bookingsRes.data;
      } else if (Array.isArray(bookingsRes.data?.bookings)) {
        bookingsArr = bookingsRes.data.bookings;
      }
      setRecentBookings(bookingsArr);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (listing: Listing) => {
    setListingToDelete(listing);
    setShowDeleteModal(true);
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (!listingToDelete) return;

    try {
      setIsDeleting(true);
      setDeleteError("");

      await api.delete(`/listings/${listingToDelete._id}`);

      setListings((prev) =>
        prev.filter((listing) => listing._id !== listingToDelete._id)
      );
      setStats((prev) => ({
        ...prev,
        totalListings: (prev.totalListings || 0) - 1,
        totalRevenue: (prev.totalRevenue || 0) - (listingToDelete.revenue || 0),
      }));

      toast.success("Listing deleted successfully");
      setShowDeleteModal(false);
      setListingToDelete(null);
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to delete listing";
      setDeleteError(message);
      toast.error(message);
      console.error("Error deleting listing:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setListingToDelete(null);
    setDeleteError("");
  };

  const handleViewClick = (listing: Listing) => {
    setSelectedListing(listing);
    setShowDetailsDialog(true);
  };

  const handleViewClose = () => {
    setShowDetailsDialog(false);
    setSelectedListing(null);
  };

  const statCards = [
    {
      title: "Total Listings",
      value: stats.totalListings?.toString() || "0",
      icon: Home,
      color: "bg-blue-600",
      change: "+2 this month",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings?.toString() || "0",
      icon: Calendar,
      color: "bg-green-600",
      change: "+12 this month",
    },
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue?.toLocaleString("en-IN") || "0"}`,
      icon: IndianRupee,
      color: "bg-yellow-600",
      change: "+18% this month",
    },
    {
      title: "Average Rating",
      value: stats.averageRating?.toFixed(1) || "0.0",
      icon: Star,
      color: "bg-purple-600",
      change: "+0.2 this month",
    },
  ];

  if (!user || user.role !== "host") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need to be a host to access this dashboard.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              change={stat.change}
            />
          ))}
        </div>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="space-y-8">
          {activeTab === "overview" && (
            <>
              <RecentBookings bookings={recentBookings} isLoading={isLoading} />
              <PerformanceMetrics stats={stats} />
              <RecentReviews />
            </>
          )}
          {activeTab === "listings" && (
            <Listings
              listings={listings}
              isLoading={isLoading}
              onViewClick={handleViewClick}
              onDeleteClick={handleDeleteClick}
            />
          )}
          {activeTab === "bookings" && (
            <Bookings bookings={recentBookings} isLoading={isLoading} />
          )}
          {activeTab === "reviews" && <Reviews />}
        </div>
        <DeleteModal
          show={showDeleteModal}
          listing={listingToDelete}
          isDeleting={isDeleting}
          deleteError={deleteError}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
        <ListingDetailsDialog
          listing={selectedListing}
          isOpen={showDetailsDialog}
          onClose={handleViewClose}
        />
      </div>
    </div>
  );
};

export default HostDashboard;
