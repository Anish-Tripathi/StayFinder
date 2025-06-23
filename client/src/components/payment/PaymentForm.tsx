import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import { BookingDetails } from "../../types/property";
import {
  IndianRupee,
  Wallet,
  AlertCircle,
  HandCoins,
  Loader2,
  QrCode,
} from "lucide-react";

interface PaymentFormProps {
  bookingDetails: BookingDetails;
  paymentMethod: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  bookingDetails,
  paymentMethod,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardPayment = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe not loaded. Please try again.");
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to continue");
      }

      // Step 1: Create payment intent on backend
      const response = await api.post(
        "/bookings/create-payment-intent",
        {
          listing: bookingDetails.listingId,
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
          guests: bookingDetails.guests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { clientSecret, bookingId, paymentIntentId } = response.data;

      // Step 2: Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {},
          },
        }
      );

      if (error) {
        throw new Error(error.message || "Payment failed");
      }

      if (paymentIntent?.status === "succeeded") {
        // Step 3: Complete booking on backend
        await completeBooking(paymentIntentId, bookingId);
      } else {
        throw new Error("Payment was not successful");
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAlternativePayment = async (method: "upi" | "cash") => {
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to continue");
      }
      const bookingResponse = await api.post(
        "/bookings",
        {
          listing: bookingDetails.listingId,
          checkIn: bookingDetails.checkIn,
          checkOut: bookingDetails.checkOut,
          guests: bookingDetails.guests,
          paymentMethod: method,
          specialRequests: bookingDetails.specialRequests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        method === "cash"
          ? "Booking confirmed! Please bring cash on arrival."
          : "Booking confirmed! Thank you for your payment."
      );

      navigate(`/booking-confirmation/${bookingResponse.data.booking._id}`);
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error(error.message || "Booking failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const completeBooking = async (
    paymentIntentId: string,
    bookingId: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      // Update booking with payment confirmation
      await api.put(
        `/bookings/${bookingId}/complete-payment`,
        {
          paymentIntentId,
          paymentStatus: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Payment successful! Booking confirmed.");
      navigate(`/booking-confirmation/${bookingId}`);
    } catch (error: any) {
      console.error("Booking completion error:", error);
      toast.error(
        "Payment succeeded but booking update failed. Please contact support."
      );
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === "card") {
      await handleCardPayment();
    } else if (paymentMethod === "upi") {
      await handleAlternativePayment("upi");
    } else if (paymentMethod === "cash") {
      await handleAlternativePayment("cash");
    }
  };

  return (
    <div className="space-y-6">
      {paymentMethod === "card" && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg border border-gray-300">
            <h4 className="text-md font-semibold mb-4">Card Details</h4>
            <CardElement
              className="p-3 border border-gray-300 rounded-lg"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                },
              }}
            />
          </div>
          <button
            onClick={handlePayment}
            disabled={isProcessing || !stripe || !elements}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex items-center justify-center gap-2"
          >
            {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
            {isProcessing
              ? "Processing Payment..."
              : `Pay ₹${bookingDetails?.pricing?.totalPrice?.toFixed(2)}`}
          </button>
        </div>
      )}

      {paymentMethod === "upi" && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <QrCode className="text-primary-600 w-5 h-5" />
              <h4 className="text-lg font-semibold text-gray-800">
                UPI Payment
              </h4>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 flex justify-center">
              <div className="text-center">
                <div className="mx-auto bg-white p-3 rounded-lg inline-block mb-3 border border-gray-200 shadow-sm">
                  <img
                    src="https://th.bing.com/th/id/R.6f9d43bfa9d53235a7b6bc310fb5448b?rik=xUE6OknSO1WYUg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2%2fQR-Code-PNG-Images.png&ehk=HPmT%2bF4%2ftU1Kn0R5oF8b%2ffA4ks46kTqApdr3kn7DzIg%3d&risl=&pid=ImgRaw&r=0"
                    alt="UPI QR"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Scan this QR with any UPI app to pay{" "}
                  <span className="font-medium text-gray-800">
                    ₹{bookingDetails?.pricing?.totalPrice?.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-6 mb-4">
              <div className="flex flex-col items-center">
                <img
                  src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/436/Google_Pay_GPay_Logo-512.png"
                  alt="GPay"
                  className="w-10 h-10 object-contain mb-1"
                />
                <span className="text-xs text-gray-600">GPay</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://th.bing.com/th/id/OIP.F_ErCaunr4VRuMuUy39HtAHaGT?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"
                  alt="PhonePe"
                  className="w-10 h-10 object-contain mb-1"
                />
                <span className="text-xs text-gray-600">PhonePe</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://th.bing.com/th/id/OIP.awfBJZqGdaKZ0lO3wgkCMgHaGT?r=0&rs=1&pid=ImgDetMain&cb=idpwebpc2"
                  alt="Paytm"
                  className="w-10 h-10 object-contain mb-1"
                />
                <span className="text-xs text-gray-600">Paytm</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="https://th-i.thgim.com/public/sci-tech/technology/gadgets/article16977337.ece/alternates/LANDSCAPE_1200/Bhim_Main"
                  alt="Bhim"
                  className="w-10 h-10 object-contain mb-1"
                />
                <span className="text-xs text-gray-600">Bhim</span>
              </div>
            </div>
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
              {isProcessing ? "Processing..." : "I've Paid via UPI"}
            </button>
          </div>
        </div>
      )}

      {paymentMethod === "cash" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <HandCoins className="text-primary-600 w-5 h-5" />
              <h4 className="text-lg font-semibold text-gray-800">
                Cash Payment Instructions
              </h4>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <IndianRupee className="w-7 h-7 mt-1 text-gray-500" />
                <p>
                  Please bring the exact amount of{" "}
                  <span className="font-medium text-gray-800">
                    ₹{bookingDetails?.pricing?.totalPrice?.toFixed(2)}
                  </span>{" "}
                  in cash to the property.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Wallet className="w-7 h-7 mt-1 text-gray-500" />
                <p>
                  Our representative will collect the payment when you check in.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-7 h-7 mt-1 text-yellow-500" />
                <p className="text-gray-700 font-medium">
                  Note: No change will be provided. Payment must be made in full
                  upon arrival.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full flex justify-center items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
            {isProcessing ? "Processing..." : "Confirm Cash Payment"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
