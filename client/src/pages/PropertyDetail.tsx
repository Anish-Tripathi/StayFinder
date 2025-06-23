import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import {
  PropertyHeader,
  PropertyImageGallery,
  PropertyInfo,
  PropertyAmenities,
  PropertyReviews,
  PropertyBookingCard,
} from "../components/propertydetail";
import { Property, Guests, BookingDetails } from "../types/property";

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get(`/listings/${id}`);
      const propertyData: Property = response.data;

      propertyData.images = propertyData.images?.length
        ? propertyData.images
        : [
            {
              url: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
              isPrimary: true,
              _id: "default",
            },
          ];

      setProperty(propertyData);
    } catch (error) {
      console.error("Error fetching property:", error);
      setError("Property not found or failed to load");
      toast.error("Property not found");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = (
    listingId: string,
    checkIn: Date,
    checkOut: Date,
    guests: Guests,
    specialRequests: string
  ) => {
    if (!user) {
      toast.error("Please login to book this property");
      navigate("/login", {
        state: {
          from: `/properties/${id}`,
          message: "Please login to continue with your booking",
        },
      });
      return;
    }

    if (checkIn >= checkOut) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    const totalGuests =
      guests.adults + (guests.children || 0) + (guests.infants || 0);
    if (property && totalGuests > property.guests) {
      toast.error(
        `This property can accommodate maximum ${property.guests} guests`
      );
      return;
    }

    const pricing = (state as { pricing?: BookingDetails["pricing"] })
      ?.pricing || {
      nights: differenceInDays(checkOut, checkIn),
      basePrice: property!.price,
      subtotal: property!.price * differenceInDays(checkOut, checkIn),
      serviceFee: property!.price * differenceInDays(checkOut, checkIn) * 0.14,
      taxes: property!.price * differenceInDays(checkOut, checkIn) * 0.18,
      totalPrice:
        property!.price * differenceInDays(checkOut, checkIn) +
        property!.price * differenceInDays(checkOut, checkIn) * 0.14 +
        property!.price * differenceInDays(checkOut, checkIn) * 0.18,
      currency: "INR",
    };

    const bookingDetails: BookingDetails = {
      listingId,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests,
      property: {
        _id: property!._id,
        title: property!.title,
        description: property!.description,
        location: property!.location,
        price: property!.price,
        rating: property!.rating,
        reviewCount: property!.reviewCount,
        images: property!.images,
        type: property!.type,
        amenities: property!.amenities || [],
        bedrooms: property!.bedrooms,
        bathrooms: property!.bathrooms,
        beds: property!.beds,
        instantBook: property!.instantBook,
        area: property!.area,
        guests: property!.guests,
        host: property!.host,
        reviews: property!.reviews,
        availability: property!.availability,
        createdAt: property!.createdAt,
        isBooked: property!.isBooked,
        cleaningFee: property!.cleaningFee,
        category: property!.category,
        isFavorite: property!.isFavorite,
        weeklyDiscount: property!.weeklyDiscount,
        monthlyDiscount: property!.monthlyDiscount,
        currency: property!.currency || "INR",
        cancellationPolicy: property!.cancellationPolicy,
        securityDeposit: property!.securityDeposit,
        additionalFees: property!.additionalFees,
        houseRules: property!.houseRules,
      },
      pricing,
      specialRequests,
    };

    navigate("/payment", { state: bookingDetails });
  };

  if (isLoading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProperty} />;
  if (!property) return <ErrorMessage message="Property not found" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="space-y-8">
        <PropertyHeader property={property} />
        <div className="rounded-xl overflow-hidden shadow-lg">
          <PropertyImageGallery
            images={property.images}
            title={property.title}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <PropertyInfo property={property} />
            </section>
            <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Amenities
              </h2>
              <PropertyAmenities amenities={property.amenities || []} />
            </section>
            <section className="bg-white rounded-xl p-6 shadow-sm">
              <PropertyReviews property={property} />
            </section>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <PropertyBookingCard
                property={property}
                onBooking={handleBooking}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetail;
