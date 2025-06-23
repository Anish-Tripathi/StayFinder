import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { format } from "date-fns";
import { BookingDetails } from "../types/property";
import PaymentForm from "../components/payment/PaymentForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

const Payment: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const bookingDetails: BookingDetails | undefined = state;
  const [activeTab, setActiveTab] = useState<"details" | "payment">("details");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  useEffect(() => {
    if (!bookingDetails || !user) {
      toast.error("Invalid booking details or user not logged in");
      navigate("/");
    }
  }, [bookingDetails, user, navigate]);

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Invalid Booking Details
          </h2>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left column - Booking details and payment method selection */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Complete Your Booking
            </h1>

            {/* Navigation tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "details"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Booking Details
                </button>
                <button
                  onClick={() => setActiveTab("payment")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "payment"
                      ? "border-primary-500 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Payment Method
                </button>
              </nav>
            </div>

            {activeTab === "details" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Your Trip
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={
                        bookingDetails.property.images[0]?.url ||
                        "/placeholder-property.jpg"
                      }
                      alt={bookingDetails.property.title}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {bookingDetails.property.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {bookingDetails.property.location.city},{" "}
                        {bookingDetails.property.location.country}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-2">
                        Dates
                      </h3>
                      <p className="text-gray-600">
                        {format(
                          new Date(bookingDetails.checkIn),
                          "MMM d, yyyy"
                        )}{" "}
                        -{" "}
                        {format(
                          new Date(bookingDetails.checkOut),
                          "MMM d, yyyy"
                        )}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-2">
                        Guests
                      </h3>
                      <p className="text-gray-600">
                        {bookingDetails.guests.adults} Adults
                        {bookingDetails.guests.children > 0
                          ? `, ${bookingDetails.guests.children} Children`
                          : ""}
                        {bookingDetails.guests.infants > 0
                          ? `, ${bookingDetails.guests.infants} Infants`
                          : ""}
                        {bookingDetails.guests.pets &&
                        bookingDetails.guests.pets > 0
                          ? `, ${bookingDetails.guests.pets} Pets`
                          : ""}
                      </p>
                    </div>
                  </div>

                  {bookingDetails.specialRequests && (
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-2">
                        Special Requests
                      </h3>
                      <p className="text-gray-600">
                        {bookingDetails.specialRequests}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-2">
                      Booking ID
                    </h3>
                    <p className="text-gray-600">
                      {bookingDetails.listingId || "Not assigned yet"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-4">
                      Host Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={`http://localhost:5000/${bookingDetails.property.host.avatar}`}
                          alt={bookingDetails.property.host.firstName}
                          className="h-24 w-24 rounded-full object-cover mb-2"
                        />
                        <p className="text-gray-900 font-medium ml-2">
                          {bookingDetails.property.host.firstName}{" "}
                          {bookingDetails.property.host.lastName}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {bookingDetails.property.host.hostInfo.isSuperhost && (
                          <p className="text-sm text-yellow-600">Superhost</p>
                        )}
                        {bookingDetails.property.host.hostInfo.responseRate && (
                          <p className="text-sm text-gray-600">
                            Response Rate:{" "}
                            {bookingDetails.property.host.hostInfo.responseRate}
                            %
                          </p>
                        )}
                        {bookingDetails.property.host.hostInfo.responseTime && (
                          <p className="text-sm text-gray-600">
                            Response Time:{" "}
                            {bookingDetails.property.host.hostInfo.responseTime}
                          </p>
                        )}
                        {bookingDetails.property.host.hostInfo.languages
                          .length > 0 && (
                          <p className="text-sm text-gray-600">
                            Languages:{" "}
                            {bookingDetails.property.host.hostInfo.languages.join(
                              ", "
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Tab */}
            {activeTab === "payment" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Select Payment Method
                </h2>
                <div className="space-y-4">
                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-lg border cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Credit/Debit Card
                      </h3>
                    </div>
                    {paymentMethod === "card" && (
                      <p className="text-sm text-gray-600 mt-2">
                        Pay securely with your Visa, Mastercard, or other credit
                        card.
                      </p>
                    )}
                  </div>

                  <div
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-lg border cursor-pointer ${
                      paymentMethod === "upi"
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-purple-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        UPI Payment
                      </h3>
                    </div>
                    {paymentMethod === "upi" && (
                      <p className="text-sm text-gray-600 mt-2">
                        Pay instantly using any UPI app like Google Pay, PhonePe
                        or Paytm.
                      </p>
                    )}
                  </div>

                  <div
                    onClick={() => setPaymentMethod("cash")}
                    className={`p-4 rounded-lg border cursor-pointer ${
                      paymentMethod === "cash"
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pay with Cash
                      </h3>
                    </div>
                    {paymentMethod === "cash" && (
                      <p className="text-sm text-gray-600 mt-2">
                        Pay in cash when you arrive at the property.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right column - Payment summary and form */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Price Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Price Details
                </h2>
                {bookingDetails.pricing ? (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ₹{bookingDetails.pricing.basePrice.toFixed(2)} x{" "}
                        {bookingDetails.pricing.nights} nights
                      </span>
                      <span className="text-gray-900">
                        ₹{bookingDetails.pricing.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service fee</span>
                      <span className="text-gray-900">
                        ₹{bookingDetails.pricing.serviceFee.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes</span>
                      <span className="text-gray-900">
                        ₹{bookingDetails.pricing.taxes.toFixed(2)}
                      </span>
                    </div>
                    <hr className="border-gray-200 my-3" />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">
                        ₹{bookingDetails.pricing.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-600">
                    Pricing information unavailable
                  </p>
                )}
              </div>

              {/* Payment Form */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <Elements stripe={stripePromise}>
                  <PaymentForm
                    bookingDetails={bookingDetails}
                    paymentMethod={paymentMethod}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;
