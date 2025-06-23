import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import connectDB from "./db/connection.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { socketAuth } from "./middleware/auth.js";
import Booking from "./models/Booking.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import hostRoutes from "./routes/hostRoutes.js";
import stripeWebhook from "./routes/stripe-webhook.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Initialize database connection
connectDB();

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://your-domain.com"]
      : ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
};

// Socket.IO configuration
const io = new Server(server, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
});

// Socket.IO Authentication Middleware
io.use(socketAuth);

// Socket.IO Connection Handler
io.on("connection", (socket) => {
  // Join booking rooms
  socket.on("join_booking", async ({ bookingId, sender }) => {
    try {
      if (!bookingId) {
        socket.emit("error", {
          message: "Invalid booking ID",
          details: { bookingId },
        });
        return;
      }
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        socket.emit("error", {
          message: "Booking not found",
          details: { bookingId },
        });
        return;
      }
      if (
        booking.guest.toString() !== socket.user.userId &&
        booking.host.toString() !== socket.user.userId
      ) {
        socket.emit("error", {
          message: "Not authorized to join this chat",
          details: { bookingId, userId: socket.user.userId },
        });
        return;
      }
      socket.join(`booking_${bookingId}`);
      socket.emit("joined_booking", { bookingId });
    } catch (error) {
      console.error("Join booking error:", error.message, {
        bookingId,
        userId: socket.user.userId,
      });
      socket.emit("error", {
        message: "Server error joining booking",
        details: { error: error.message },
      });
    }
  });

  // Send message
  socket.on(
    "send_message",
    async ({
      bookingId,
      content,
      fileUrl,
      fileName,
      fileType,
      sender,
      timestamp,
      read,
    }) => {
      try {
        if (!bookingId) {
          socket.emit("error", {
            message: "Missing booking ID",
            details: { bookingId },
          });
          return;
        }
        if (!content && !fileUrl) {
          socket.emit("error", {
            message: "Message must have content or file",
            details: { bookingId, content, fileUrl },
          });
          return;
        }

        const senderId = sender || socket.user.userId;
        if (!senderId) {
          socket.emit("error", {
            message: "Missing sender ID",
            details: { bookingId, receivedSender: sender },
          });
          return;
        }
        if (senderId !== socket.user.userId) {
          socket.emit("error", {
            message: "Sender ID does not match authenticated user",
            details: { bookingId, senderId, userId: socket.user.userId },
          });
          return;
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
          socket.emit("error", {
            message: "Booking not found",
            details: { bookingId },
          });
          return;
        }
        if (
          booking.guest.toString() !== socket.user.userId &&
          booking.host.toString() !== socket.user.userId
        ) {
          socket.emit("error", {
            message: "Not authorized to send message",
            details: { bookingId, userId: socket.user.userId },
          });
          return;
        }

        const message = {
          sender: senderId,
          content: content || "",
          fileUrl,
          fileName,
          fileType,
          timestamp: timestamp ? new Date(timestamp) : new Date(),
          read: read || false,
        };

        booking.messages.push(message);
        await booking.save();

        io.to(`booking_${bookingId}`).emit("receive_message", message);
      } catch (error) {
        console.error("Send message error:", error.message, {
          bookingId,
          sender: socket.user.userId,
          stack: error.stack,
        });
        socket.emit("error", {
          message: error.message || "Failed to send message",
          details: { bookingId, error: error.message },
        });
      }
    }
  );

  // Mark messages as read
  socket.on("mark_read", async ({ bookingId, sender }) => {
    try {
      if (!bookingId) {
        socket.emit("error", {
          message: "Invalid booking ID",
          details: { bookingId },
        });
        return;
      }
      const senderId = sender || socket.user.userId;
      if (!senderId) {
        socket.emit("error", {
          message: "Missing sender ID",
          details: { bookingId, receivedSender: sender },
        });
        return;
      }
      if (senderId !== socket.user.userId) {
        socket.emit("error", {
          message: "Sender ID does not match authenticated user",
          details: { bookingId, senderId, userId: socket.user.userId },
        });
        return;
      }

      const booking = await Booking.findById(bookingId);
      if (!booking) {
        socket.emit("error", {
          message: "Booking not found",
          details: { bookingId },
        });
        return;
      }
      if (
        booking.guest.toString() !== socket.user.userId &&
        booking.host.toString() !== socket.user.userId
      ) {
        socket.emit("error", {
          message: "Not authorized",
          details: { bookingId, userId: socket.user.userId },
        });
        return;
      }
      booking.messages.forEach((msg) => {
        if (msg.sender.toString() !== socket.user.userId) {
          msg.read = true;
        }
      });
      await booking.save();
      io.to(`booking_${bookingId}`).emit("messages_read", { bookingId });
    } catch (error) {
      console.error("Mark read error:", error.message, {
        bookingId,
        userId: socket.user.userId,
        stack: error.stack,
      });
      socket.emit("error", {
        message: "Failed to mark messages as read",
        details: { bookingId, error: error.message },
      });
    }
  });

  socket.on("disconnect", () => {});
});

// Express Middleware
app.use(cors(corsOptions));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(compression());

app.use("/api/stripe-webhook", stripeWebhook);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
  skip: (req) => req.path.startsWith("/api/stripe-webhook"),
});
app.use("/api", limiter);

app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/host", hostRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/favorites", favoritesRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);

  const errorResponse = {
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  if (err.name === "ValidationError") {
    return res.status(400).json({
      ...errorResponse,
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      ...errorResponse,
      message: "Invalid ID format",
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      ...errorResponse,
      message: "Duplicate field value",
    });
  }

  res.status(err.status || 500).json(errorResponse);
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { app, server, io };
