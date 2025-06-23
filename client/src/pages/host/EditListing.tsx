import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Listing } from "../../types/booking";
import { useAuthStore } from "@/store/authStore";
import api from "../../services/api";
import EditListingForm from "../../components/host/edit-listing/EditListingForm";

const EditListing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState<Listing | null>(null);
  const [formData, setFormData] = useState<Listing>({
    title: "",
    description: "",
    type: "villa",
    category: "entire_place",
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      neighborhood: "",
      coordinates: [0, 0],
    },
    price: 0,
    currency: "USD",
    cleaningFee: 0,
    securityDeposit: 0,
    weeklyDiscount: 0,
    monthlyDiscount: 0,
    amenities: [],
    images: [],
    houseRules: {
      checkIn: { from: "15:00", to: "20:00" },
      checkOut: "11:00",
      smokingAllowed: false,
      petsAllowed: false,
      partiesAllowed: false,
      quietHours: { from: "", to: "" },
      additionalRules: [],
    },
    availability: {
      minStay: 1,
      maxStay: 30,
      advanceNotice: 1,
      preparationTime: 1,
      calendar: [],
    },
    status: "active",
    tags: [],
    featured: false,
    instantBook: false,
    cancellationPolicy: "moderate",
    additionalFees: [],
    license: { number: "", type: "", expiryDate: "" },
    host: "",
  });

  useEffect(() => {
    const initializeListing = async () => {
      try {
        setIsLoading(true);

        // Check if user is authenticated
        if (!user) {
          toast.error("Please log in to edit listings");
          navigate("/login");
          return;
        }

        if (!id) {
          throw new Error("No listing ID provided");
        }

        const response = await api.get(`/listings/${id}`);
        const listingData = response.data;

        setListing(listingData);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...listingData,
          location: {
            ...prevFormData.location,
            ...listingData.location,
          },
          houseRules: {
            ...prevFormData.houseRules,
            ...listingData.houseRules,
            quietHours: listingData.houseRules?.quietHours || {
              from: "",
              to: "",
            },
          },
          license: listingData.license || {
            number: "",
            type: "",
            expiryDate: "",
          },
        }));
      } catch (error) {
        console.error("Error initializing listing:", error);
        toast.error("Failed to load listing details");
        navigate("/host");
      } finally {
        setIsLoading(false);
      }
    };

    initializeListing();
  }, [id, navigate, user]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to edit listings.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <EditListingForm
      formData={formData}
      setFormData={setFormData}
      listing={listing!} //not null insertion
      navigate={navigate}
    />
  );
};

export default EditListing;
