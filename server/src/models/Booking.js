import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: [true, "Listing is required"],
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Guest is required"],
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Host is required"],
    },

    // Booking details
    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
      validate: {
        validator: function (value) {
          return value > this.checkIn;
        },
        message: "Check-out date must be after check-in date",
      },
    },
    guests: {
      adults: {
        type: Number,
        required: [true, "Number of adults is required"],
        min: [1, "Must have at least 1 adult"],
      },
      children: {
        type: Number,
        default: 0,
        min: [0, "Children count cannot be negative"],
      },
      infants: {
        type: Number,
        default: 0,
        min: [0, "Infants count cannot be negative"],
      },
      pets: {
        type: Number,
        default: 0,
        min: [0, "Pets count cannot be negative"],
      },
    },

    // Pricing breakdown
    pricing: {
      basePrice: {
        type: Number,
        required: [true, "Base price is required"],
        min: [0, "Base price cannot be negative"],
      },
      nights: {
        type: Number,
        required: [true, "Number of nights is required"],
        min: [1, "Must book at least 1 night"],
      },
      subtotal: {
        type: Number,
        required: [true, "Subtotal is required"],
        min: [0, "Subtotal cannot be negative"],
      },
      cleaningFee: {
        type: Number,
        default: 0,
        min: [0, "Cleaning fee cannot be negative"],
      },
      serviceFee: {
        type: Number,
        default: 0,
        min: [0, "Service fee cannot be negative"],
      },
      taxes: {
        type: Number,
        default: 0,
        min: [0, "Taxes cannot be negative"],
      },
      discounts: {
        weekly: {
          type: Number,
          default: 0,
          min: [0, "Weekly discount cannot be negative"],
        },
        monthly: {
          type: Number,
          default: 0,
          min: [0, "Monthly discount cannot be negative"],
        },
        coupon: {
          code: String,
          amount: {
            type: Number,
            default: 0,
            min: [0, "Coupon discount cannot be negative"],
          },
        },
      },
      totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
        min: [0, "Total price cannot be negative"],
      },
      currency: {
        type: String,
        default: "USD",
        enum: ["USD", "EUR", "GBP", "CAD", "AUD", "INR"],
      },
    },

    // Payment information
    payment: {
      method: {
        type: String,
        enum: ["credit_card", "cash", "upi"],
        required: [true, "Payment method is required"],
      },
      status: {
        type: String,
        enum: [
          "pending",
          "processing",
          "completed",
          "failed",
          "refunded",
          "partially_refunded",
        ],
        default: "pending",
      },
      transactionId: String,
      paymentIntentId: String,
      paidAt: Date,
      refundedAt: Date,
      refundAmount: {
        type: Number,
        default: 0,
        min: [0, "Refund amount cannot be negative"],
      },
      paymentSchedule: [
        {
          amount: {
            type: Number,
            required: true,
            min: [0, "Payment amount cannot be negative"],
          },
          dueDate: {
            type: Date,
            required: true,
          },
          status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
          },
          paidAt: Date,
          transactionId: String,
        },
      ],
    },

    // Booking status
    status: {
      type: String,
      enum: [
        "pending", // Waiting for host approval
        "confirmed", // Confirmed by host
        "cancelled_by_guest", // Cancelled by guest
        "cancelled_by_host", // Cancelled by host
        "completed", // Stay completed
        "no_show", // Guest didn't show up
        "in_progress", // Currently staying
      ],
      default: "pending",
    },

    // Confirmation details
    confirmationCode: {
      type: String,
      unique: true,
      required: [true, "Confirmation code is required"],
    },

    // Special requests and notes
    specialRequests: {
      type: String,
      maxlength: [500, "Special requests cannot exceed 500 characters"],
    },
    guestNotes: {
      type: String,
      maxlength: [1000, "Guest notes cannot exceed 1000 characters"],
    },
    hostNotes: {
      type: String,
      maxlength: [1000, "Host notes cannot exceed 1000 characters"],
    },

    // Check-in/out details
    checkInDetails: {
      actualTime: Date,
      method: {
        type: String,
        enum: ["self_checkin", "host_greeting", "keypad", "lockbox", "doorman"],
      },
      instructions: String,
      keyLocation: String,
      wifiPassword: String,
      emergencyContact: {
        name: String,
        phone: String,
      },
    },

    checkOutDetails: {
      actualTime: Date,
      instructions: String,
      keyReturn: String,
      cleaningNotes: String,
    },

    // Cancellation details
    cancellation: {
      cancelledAt: Date,
      cancelledBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      reason: {
        type: String,
        enum: [
          "change_of_plans",
          "emergency",
          "property_issue",
          "host_cancelled",
          "payment_failed",
          "policy_violation",
          "other",
        ],
      },
      customReason: String,
      refundAmount: {
        type: Number,
        default: 0,
        min: [0, "Refund amount cannot be negative"],
      },
      refundProcessedAt: Date,
    },

    // Communication
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: {
          type: String,
          maxlength: [1000, "Message cannot exceed 1000 characters"],
        },
        fileUrl: String,
        fileName: String,
        fileType: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        read: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Reviews
    review: {
      guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
      host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    },

    // Additional services
    additionalServices: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Service price cannot be negative"],
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Service quantity must be at least 1"],
        },
      },
    ],

    // Insurance and protection
    insurance: {
      provider: String,
      policyNumber: String,
      coverage: {
        type: Number,
        default: 0,
      },
      premium: {
        type: Number,
        default: 0,
      },
    },

    // Damage and incidents
    incidents: [
      {
        type: {
          type: String,
          enum: [
            "damage",
            "noise_complaint",
            "unauthorized_guests",
            "smoking",
            "pets",
            "other",
          ],
          required: true,
        },
        description: {
          type: String,
          required: true,
          maxlength: [
            1000,
            "Incident description cannot exceed 1000 characters",
          ],
        },
        reportedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        reportedAt: {
          type: Date,
          default: Date.now,
        },
        resolved: {
          type: Boolean,
          default: false,
        },
        resolutionNotes: String,
        cost: {
          type: Number,
          default: 0,
          min: [0, "Incident cost cannot be negative"],
        },
      },
    ],

    // Metadata
    source: {
      type: String,
      enum: ["web", "mobile_app", "api", "admin"],
      default: "web",
    },
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for total guests
bookingSchema.virtual("totalGuests").get(function () {
  return this.guests.adults + this.guests.children + this.guests.infants;
});

// Virtual for nights count
bookingSchema.virtual("nightsCount").get(function () {
  return Math.ceil((this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24));
});

// Virtual for booking duration in days
bookingSchema.virtual("duration").get(function () {
  return Math.ceil((this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24));
});

// Virtual for is current booking
bookingSchema.virtual("isCurrent").get(function () {
  const now = new Date();
  return (
    this.checkIn <= now && this.checkOut > now && this.status === "confirmed"
  );
});

// Virtual for is upcoming booking
bookingSchema.virtual("isUpcoming").get(function () {
  const now = new Date();
  return this.checkIn > now && this.status === "confirmed";
});

// Virtual for is past booking
bookingSchema.virtual("isPast").get(function () {
  const now = new Date();
  return this.checkOut < now;
});

// Indexes for better query performance
bookingSchema.index({ guest: 1, status: 1 });
bookingSchema.index({ host: 1, status: 1 });
bookingSchema.index({ listing: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ status: 1, checkIn: 1 });

bookingSchema.index({ "payment.status": 1 });
bookingSchema.index({ createdAt: -1 });

// Pre-save middleware
bookingSchema.pre("save", function (next) {
  // Generate confirmation code if not exists
  if (!this.confirmationCode) {
    this.confirmationCode = this.generateConfirmationCode();
  }

  // Calculate nights if not set
  if (!this.pricing.nights) {
    this.pricing.nights = this.nightsCount;
  }

  // Set host from listing if not set
  if (!this.host && this.listing) {
    this.populate("listing")
      .then(() => {
        this.host = this.listing.host;
        next();
      })
      .catch(next);
  } else {
    next();
  }
});

// Method to generate confirmation code
bookingSchema.methods.generateConfirmationCode = function () {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Method to check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function () {
  const now = new Date();
  const hoursUntilCheckIn = (this.checkIn - now) / (1000 * 60 * 60);

  // Can't cancel if already checked in or completed
  if (["in_progress", "completed", "no_show"].includes(this.status)) {
    return false;
  }

  // Can't cancel if already cancelled
  if (this.status.includes("cancelled")) {
    return false;
  }

  // Check cancellation policy (simplified)
  return hoursUntilCheckIn > 24; // 24 hours notice required
};

// Method to calculate refund amount
bookingSchema.methods.calculateRefundAmount = function (
  cancellationPolicy = "moderate"
) {
  if (!this.canBeCancelled()) {
    return 0;
  }

  const now = new Date();
  const hoursUntilCheckIn = (this.checkIn - now) / (1000 * 60 * 60);
  const totalPaid = this.pricing.totalPrice;

  // Simplified refund calculation based on policy
  switch (cancellationPolicy) {
    case "flexible":
      return hoursUntilCheckIn > 24 ? totalPaid : totalPaid * 0.5;
    case "moderate":
      return hoursUntilCheckIn > 120 ? totalPaid : totalPaid * 0.5; // 5 days
    case "strict":
      return hoursUntilCheckIn > 168 ? totalPaid : 0; // 7 days
    default:
      return hoursUntilCheckIn > 48 ? totalPaid * 0.5 : 0;
  }
};

// Method to add message
bookingSchema.methods.addMessage = function (
  senderId,
  content,
  fileUrl,
  fileName,
  fileType
) {
  this.messages.push({
    sender: senderId,
    content: content || "",
    fileUrl,
    fileName,
    fileType,
    timestamp: new Date(),
  });
  return this.save();
};

// Method to mark messages as read
bookingSchema.methods.markMessagesAsRead = function (userId) {
  this.messages.forEach((message) => {
    if (message.sender.toString() !== userId.toString()) {
      message.read = true;
    }
  });
  return this.save();
};

export default mongoose.model("Booking", bookingSchema);
