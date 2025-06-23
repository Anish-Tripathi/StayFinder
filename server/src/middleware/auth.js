// src/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Express: Required authentication middleware
export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        message: "No token provided, authorization denied",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Token is not valid",
      });
    }

    req.user = { userId: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({
      message: "Token is not valid",
    });
  }
};

// Socket.IO: Authentication middleware
export const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      const err = new Error("Authentication error: No token provided");
      err.data = { status: 401 };
      return next(err);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      const err = new Error("Authentication error: Invalid token");
      err.data = { status: 401 };
      return next(err);
    }

    socket.user = { userId: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    console.error("Socket.IO auth middleware error:", error);
    const err = new Error("Authentication error: Invalid token");
    err.data = { status: 401 };
    return next(err);
  }
};

// Express: Optional authentication middleware
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      req.user = null;
      return next();
    }

    req.user = { userId: user._id.toString(), role: user.role };
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

// Express: Role-based authorization middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Authorization required",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};

// Express: Host-only middleware
export const hostOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authorization required",
    });
  }

  if (req.user.role !== "host" && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Host privileges required.",
    });
  }

  next();
};

// Express: Admin-only middleware
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Authorization required",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin privileges required.",
    });
  }

  next();
};
