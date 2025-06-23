import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "30d",
  });
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, password, phone, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: role || "guest",
    });
    await user.save();
    const token = generateToken(user._id);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      message: "Server error during registration",
    });
  }
};

export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    await user.updateLoginInfo();
    const token = generateToken(user._id);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json({
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, phone, bio, email } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          message: "Email already in use by another account",
        });
      }
      user.email = email;
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    await user.save();
    const userResponse = user.toObject();
    delete userResponse.password;
    res.json({
      message: "Profile updated successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      message: "Server error during profile update",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId).select("+password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }
    user.password = newPassword;
    await user.save();
    res.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      message: "Server error during password change",
    });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.avatar = req.file.path;
    await user.save();

    res.json({
      message: "Avatar uploaded successfully",
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Avatar upload error:", error);
    res.status(500).json({ message: "Server error during avatar upload" });
  }
};

export const updateNotificationPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { email, sms, push } = req.body;

    if (email !== undefined) user.preferences.notifications.email = email;
    if (sms !== undefined) user.preferences.notifications.sms = sms;
    if (push !== undefined) user.preferences.notifications.push = push;

    await user.save();

    res.json({
      message: "Notification preferences updated successfully",
      preferences: user.preferences.notifications,
    });
  } catch (error) {
    console.error("Notification update error:", error);
    res
      .status(500)
      .json({ message: "Server error during notification update" });
  }
};

export const updateAccountPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { currency, language } = req.body;

    if (currency) user.preferences.currency = currency;
    if (language) user.preferences.language = language;

    await user.save();

    res.json({
      message: "Account preferences updated successfully",
      preferences: {
        currency: user.preferences.currency,
        language: user.preferences.language,
      },
    });
  } catch (error) {
    console.error("Account preferences update error:", error);
    res.status(500).json({ message: "Server error during preferences update" });
  }
};

export const logout = (req, res) => {
  res.json({
    message: "Logout successful",
  });
};
