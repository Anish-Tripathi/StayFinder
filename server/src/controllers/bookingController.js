import { body, validationResult } from "express-validator";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function generateConfirmationCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export const bookingValidators = [
  body("listing").isMongoId().withMessage("Valid listing ID is required"),
  body("checkIn").isISO8601().withMessage("Valid check-in date is required"),
  body("checkOut").isISO8601().withMessage("Valid check-out date is required"),
  body("guests.adults")
    .isInt({ min: 1 })
    .withMessage("At least 1 adult is required"),
  body("guests.children")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Children count must be non-negative"),
  body("guests.infants")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Infants count must be non-negative"),
  body("paymentMethod")
    .optional()
    .isIn(["credit_card", "cash", "upi"])
    .withMessage("Invalid payment method"),
];

export const createPaymentIntent = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const {
      listing: listingId,
      checkIn,
      checkOut,
      guests,
      paymentMethodId,
    } = req.body;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const now = new Date();

    if (checkInDate < now) {
      return res
        .status(400)
        .json({ message: "Check-in date cannot be in the past" });
    }
    if (checkOutDate <= checkInDate) {
      return res
        .status(400)
        .json({ message: "Check-out date must be after check-in date" });
    }

    // Validate listing
    const listing = await Listing.findById(listingId).populate("host");
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.status !== "active") {
      return res
        .status(400)
        .json({ message: "Listing is not available for booking" });
    }
    if (listing.host._id.toString() === req.user.userId) {
      return res
        .status(400)
        .json({ message: "You cannot book your own listing" });
    }

    // Validate guests
    const totalGuests =
      guests.adults + (guests.children || 0) + (guests.infants || 0);
    if (totalGuests > listing.guests) {
      return res.status(400).json({
        message: `This listing can accommodate maximum ${listing.guests} guests`,
      });
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      listing: listingId,
      status: { $in: ["confirmed", "pending"] },
      $or: [{ checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }],
    });
    if (conflictingBooking) {
      return res
        .status(400)
        .json({ message: "Selected dates are not available" });
    }

    // Calculate pricing
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const subtotal = listing.price * nights;
    const cleaningFee = listing.cleaningFee || 0;
    const serviceFee = subtotal * 0.14; // 14% service fee
    const taxes = subtotal * 0.08; // 8% tax
    let weeklyDiscount = 0;
    let monthlyDiscount = 0;

    // Apply discounts if applicable
    if (nights >= 28 && listing.monthlyDiscount > 0) {
      monthlyDiscount = subtotal * (listing.monthlyDiscount / 100);
    } else if (nights >= 7 && listing.weeklyDiscount > 0) {
      weeklyDiscount = subtotal * (listing.weeklyDiscount / 100);
    }

    const totalPrice =
      subtotal +
      cleaningFee +
      serviceFee +
      taxes -
      weeklyDiscount -
      monthlyDiscount;

    // Convert totalPrice to cents (Stripe requires amount in cents)
    const totalAmountInCents = Math.round(totalPrice * 100);

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountInCents,
      currency: listing.currency?.toLowerCase() || "usd",

      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },

      metadata: {
        listingId: listingId,
        guestId: req.user.userId,
        checkIn,
        checkOut,
      },
      description: `Booking for ${nights} nights in ${listing.title}`,
    });

    // Create booking with pending status initially
    const booking = new Booking({
      listing: listingId,
      guest: req.user.userId,
      host: listing.host._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: {
        adults: guests.adults,
        children: guests.children || 0,
        infants: guests.infants || 0,
      },
      pricing: {
        basePrice: listing.price,
        nights,
        subtotal,
        cleaningFee,
        serviceFee,
        taxes,
        discounts: {
          weekly: weeklyDiscount,
          monthly: monthlyDiscount,
        },
        totalPrice,
        currency: listing.currency || "USD",
      },
      status: "pending",
      payment: {
        method: "credit_card",
        status: "pending",
        paymentIntentId: paymentIntent.id,
        amount: totalPrice,
        paidAt: null, // Will be set when payment completes
      },
      confirmationCode: generateConfirmationCode(),
      messages: [],
    });

    // Save booking
    await booking.save();

    // Return client secret and booking details
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      bookingId: booking._id,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.error("Create payment intent error:", error);
    res.status(500).json({
      message: error.message || "Server error while creating payment",
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    // Extract data from request body
    const {
      listing: listingId,
      checkIn,
      checkOut,
      guests,
      specialRequests,
      paymentMethod = "credit_card",
      paymentIntentId,
    } = req.body;

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const now = new Date();

    if (checkInDate < now) {
      return res.status(400).json({
        message: "Check-in date cannot be in the past",
      });
    }
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        message: "Check-out date must be after check-in date",
      });
    }

    // Validate listing
    const listing = await Listing.findById(listingId).populate("host");
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }
    if (listing.status !== "active") {
      return res.status(400).json({
        message: "Listing is not available for booking",
      });
    }
    if (listing.host._id.toString() === req.user.userId) {
      return res.status(400).json({
        message: "You cannot book your own listing",
      });
    }

    // Validate guests
    const totalGuests =
      guests.adults + (guests.children || 0) + (guests.infants || 0);
    if (totalGuests > listing.maxGuests) {
      return res.status(400).json({
        message: `This listing can accommodate maximum ${listing.maxGuests} guests`,
      });
    }

    // Check for conflicting bookings
    const conflictingBooking = await Booking.findOne({
      listing: listingId,
      status: { $in: ["confirmed", "pending"] },
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate },
        },
      ],
    });
    if (conflictingBooking) {
      return res.status(400).json({
        message: "Selected dates are not available",
      });
    }

    // Calculate pricing
    const nights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const subtotal = listing.price * nights;
    const cleaningFee = listing.cleaningFee || 0;
    const serviceFee = subtotal * 0.14; // 14% service fee
    const taxes = subtotal * 0.08; // 8% tax
    let weeklyDiscount = 0;
    let monthlyDiscount = 0;

    // Apply discounts if applicable
    if (nights >= 28 && listing.monthlyDiscount > 0) {
      monthlyDiscount = subtotal * (listing.monthlyDiscount / 100);
    } else if (nights >= 7 && listing.weeklyDiscount > 0) {
      weeklyDiscount = subtotal * (listing.weeklyDiscount / 100);
    }

    const totalPrice =
      subtotal +
      cleaningFee +
      serviceFee +
      taxes -
      weeklyDiscount -
      monthlyDiscount;

    // Determine payment and booking status based on payment method
    let paymentStatus;
    let bookingStatus;

    if (["cash", "upi"].includes(paymentMethod)) {
      // For cash/UPI payments, mark as completed immediately
      paymentStatus = "completed";
      bookingStatus = "confirmed";
    } else if (paymentMethod === "credit_card") {
      // For credit cards, status depends on paymentIntentId (Stripe success)
      paymentStatus = paymentIntentId ? "completed" : "pending";
      bookingStatus = paymentIntentId ? "confirmed" : "pending";
    } else {
      // Default case for other payment methods
      paymentStatus = "pending";
      bookingStatus = "pending";
    }

    // Create new booking
    const booking = new Booking({
      listing: listingId,
      guest: req.user.userId,
      host: listing.host._id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: {
        adults: guests.adults,
        children: guests.children || 0,
        infants: guests.infants || 0,
      },
      pricing: {
        basePrice: listing.price,
        nights,
        subtotal,
        cleaningFee,
        serviceFee,
        taxes,
        discounts: {
          weekly: weeklyDiscount,
          monthly: monthlyDiscount,
        },
        totalPrice,
        currency: listing.currency || "INR",
      },
      specialRequests,
      status: bookingStatus,
      payment: {
        method: paymentMethod,
        status: paymentStatus,
        paymentIntentId: paymentIntentId || undefined,
        paidAt: paymentStatus === "completed" ? new Date() : undefined,
        amount: totalPrice,
      },
      confirmationCode: generateConfirmationCode(),
      messages: [],
    });

    // Save booking to database
    await booking.save();

    // Populate listing and host details
    await booking.populate([
      { path: "listing", select: "title images location price" },
      { path: "host", select: "firstName lastName avatar" },
    ]);

    // Return success response
    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({
      message: "Server error while creating booking",
      error: error.message,
    });
  }
};

// Validators for complete-payment endpoint
export const completePaymentValidators = [
  body("paymentIntentId")
    .notEmpty()
    .withMessage("Payment Intent ID is required"),
  body("paymentStatus")
    .isIn(["completed", "failed"])
    .withMessage("Invalid payment status"),
];

export const completePayment = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { paymentIntentId, paymentStatus } = req.body;
    const bookingId = req.params.id;

    // Find the booking
    const booking = await Booking.findById(bookingId)
      .populate("listing", "host")
      .populate("guest");
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Verify that the user is authorized
    if (booking.guest._id.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized to update this booking",
      });
    }

    // Verify the payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntent) {
      return res.status(400).json({
        message: "Invalid Payment Intent ID",
      });
    }

    // Ensure the payment intent matches the booking
    if (paymentIntent.id !== booking.payment.paymentIntentId) {
      return res.status(400).json({
        message: "Payment Intent does not match this booking",
      });
    }

    // Update booking payment details
    booking.payment.status = paymentStatus;
    booking.payment.paidAt = paymentStatus === "completed" ? new Date() : null;
    booking.payment.amount = paymentIntent.amount / 100; // Convert cents to dollars
    booking.status = paymentStatus === "completed" ? "confirmed" : "pending";

    // Save the updated booking
    await booking.save();

    // Populate necessary fields for response
    await booking.populate([
      { path: "listing", select: "title images location price" },
      { path: "host", select: "firstName lastName avatar" },
      { path: "guest", select: "firstName lastName avatar" },
    ]);

    res.status(200).json({
      message: "Payment completed successfully",
      booking,
    });
  } catch (error) {
    console.error("Complete payment error:", error);
    res.status(500).json({
      message: "Server error while completing payment",
      error: error.message,
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { status, role = "guest", page = 1, limit = 10 } = req.query;
    const filter = {};
    if (role === "guest") filter.guest = req.user.userId;
    else if (role === "host") filter.host = req.user.userId;
    if (status) filter.status = status;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate("listing", "title images location price")
        .populate("guest", "firstName lastName avatar")
        .populate("host", "firstName lastName avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Booking.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(total / parseInt(limit));
    res.json({
      bookings,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({
      message: "Server error while fetching bookings",
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: "listing",
        select: "title images location price host",
        populate: {
          path: "host",
          select: "firstName lastName avatar",
        },
      })
      .populate("guest", "firstName lastName avatar email phone")
      .populate("host", "firstName lastName avatar email phone")
      .lean(); // Use lean for better performance

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (
      booking.guest._id.toString() !== req.user.userId &&
      booking.host._id.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Not authorized to view this booking",
      });
    }

    const transformedBooking = {
      ...booking,
      messages: booking.messages.map((msg) => ({
        ...msg,
        sender: msg.sender.toString(),
        timestamp: msg.timestamp.toISOString(),
      })),
    };

    res.json(transformedBooking);
  } catch (error) {
    console.error("Get booking error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }
    res.status(500).json({
      message: "Server error while fetching booking",
    });
  }
};

export const updateBookingStatusValidators = [
  body("status")
    .isIn(["confirmed", "cancelled_by_guest", "cancelled_by_host"])
    .withMessage("Invalid status"),
  body("reason")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Reason cannot exceed 500 characters"),
];

export const updateBookingStatus = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { status, reason } = req.body;
    const booking = await Booking.findById(req.params.id).populate(
      "listing",
      "cancellationPolicy"
    );
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }
    if (status === "confirmed" && booking.host.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Only the host can confirm bookings",
      });
    }
    if (
      status === "cancelled_by_guest" &&
      booking.guest.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Only the guest can cancel their booking",
      });
    }
    if (
      status === "cancelled_by_host" &&
      booking.host.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Only the host can cancel bookings",
      });
    }
    if (status.includes("cancelled")) {
      if (!booking.canBeCancelled()) {
        return res.status(400).json({
          message: "This booking cannot be cancelled",
        });
      }
      const refundAmount = booking.calculateRefundAmount(
        booking.listing.cancellationPolicy
      );
      booking.cancellation = {
        cancelledAt: new Date(),
        cancelledBy: req.user.userId,
        reason:
          status === "cancelled_by_guest"
            ? "change_of_plans"
            : "host_cancelled",
        customReason: reason,
        refundAmount,
      };
      if (refundAmount > 0) {
        booking.payment.status = "partially_refunded";
        booking.payment.refundAmount = refundAmount;
      }
    }
    booking.status = status;
    await booking.save();
    res.json({
      message: "Booking status updated successfully",
      booking: booking.toJSON({ virtuals: false }),
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({
      message: "Server error while updating booking status",
    });
  }
};
