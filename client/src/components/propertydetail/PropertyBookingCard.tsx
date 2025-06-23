import React, { useState } from "react";
import { User, Users } from "lucide-react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Property, Guests } from "../../types/property";

interface PropertyBookingCardProps {
  property: Property;
  onBooking: (
    listingId: string,
    checkIn: Date,
    checkOut: Date,
    guests: Guests,
    specialRequests: string
  ) => void;
}

const PropertyBookingCard: React.FC<PropertyBookingCardProps> = ({
  property,
  onBooking,
}) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);
  const [guests, setGuests] = useState<Guests>({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [specialRequests, setSpecialRequests] = useState("");

  const calculateTotalNights = () => {
    if (!dateRange[0].startDate || !dateRange[0].endDate) return 0;
    return Math.ceil(
      (dateRange[0].endDate.getTime() - dateRange[0].startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
  };

  const calculateTotalPrice = () => {
    const nights = calculateTotalNights();
    const basePrice = property.price * nights;
    const serviceFee = basePrice * 0.14;
    const taxes = basePrice * 0.18;
    return (basePrice + serviceFee + taxes).toFixed(2);
  };

  const handleBookingSubmit = () => {
    if (calculateTotalNights() === 0) {
      alert("Please select valid dates");
      return;
    }

    onBooking(
      property._id,
      dateRange[0].startDate,
      dateRange[0].endDate,
      guests,
      specialRequests
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          ₹{property.price} <span className="text-sm font-normal">/ night</span>
        </h3>
      </div>

      <div className="mb-6">
        <DateRange
          editableDateInputs={true}
          onChange={(item: any) => setDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
          minDate={new Date()}
          className="w-full"
          locale={enUS}
        />
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-3 flex items-center">
          <Users className="mr-2 h-4 w-4" /> Guests
        </h4>
        <div className="space-y-3">
          {/* Adults */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Adults</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setGuests({
                    ...guests,
                    adults: Math.max(1, guests.adults - 1),
                  })
                }
                className="p-1 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center"
              >
                -
              </button>
              <span>{guests.adults}</span>
              <button
                onClick={() =>
                  setGuests({ ...guests, adults: guests.adults + 1 })
                }
                className="p-1 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Children</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setGuests({
                    ...guests,
                    children: Math.max(0, guests.children - 1),
                  })
                }
                className="p-1 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center"
              >
                -
              </button>
              <span>{guests.children}</span>
              <button
                onClick={() =>
                  setGuests({ ...guests, children: guests.children + 1 })
                }
                className="p-1 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Infants</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setGuests({
                    ...guests,
                    infants: Math.max(0, guests.infants - 1),
                  })
                }
                className="p-1 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center"
              >
                -
              </button>
              <span>{guests.infants}</span>
              <button
                onClick={() =>
                  setGuests({ ...guests, infants: guests.infants + 1 })
                }
                className="p-1 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* Pets */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Pets</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() =>
                  setGuests({
                    ...guests,
                    pets: Math.max(0, guests.pets - 1),
                  })
                }
                className="p-1 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center"
              >
                -
              </button>
              <span>{guests.pets}</span>
              <button
                onClick={() => setGuests({ ...guests, pets: guests.pets + 1 })}
                className="p-1 rounded-full border border-gray-300 w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2">Special Requests</h4>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          className="w-full p-3 border rounded-lg"
          rows={3}
          placeholder="Any special requirements..."
        />
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex justify-between">
          <span>
            ₹{property.price} x {calculateTotalNights()} nights
          </span>
          <span>₹{(property.price * calculateTotalNights()).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service fee</span>
          <span>
            ₹{(property.price * calculateTotalNights() * 0.14).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>
            ₹{(property.price * calculateTotalNights() * 0.18).toFixed(2)}
          </span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{calculateTotalPrice()}</span>
        </div>
      </div>

      <button
        onClick={handleBookingSubmit}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition duration-200"
      >
        Reserve Now
      </button>
    </div>
  );
};

export default PropertyBookingCard;
