import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";
import { Booking } from "../../types/booking";

interface TripDetailsProps {
  booking: Booking;
  nights: number;
}

export const TripDetails = ({ booking, nights }: TripDetailsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="card p-6"
  >
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      Trip Details
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <div className="flex items-center mb-2">
          <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <span className="font-medium text-gray-900 dark:text-white">
            Check-in
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date(booking.checkIn).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          After 3:00 PM
        </p>
      </div>

      <div>
        <div className="flex items-center mb-2">
          <Calendar className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <span className="font-medium text-gray-900 dark:text-white">
            Check-out
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {new Date(booking.checkOut).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Before 11:00 AM
        </p>
      </div>

      <div>
        <div className="flex items-center mb-2">
          <Users className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
          <span className="font-medium text-gray-900 dark:text-white">
            Guests
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {booking.guests.adults} adult
          {booking.guests.adults !== 1 ? "s" : ""}
          {booking.guests.children
            ? `, ${booking.guests.children} child${
                booking.guests.children !== 1 ? "ren" : ""
              }`
            : ""}
          {booking.guests.infants
            ? `, ${booking.guests.infants} infant${
                booking.guests.infants !== 1 ? "s" : ""
              }`
            : ""}
          {booking.guests.pets
            ? `, ${booking.guests.pets} pet${
                booking.guests.pets !== 1 ? "s" : ""
              }`
            : ""}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {nights} night{nights > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  </motion.div>
);
