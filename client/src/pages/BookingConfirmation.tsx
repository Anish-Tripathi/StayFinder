import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../services/api";
import {
  BookingHeader,
  PropertyInfo,
  TripDetails,
  BookingSummary,
  HostInformation,
  ImportantInformation,
  NextSteps,
} from "../components/booking";

import { Booking } from "../types/booking";

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id]);

  const fetchBooking = async () => {
    try {
      const response = await api.get(`/bookings/${id}`);
      if (response.data) {
        const bookingData = {
          ...response.data,
          host: response.data.host || response.data.listing?.host,
          listing: {
            ...response.data.listing,
            images: response.data.listing?.images || [],
          },
        };
        setBooking(bookingData);
      } else {
        console.error("No booking data received");
        setBooking(null);
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
      setBooking(null);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateNights = () => {
    if (!booking) return 0;
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Booking not found
          </h2>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const nights = calculateNights();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <BookingHeader />

        <div className="space-y-8">
          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Left Column  */}
            <div className="lg:col-span-6 space-y-6">
              <PropertyInfo booking={booking} />
              <TripDetails booking={booking} nights={nights} />
              <HostInformation booking={booking} />
              <ImportantInformation />
            </div>

            {/* Right Column  */}
            <div className="lg:col-span-4 space-y-8">
              <BookingSummary booking={booking} />
            </div>
          </div>

          {/* Full Width Next Steps Section */}
          <NextSteps />
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
