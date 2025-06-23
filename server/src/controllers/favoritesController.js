import User from "../models/User.js";
import Listing from "../models/Listing.js";
import { validationResult } from "express-validator";

export const addToFavorites = async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.user.userId;

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Add to user's favorites if not already added
    const user = await User.findById(userId);
    if (!user.favorites.includes(listingId)) {
      user.favorites.push(listingId);
      await user.save();
    }

    res.json({ message: "Added to favorites successfully" });
  } catch (error) {
    console.error("Add to favorites error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID" });
    }
    res.status(500).json({ message: "Server error while adding to favorites" });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.user.userId;

    // Remove from user's favorites
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: listingId } },
      { new: true }
    );

    res.json({ message: "Removed from favorites successfully" });
  } catch (error) {
    console.error("Remove from favorites error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID" });
    }
    res
      .status(500)
      .json({ message: "Server error while removing from favorites" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    const {
      page = 1,
      limit = 12,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const userId = req.user.userId;
    const user = await User.findById(userId).select("favorites");

    if (!user || !user.favorites.length) {
      return res.json({
        listings: [],
        pagination: {
          currentPage: parseInt(page),
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: parseInt(limit),
          hasNextPage: false,
          hasPrevPage: false,
        },
      });
    }

    const sort = {};
    if (sortBy === "price") sort.price = sortOrder === "asc" ? 1 : -1;
    else if (sortBy === "rating")
      sort["rating.overall"] = sortOrder === "asc" ? 1 : -1;
    else sort.createdAt = sortOrder === "asc" ? 1 : -1;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [listings, total] = await Promise.all([
      Listing.find({
        _id: { $in: user.favorites },
        status: "active",
      })
        .populate("host", "firstName lastName avatar hostInfo.isSuperhost")
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Listing.countDocuments({
        _id: { $in: user.favorites },
        status: "active",
      }),
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.json({
      listings,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ message: "Server error while fetching favorites" });
  }
};

export const checkFavorite = async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.user.userId;

    const user = await User.findById(userId).select("favorites");
    const isFavorite = user?.favorites?.includes(listingId) || false;

    res.json({ isFavorite });
  } catch (error) {
    console.error("Check favorite error:", error);
    res.status(500).json({ message: "Server error while checking favorite" });
  }
};
