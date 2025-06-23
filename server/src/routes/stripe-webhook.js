import Stripe from "stripe";
import Booking from "../models/Booking.js";
import express from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const bookingId = session.metadata.bookingId;

      try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
          console.error("Booking not found:", bookingId);
          return res.status(404).json({ message: "Booking not found" });
        }

        booking.status = "confirmed";
        booking.payment.status = "completed";
        booking.payment.paymentIntentId = session.payment_intent;
        booking.payment.paidAt = new Date();

        await booking.save();

        console.log(`Booking ${bookingId} confirmed and payment completed`);
        res.json({ received: true });
      } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Server error" });
      }
    } else {
      res.json({ received: true });
    }
  }
);

export default router;
