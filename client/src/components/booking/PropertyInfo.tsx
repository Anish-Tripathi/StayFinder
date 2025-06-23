import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Booking } from "../../types/booking";

interface PropertyInfoProps {
  booking: Booking;
}

export const PropertyInfo = ({ booking }: PropertyInfoProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="card p-6"
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Your Stay
    </h2>
    <div className="flex flex-col md:flex-row gap-4">
      <div className="grid grid-cols-2 gap-2 w-full md:w-1/2">
        {booking.listing.images.slice(0, 4).map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Property ${index}`}
            className="w-full h-32 object-cover rounded-lg"
          />
        ))}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {booking.listing?.title || "Unknown property"}
        </h3>
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {booking.listing?.location.city},{" "}
            {booking.listing?.location.country}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {booking.listing?.location.address}
        </p>
      </div>
    </div>
  </motion.div>
);
