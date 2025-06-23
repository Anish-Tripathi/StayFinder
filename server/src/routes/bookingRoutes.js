import express from "express";
import { auth } from "../middleware/auth.js";
import {
  bookingValidators,
  createBooking,
  createPaymentIntent,
  getBookings,
  getBookingById,
  updateBookingStatusValidators,
  updateBookingStatus,
  completePayment,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", auth, bookingValidators, createBooking);
router.post(
  "/create-payment-intent",
  auth,
  bookingValidators,
  createPaymentIntent
);
router.get("/", auth, getBookings);
router.get("/:id", auth, getBookingById);
router.put(
  "/:id/status",
  auth,
  updateBookingStatusValidators,
  updateBookingStatus
);
router.put("/:id/complete-payment", auth, completePayment);

export default router;
