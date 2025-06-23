import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getStats,
  getHostListings,
  getHostBookings,
  getCalendar,
  getAnalytics,
} from "../controllers/hostController.js";

const router = express.Router();

router.get("/stats", auth, getStats);
router.get("/listings", auth, getHostListings);
router.get("/bookings", auth, getHostBookings);
router.get("/calendar", auth, getCalendar);
router.get("/analytics", auth, getAnalytics);

export default router;
