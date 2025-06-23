import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Calendar, User, Download, Star } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { Booking } from "../../types/booking";

interface BookingCardProps {
  booking: Booking;
  onDownloadReceipt: (bookingId: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onDownloadReceipt,
}) => {
  const navigate = useNavigate();
  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800",
  };

  if (!booking?.listing) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">
          No booking details available
        </p>
      </div>
    );
  }

  const handleReserve = () => {
    // Calculate number of nights
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const nights = differenceInDays(checkOut, checkIn);

    // Calculate pricing details
    const basePrice = booking.listing.price; // Price per night
    const subtotal = basePrice * nights;
    const serviceFee = subtotal * 0.1; // 10% service fee
    const taxes = subtotal * 0.12; // 12% taxes
    const totalPrice = booking.totalPrice || subtotal + serviceFee + taxes;

    navigate(`/properties/${booking.listing._id}`, {
      state: {
        listingId: booking.listing._id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: {
          adults: booking.guests.adults,
          children: booking.guests.children || 0,
          infants: booking.guests.infants || 0,
          pets: booking.guests.pets || 0,
        },
        property: {
          _id: booking.listing._id,
          title: booking.listing.title,
          price: booking.listing.price,
          location: booking.listing.location,
          guests:
            (booking.guests.adults || 0) +
            (booking.guests.children || 0) +
            (booking.guests.infants || 0),
          images: booking.listing.images || [],
          amenities: booking.listing.amenities || [],
          host: booking.listing.host,
          currency: "INR",
        },
        pricing: {
          nights,
          basePrice,
          subtotal,
          serviceFee,
          taxes,
          totalPrice,
          currency: "INR",
        },
      },
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="p-6 sm:flex sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-24 w-24 rounded-lg overflow-hidden">
              <img
                src={
                  booking.listing.images?.[0]?.url ||
                  "/placeholder-property.jpg"
                }
                alt={booking.listing.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  <Link to={`/bookings/${booking._id}`}>
                    {booking.listing.title}
                  </Link>
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[booking.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {booking.status.replace(/_/g, " ")}
                </span>
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                {booking.listing.location.city},{" "}
                {booking.listing.location.country}
              </div>
              <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Star className="flex-shrink-0 mr-1.5 h-4 w-4 text-yellow-400 fill-yellow-400" />
                {booking.rating || "N/A"} · 0 reviews
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <User className="flex-shrink-0 mr-1.5 h-4 w-4" />
                Hosted by {booking.listing.host.firstName}{" "}
                {booking.listing.host.lastName}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex sm:flex-col sm:items-end">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4" />
            {format(new Date(booking.checkIn), "MMM d, yyyy")} -{" "}
            {format(new Date(booking.checkOut), "MMM d, yyyy")}
          </div>
          <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            ₹{(booking.totalPrice || 0).toFixed(2)}
          </div>
          <div className="mt-2 flex space-x-3">
            <button
              onClick={() => onDownloadReceipt(booking._id)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Download className="-ml-0.5 mr-1.5 h-4 w-4" />
              Receipt
            </button>
            <button
              onClick={handleReserve}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Reserve Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
