import { Booking } from "../../../types/dashboard";
import {
  Home,
  User,
  MapPin,
  CreditCard,
  Users,
  Phone,
  Mail,
  Settings,
} from "lucide-react";

interface BookingInfoSectionProps {
  booking: Booking;
}

const BookingInfoSection = ({ booking }: BookingInfoSectionProps) => {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Property Section */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
            <Home className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
            Property Details
          </h3>
        </div>
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
            {booking.listing.title}
          </h4>
          {booking.listing.location && (
            <div className="flex items-start text-gray-600 dark:text-gray-400">
              <MapPin className="size-4 mr-2 mt-0.5 text-blue-500" />
              <div>
                <div>
                  {[
                    booking.listing.location.address,
                    booking.listing.location.city,
                    booking.listing.location.state,
                    booking.listing.location.country,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </div>
                {booking.listing.location.zipCode && (
                  <div className="text-sm">
                    PIN: {booking.listing.location.zipCode}
                  </div>
                )}
                {booking.listing.location.neighborhood && (
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    {booking.listing.location.neighborhood}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <CreditCard className="size-4 mr-2 text-green-500" />
            <span>
              Base Price:{" "}
              {formatCurrency(
                booking.pricing?.basePrice ?? 0,
                booking.pricing.currency
              )}{" "}
              per night
            </span>
          </div>
          <div className="mt-4">
            <img
              src={
                booking.listing.images[0]?.url ||
                "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
              alt={booking.listing.title}
              className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Host Information */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-lg">
            <User className="size-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
            Host Information
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            {booking.host.avatar ? (
              <img
                src={`http://localhost:5000/${booking.host.avatar}`}
                alt="Host Avatar"
                className="size-12 rounded-full mr-3"
              />
            ) : (
              <div className="size-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mr-3">
                <User className="size-5 text-purple-600 dark:text-purple-400" />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.host.firstName} {booking.host.lastName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Host</p>
            </div>
          </div>
          {booking.host.email && (
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Mail className="size-4 mr-2 text-purple-500" />
              <span>{booking.host.email}</span>
            </div>
          )}
          {booking.host.phone && (
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Phone className="size-4 mr-2 text-purple-500" />
              <span>{booking.host.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Guest Section */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
            <User className="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
            Guest Information
          </h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center">
            {booking.guest.avatar ? (
              <img
                src={`http://localhost:5000/${booking.guest.avatar}`}
                alt="Guest Avatar"
                className="h-12 w-10 rounded-full mr-3"
              />
            ) : (
              <div className="size-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-3">
                <User className="size-5 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {booking.guest.firstName} {booking.guest.lastName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Guest</p>
            </div>
          </div>
          {booking.guest.email && (
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Mail className="size-4 mr-2 text-blue-500 Joel's-MacBook-Pro.local" />
              <span>{booking.guest.email}</span>
            </div>
          )}
          {booking.guest.phone && (
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Phone className="size-4 mr-2 text-blue-500" />
              <span>{booking.guest.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Guest Count */}
      {booking.guests && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
              <Users className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
              Guest Count
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {booking.guests.adults}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Adults
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {booking.guests.children || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Children
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {booking.guests.infants || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Infants
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {booking.guests.pets || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Pets
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Services */}
      {booking.additionalServices && booking.additionalServices.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-lg">
              <Settings className="size-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white ml-3">
              Additional Services
            </h3>
          </div>
          <div className="space-y-2">
            {booking.additionalServices.map((service, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 last:border-b-0"
              >
                <span className="text-gray-900 dark:text-white">
                  {service.name}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatCurrency(
                    service.price,
                    booking?.pricing?.currency ?? "INR"
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingInfoSection;
