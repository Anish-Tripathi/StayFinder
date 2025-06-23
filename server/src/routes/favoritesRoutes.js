import express from "express";
import { query } from "express-validator";
import { auth } from "../middleware/auth.js";
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  checkFavorite,
} from "../controllers/favoritesController.js";

const router = express.Router();

router.get(
  "/",
  auth,
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage("Limit must be between 1 and 50"),
  ],
  getFavorites
);

router.post("/:listingId", auth, addToFavorites);

router.delete("/:listingId", auth, removeFromFavorites);

router.get("/check/:listingId", auth, checkFavorite);

export default router;
