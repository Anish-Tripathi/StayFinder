import express from "express";
import { auth, optionalAuth } from "../middleware/auth.js";
import { listingUpload } from "../config/multerConfig.js";

import {
  getListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getSearchSuggestions,
  uploadImages,
  deleteImage,
} from "../controllers/listingController.js";

const router = express.Router();

router.get("/", getListings);

router.get("/:id", optionalAuth, getListingById);

router.post("/", auth, createListing);

router.put("/:id", auth, updateListing);

router.delete("/:id", auth, deleteListing);

router.get("/search/suggestions", getSearchSuggestions);

router.post("/upload", listingUpload, uploadImages);

router.delete("/:listingId/image/:imageId", auth, deleteImage);

export default router;
