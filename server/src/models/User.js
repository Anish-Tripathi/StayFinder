import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please enter a valid phone number"],
    },
    avatar: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    role: {
      type: String,
      enum: ["guest", "host", "admin"],
      default: "guest",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Host-specific fields
    hostInfo: {
      responseRate: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      responseTime: {
        type: String,
        enum: [
          "within an hour",
          "within a few hours",
          "within a day",
          "within 30 minutes",
          "within 2 hours",
        ],
        default: "within a day",
      },
      languages: [
        {
          type: String,
          trim: true,
        },
      ],
      joinedDate: {
        type: Date,
        default: Date.now,
      },
      isSuperhost: {
        type: Boolean,
        default: false,
      },
    },

    // Guest-specific fields
    guestInfo: {
      preferences: {
        smokingAllowed: Boolean,
        petsAllowed: Boolean,
        partiesAllowed: Boolean,
      },
      emergencyContact: {
        name: String,
        phone: String,
        relationship: String,
      },
    },

    // Social login
    googleId: String,
    facebookId: String,

    // Activity tracking
    lastLogin: Date,
    loginCount: {
      type: Number,
      default: 0,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        default: [],
      },
    ],

    // Preferences
    preferences: {
      currency: {
        type: String,
        default: "USD",
      },
      language: {
        type: String,
        default: "en",
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: false,
        },
        push: {
          type: Boolean,
          default: true,
        },
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for listings (if host)
userSchema.virtual("listings", {
  ref: "Listing",
  localField: "_id",
  foreignField: "host",
});

// Virtual for bookings
userSchema.virtual("bookings", {
  ref: "Booking",
  localField: "_id",
  foreignField: "guest",
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate verification token
userSchema.methods.generateVerificationToken = function () {
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  this.verificationToken = token;
  return token;
};

// Method to update login info
userSchema.methods.updateLoginInfo = function () {
  this.lastLogin = new Date();
  this.loginCount += 1;
  return this.save();
};

// Index for better query performance

userSchema.index({ role: 1 });
userSchema.index({ "hostInfo.isSuperhost": 1 });

export default mongoose.model("User", userSchema);
