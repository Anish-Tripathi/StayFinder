import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },

    // Property details
    type: {
      type: String,
      enum: [
        "haveli",
        "house",
        "cottage",
        "apartment",
        "villa",
        "resort",
        "bungalow",
        "tent",
        "guesthouse",
      ],
      required: [true, "Property type is required"],
    },
    category: {
      type: String,
      enum: ["entire_place", "private_room", "shared_room"],
      required: [true, "Category is required"],
      default: "entire_place",
    },

    // Capacity
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "Must accommodate at least 1 guest"],
      max: [20, "Cannot accommodate more than 20 guests"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
      min: [0, "Bedrooms cannot be negative"],
    },
    beds: {
      type: Number,
      required: [true, "Number of beds is required"],
      min: [1, "Must have at least 1 bed"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
      min: [0.5, "Must have at least 0.5 bathroom"],
      max: [10, "Cannot have more than 10 bathrooms"],
    },

    // Location
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
      },
      zipCode: {
        type: String,
        trim: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere",
      },
      neighborhood: {
        type: String,
        trim: true,
      },
    },

    // Pricing
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1"],
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["USD", "EUR", "GBP", "CAD", "AUD", "INR"],
    },
    cleaningFee: {
      type: Number,
      default: 0,
      min: [0, "Cleaning fee cannot be negative"],
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: [0, "Security deposit cannot be negative"],
    },

    // Pricing rules
    weeklyDiscount: {
      type: Number,
      default: 0,
      min: [0, "Weekly discount cannot be negative"],
      max: [50, "Weekly discount cannot exceed 50%"],
    },
    monthlyDiscount: {
      type: Number,
      default: 0,
      min: [0, "Monthly discount cannot be negative"],
      max: [50, "Monthly discount cannot exceed 50%"],
    },

    // Images
    images: [
      {
        url: { type: String, required: true },
        isPrimary: { type: Boolean, default: false },
        caption: { type: String, default: "" },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          default: () => new mongoose.Types.ObjectId(),
        },
      },
    ],

    // Amenities
    amenities: [
      {
        type: String,
      },
    ],

    // House rules
    houseRules: {
      checkIn: {
        from: {
          type: String,
          default: "15:00",
        },
        to: {
          type: String,
          default: "21:00",
        },
      },
      checkOut: {
        type: String,
        default: "11:00",
      },
      smokingAllowed: {
        type: Boolean,
        default: false,
      },
      petsAllowed: {
        type: Boolean,
        default: false,
      },
      partiesAllowed: {
        type: Boolean,
        default: false,
      },
      quietHours: {
        from: String,
        to: String,
      },
      additionalRules: [String],
    },

    // Availability
    availability: {
      calendar: [
        {
          date: Date,
          available: {
            type: Boolean,
            default: true,
          },
          price: Number,
          minStay: Number,
        },
      ],
      minStay: {
        type: Number,
        default: 1,
        min: [1, "Minimum stay must be at least 1 night"],
      },
      maxStay: {
        type: Number,
        default: 365,
        min: [1, "Maximum stay must be at least 1 night"],
      },
      advanceNotice: {
        type: Number,
        default: 0, // Days in advance
        min: [0, "Advance notice cannot be negative"],
      },
      preparationTime: {
        type: Number,
        default: 0,
        min: [0, "Preparation time cannot be negative"],
      },
    },

    // Host information
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Host is required"],
    },

    // Status
    status: {
      type: String,
      enum: ["draft", "pending", "active", "inactive", "suspended"],
      default: "draft",
    },

    // Reviews and ratings
    rating: {
      overall: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      cleanliness: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      accuracy: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      communication: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      location: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
      value: {
        type: Number,
        default: 0,
        min: [0, "Rating cannot be negative"],
        max: [5, "Rating cannot exceed 5"],
      },
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: [0, "Review count cannot be negative"],
    },

    // Booking statistics
    bookingCount: {
      type: Number,
      default: 0,
      min: [0, "Booking count cannot be negative"],
    },
    totalRevenue: {
      type: Number,
      default: 0,
      min: [0, "Total revenue cannot be negative"],
    },

    // SEO and search
    tags: [String],
    featured: {
      type: Boolean,
      default: false,
    },

    // Instant booking
    instantBook: {
      type: Boolean,
      default: false,
    },

    // Cancellation policy
    cancellationPolicy: {
      type: String,
      enum: [
        "flexible",
        "moderate",
        "strict",
        "super_strict_30",
        "super_strict_60",
      ],
      default: "moderate",
    },

    // Additional fees
    additionalFees: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: [0, "Fee amount cannot be negative"],
        },
        type: {
          type: String,
          enum: ["per_night", "per_stay", "per_person"],
          default: "per_stay",
        },
        optional: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // License and legal
    license: {
      number: { type: String, trim: true },
      type: { type: String, trim: true },
      expiryDate: { type: Date },
    },

    // Performance metrics
    views: {
      type: Number,
      default: 0,
    },
    inquiries: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for reviews
listingSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "listing",
});

// Virtual for bookings
listingSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "listing",
});

// Virtual for primary image
listingSchema.virtual("primaryImage").get(function () {
  const primaryImg = this.images.find((img) => img.isPrimary);
  return primaryImg
    ? primaryImg.url
    : this.images[0]
    ? this.images[0].url
    : null;
});

// Virtual for occupancy rate
listingSchema.virtual("occupancyRate").get(function () {
  // This would be calculated based on bookings vs available dates
  // Implementation would depend on specific business logic
  return 0;
});

// Indexes for better query performance
listingSchema.index({ status: 1, featured: -1 });
listingSchema.index({ host: 1 });
listingSchema.index({ price: 1 });
listingSchema.index({ "rating.overall": -1 });
listingSchema.index({ guests: 1, bedrooms: 1, bathrooms: 1 });
listingSchema.index({ amenities: 1 });
listingSchema.index({ type: 1, category: 1 });
listingSchema.index({ createdAt: -1 });

// Text search index
listingSchema.index({
  title: "text",
  description: "text",
  "location.city": "text",
  "location.neighborhood": "text",
  tags: "text",
});

// Pre-save middleware
listingSchema.pre("save", function (next) {
  // Ensure only one primary image
  if (this.images && this.images.length > 0) {
    const primaryImages = this.images.filter((img) => img.isPrimary);
    if (primaryImages.length === 0) {
      this.images[0].isPrimary = true;
    } else if (primaryImages.length > 1) {
      this.images.forEach((img, index) => {
        img.isPrimary = index === 0;
      });
    }
  }

  next();
});

// Method to calculate average rating
listingSchema.methods.calculateAverageRating = function () {
  const ratings = this.rating;
  const ratingValues = [
    ratings.cleanliness,
    ratings.accuracy,
    ratings.communication,
    ratings.location,
    ratings.value,
  ].filter((rating) => rating > 0);

  if (ratingValues.length === 0) {
    this.rating.overall = 0;
  } else {
    this.rating.overall =
      ratingValues.reduce((sum, rating) => sum + rating, 0) /
      ratingValues.length;
  }

  return this.rating.overall;
};

// Method to check availability for date range
listingSchema.methods.isAvailable = function (checkIn, checkOut) {
  // Implementation would check against bookings and availability calendar
  // This is a simplified version
  return true;
};

// Method to calculate total price for stay
listingSchema.methods.calculateTotalPrice = function (
  checkIn,
  checkOut,
  guests = 1
) {
  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  let total = this.price * nights;

  // Add cleaning fee
  total += this.cleaningFee;

  // Apply discounts
  if (nights >= 28 && this.monthlyDiscount > 0) {
    total *= 1 - this.monthlyDiscount / 100;
  } else if (nights >= 7 && this.weeklyDiscount > 0) {
    total *= 1 - this.weeklyDiscount / 100;
  }

  // Add additional fees
  this.additionalFees.forEach((fee) => {
    if (fee.type === "per_night") {
      total += fee.amount * nights;
    } else if (fee.type === "per_person") {
      total += fee.amount * guests;
    } else {
      total += fee.amount;
    }
  });

  return Math.round(total * 100) / 100; // Round to 2 decimal places
};

export default mongoose.model("Listing", listingSchema);
