import Listing from "../models/Listing.js";
import Booking from "../models/Booking.js";
import { validationResult } from "express-validator";
import axios from "axios";
import fs from "fs/promises";
import path from "path";

// In-memory cache for geocoded coordinates
const coordinateCache = new Map();

const validPropertyTypes = [
  "haveli",
  "house",
  "cottage",
  "apartment",
  "villa",
  "resort",
  "bungalow",
  "tent",
  "guesthouse",
];

async function getCoordinates(location) {
  const { address, city, country, state, zipCode } = location || {};

  // Validate inputs
  if (!city || typeof city !== "string" || city.trim().length === 0) {
    console.warn("Geocoding failed: city is missing or invalid");
    return null;
  }

  // Normalize address components
  const normalizeString = (str) => {
    if (!str || typeof str !== "string") return "";
    return str
      .toLowerCase()
      .replace(/\b(shop|store|near|opposite|behind|hotel|apartment)\b/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const normalizedAddress = normalizeString(address);
  const normalizedCity = normalizeString(city);
  const normalizedState = normalizeString(state);
  const normalizedCountry = normalizeString(country);
  const normalizedZipCode = normalizeString(zipCode);

  // Create cache key
  const cacheKey = [
    normalizedAddress,
    normalizedCity,
    normalizedState,
    normalizedCountry,
    normalizedZipCode,
  ]
    .filter(Boolean)
    .join(", ");

  // Check cache
  if (coordinateCache.has(cacheKey)) {
    return coordinateCache.get(cacheKey);
  }

  try {
    // Build query variations
    const queries = [];
    if (
      normalizedAddress &&
      normalizedCity &&
      normalizedState &&
      normalizedCountry
    ) {
      queries.push(
        `${normalizedAddress}, ${normalizedCity}, ${normalizedState}, ${normalizedCountry}${
          normalizedZipCode ? ` ${normalizedZipCode}` : ""
        }`
      );
    }
    if (normalizedAddress && normalizedCity && normalizedCountry) {
      queries.push(
        `${normalizedAddress}, ${normalizedCity}, ${normalizedCountry}`
      );
    }
    if (normalizedCity && normalizedState && normalizedCountry) {
      queries.push(
        `${normalizedCity}, ${normalizedState}, ${normalizedCountry}`
      );
    }
    if (normalizedCity && normalizedCountry) {
      queries.push(`${normalizedCity}, ${normalizedCountry}`);
    }
    queries.push(normalizedCity);

    // Try each query
    for (const query of queries) {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "json",
            limit: 1,
            addressdetails: 1,
          },
          headers: {
            "User-Agent": "StayFinder/1.0 (stay.finder@example.com)",
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon, address: responseAddress } = response.data[0];
        if (
          responseAddress.city?.toLowerCase().includes(normalizedCity) ||
          responseAddress.town?.toLowerCase().includes(normalizedCity) ||
          responseAddress.village?.toLowerCase().includes(normalizedCity) ||
          responseAddress.country?.toLowerCase().includes(normalizedCountry)
        ) {
          const coords = [parseFloat(lon), parseFloat(lat)];
          coordinateCache.set(cacheKey, coords);
          return coords;
        }
      }
    }

    console.warn("Geocoding failed for all queries:", queries);
    return null;
  } catch (error) {
    console.error("Geocoding error:", error.message, error.response?.data);
    return null;
  }
}

export const getListings = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    const {
      page = 1,
      limit = 1000,
      location,
      minPrice,
      maxPrice,
      guests,
      bedrooms,
      bathrooms,
      types,
      amenities,
      rating,
      featured,
      sortBy = "createdAt",
      sortOrder = "desc",
      fetchAll = "false",
    } = req.query;

    const filter = { status: "active" };
    if (location) {
      filter.$or = [
        { "location.city": { $regex: location, $options: "i" } },
        { "location.country": { $regex: location, $options: "i" } },
        { "location.neighborhood": { $regex: location, $options: "i" } },
        { title: { $regex: location, $options: "i" } },
      ];
    }
    if (minPrice)
      filter.price = { ...filter.price, $gte: parseFloat(minPrice) };
    if (maxPrice)
      filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
    if (guests) filter.guests = { $gte: parseInt(guests) };
    if (bedrooms) filter.bedrooms = { $gte: parseInt(bedrooms) };
    if (bathrooms) filter.bathrooms = { $gte: parseFloat(bathrooms) };
    if (types) {
      const typeArray = types
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter((t) => validPropertyTypes.includes(t));
      if (typeArray.length > 0) {
        filter.type = { $in: typeArray };
      } else {
        console.warn("Invalid property types:", types);
      }
    }
    if (amenities) filter.amenities = { $all: amenities.split(",") };
    if (rating) filter["rating.overall"] = { $gte: parseFloat(rating) };
    if (featured === "true") filter.featured = true;

    const sort = {};
    if (sortBy === "price") sort.price = sortOrder === "asc" ? 1 : -1;
    else if (sortBy === "rating")
      sort["rating.overall"] = sortOrder === "asc" ? 1 : -1;
    else if (sortBy === "reviews")
      sort.reviewCount = sortOrder === "asc" ? 1 : -1;
    else sort.createdAt = sortOrder === "asc" ? 1 : -1;

    let listings, total;
    if (fetchAll === "true") {
      // Fetch all properties for client-side filtering
      listings = await Listing.find(filter)
        .populate("host", "firstName lastName avatar hostInfo.isSuperhost")
        .sort(sort)
        .select(
          "title description location price rating type amenities bedrooms bathrooms beds guests availability images reviewCount"
        )
        .lean();
      total = listings.length;
    } else {
      // Paginated fetch
      const skip = (parseInt(page) - 1) * parseInt(limit);
      [listings, total] = await Promise.all([
        Listing.find(filter)
          .populate("host", "firstName lastName avatar hostInfo.isSuperhost")
          .sort(sort)
          .skip(skip)
          .limit(parseInt(limit))
          .select(
            "title description location price rating type amenities bedrooms bathrooms beds guests availability images reviewCount"
          )
          .lean(),
        Listing.countDocuments(filter),
      ]);
    }

    res.json({
      listings,
      pagination:
        fetchAll === "true"
          ? null
          : {
              currentPage: parseInt(page),
              totalPages: Math.ceil(total / parseInt(limit)),
              totalItems: total,
              itemsPerPage: parseInt(limit),
              hasNextPage: parseInt(page) < Math.ceil(total / parseInt(limit)),
              hasPrevPage: parseInt(page) > 1,
            },
    });
  } catch (error) {
    console.error("Get listings error:", error);
    res.status(500).json({ message: "Server error while fetching listings" });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate("host", "firstName lastName avatar hostInfo phone email")
      .populate({
        path: "reviews",
        populate: { path: "user", select: "firstName lastName avatar" },
        options: { sort: { createdAt: -1 }, limit: 10 },
      })
      .lean();
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Increment views
    await Listing.updateOne({ _id: req.params.id }, { $inc: { views: 1 } });
    res.json(listing);
  } catch (error) {
    console.error("Get listing error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID" });
    }
    res.status(500).json({ message: "Server error while fetching listing" });
  }
};

export const uploadImages = async (req, res) => {
  try {
    console.log("Upload request received:", {
      headers: {
        "content-type": req.get("Content-Type"),
        "content-length": req.get("Content-Length"),
      },
      hasFiles: !!req.files,
      filesCount: req.files?.length || 0,
      bodyKeys: Object.keys(req.body || {}),
      method: req.method,
      url: req.url,
    });

    if (req.files && req.files.length > 0) {
      console.log(
        "Files details:",
        req.files.map((f) => ({
          fieldname: f.fieldname,
          originalname: f.originalname,
          mimetype: f.mimetype,
          size: f.size,
          filename: f.filename,
        }))
      );
    }

    if (!req.files || req.files.length === 0) {
      console.log(
        "No files detected in request - checking req.file as well:",
        !!req.file
      );
      return res.status(400).json({
        message: "No files uploaded",
        debug: {
          hasFiles: !!req.files,
          hasFile: !!req.file,
          filesLength: req.files?.length || 0,
          bodyKeys: Object.keys(req.body || {}),
        },
      });
    }

    const urls = req.files.map(
      (file) =>
        `${req.protocol}://${req.get("host")}/uploads/listings/${file.filename}`
    );

    console.log("Successfully processed files:", urls);
    res.json({ urls });
  } catch (error) {
    console.error("Upload error:", {
      message: error.message,
      stack: error.stack,
    });
    res
      .status(500)
      .json({ message: "Error uploading images", error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { listingId, imageId } = req.params;

    console.log(
      `Deleting image for listingId: ${listingId}, imageId: ${imageId}`
    );

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.host.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to modify this listing" });
    }

    const imageIndex = listing.images.findIndex(
      (img) => img._id.toString() === imageId
    );
    if (imageIndex === -1) {
      return res.status(404).json({ message: "Image not found" });
    }

    const image = listing.images[imageIndex];
    const filename = image.url.split("/").pop();
    if (!filename) {
      return res.status(400).json({ message: "Invalid image URL" });
    }

    const filePath = path.join(process.cwd(), "uploads", "listings", filename);
    console.log(`Attempting to delete file: ${filePath}`);

    listing.images.splice(imageIndex, 1);

    if (image.isPrimary && listing.images.length > 0) {
      listing.images[0].isPrimary = true;
    }

    await listing.save();
    console.log(`Updated listing images: ${listing.images.length} remaining`);

    try {
      await fs.unlink(filePath);
      console.log(`Deleted file: ${filePath}`);
    } catch (err) {
      console.error(`Failed to delete file ${filePath}:`, err.message);
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete image error:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting image", error: error.message });
  }
};

export const createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      category,
      price,
      guests,
      bedrooms,
      beds,
      bathrooms,
      location,
      amenities,
      images,
      cleaningFee,
      securityDeposit,
      weeklyDiscount,
      monthlyDiscount,
      houseRules,
      availability,
      instantBook,
      cancellationPolicy,
      additionalFees,
      license,
      tags,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !type ||
      !category ||
      !price ||
      !guests ||
      !bedrooms ||
      !beds ||
      !bathrooms ||
      !location?.address ||
      !location?.city ||
      !location?.country ||
      !cancellationPolicy
    ) {
      return res.status(400).json({
        message: "Missing required fields",
        missingFields: {
          title: !title,
          description: !description,
          type: !type,
          category: !category,
          price: !price,
          guests: !guests,
          bedrooms: !bedrooms,
          beds: !beds,
          bathrooms: !bathrooms,
          locationAddress: !location?.address,
          locationCity: !location?.city,
          locationCountry: !location?.country,
          cancellationPolicy: !cancellationPolicy,
        },
      });
    }

    // Validate property type
    if (!validPropertyTypes.includes(type.toLowerCase())) {
      return res
        .status(400)
        .json({ message: `Invalid property type: ${type}` });
    }

    // Validate images
    const imageData = images || [];
    if (!imageData.length) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // Fetch coordinates
    const coordinates = await getCoordinates(location);
    if (!coordinates) {
      return res.status(400).json({
        message: "Unable to geocode address. Please provide a valid address.",
      });
    }

    const listingData = {
      title,
      description,
      location: { ...location, coordinates },
      amenities: amenities || [],
      images: imageData.map((img, index) => ({
        url: img.url || "",
        isPrimary: index === 0,
      })),
      type: type.toLowerCase(), // Normalize case
      category,
      price: parseFloat(price),
      guests: parseInt(guests),
      bedrooms: parseInt(bedrooms),
      beds: parseInt(beds),
      bathrooms: parseFloat(bathrooms),
      host: req.user.userId,
      currency: "INR",
      status: "active",
      cleaningFee: parseFloat(cleaningFee) || 0,
      securityDeposit: parseFloat(securityDeposit) || 0,
      weeklyDiscount: parseFloat(weeklyDiscount) || 0,
      monthlyDiscount: parseFloat(monthlyDiscount) || 0,
      houseRules: houseRules || {},
      availability: availability || {},
      instantBook: !!instantBook,
      cancellationPolicy,
      additionalFees: additionalFees || [],
      tags: tags || [],
      license:
        license && (license.number || license.type || license.expiryDate)
          ? {
              number: license.number || undefined,
              type: license.type || undefined,
              expiryDate: license.expiryDate
                ? new Date(license.expiryDate)
                : undefined,
            }
          : undefined,
    };

    const listing = new Listing(listingData);
    await listing.save();
    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    console.error("Create listing error:", error);
    res.status(500).json({
      message: "Server error while creating listing",
      error: error.message,
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    console.log("Updating listing with data:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation errors:", errors.array());
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }

    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.host.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this listing" });
    }

    const allowedFields = [
      "title",
      "description",
      "type",
      "category",
      "price",
      "guests",
      "bedrooms",
      "beds",
      "bathrooms",
      "location",
      "amenities",
      "images",
      "cleaningFee",
      "securityDeposit",
      "weeklyDiscount",
      "monthlyDiscount",
      "houseRules",
      "availability",
      "instantBook",
      "cancellationPolicy",
      "additionalFees",
      "license",
      "tags",
      "featured",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    console.log("Processed updates:", updates);

    // Validate property type
    if (
      updates.type &&
      !validPropertyTypes.includes(updates.type.toLowerCase())
    ) {
      return res
        .status(400)
        .json({ message: `Invalid property type: ${updates.type}` });
    }
    if (updates.type) updates.type = updates.type.toLowerCase();

    // Handle location and coordinates
    if (
      updates.location &&
      (updates.location.address || updates.location.city)
    ) {
      try {
        const coordinates = await getCoordinates(updates.location);
        if (!coordinates) {
          return res.status(400).json({
            message:
              "Unable to geocode updated address. Please provide a valid address.",
          });
        }
        updates.location.coordinates = coordinates;
      } catch (err) {
        console.error("Geocoding error:", err.message);
        return res.status(400).json({ message: "Geocoding failed" });
      }
    }

    // Handle images
    if (updates.images) {
      updates.images = updates.images.map((img, index) => {
        if (!img.url) {
          throw new Error(`Image at index ${index} is missing URL`);
        }
        // Validate _id
        let _id = img._id;
        if (_id && !mongoose.isValidObjectId(_id)) {
          console.warn(`Invalid _id for image at index ${index}: ${_id}`);
          _id = undefined;
        }
        return {
          url: img.url,
          isPrimary: img.isPrimary || false,
          caption: img.caption || "",
          _id,
        };
      });

      const primaryCount = updates.images.filter((img) => img.isPrimary).length;
      if (primaryCount === 0 && updates.images.length > 0) {
        updates.images[0].isPrimary = true;
      } else if (primaryCount > 1) {
        updates.images = updates.images.map((img, i) => ({
          ...img,
          isPrimary: i === 0,
        }));
      }
    }

    // Handle license
    if (updates.license) {
      updates.license = {
        number: updates.license.number || undefined,
        type: updates.license.type || undefined,
        expiryDate: updates.license.expiryDate
          ? new Date(updates.license.expiryDate)
          : undefined,
      };
    }

    Object.assign(listing, updates);
    await listing.save();
    await listing.populate("host", "firstName lastName avatar");

    console.log("Listing updated successfully:", listing._id);
    res.json({ message: "Listing updated successfully", listing });
  } catch (error) {
    console.error("Update listing error:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      message: "Server error while updating listing",
      error: error.message,
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.host.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this listing" });
    }
    const activeBookings = await Booking.countDocuments({
      listing: listing._id,
      status: { $in: ["confirmed", "in_progress"] },
    });
    if (activeBookings > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete listing with active bookings" });
    }
    await listing.deleteOne();
    res.json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Delete listing error:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid listing ID" });
    }
    res.status(500).json({ message: "Server error while deleting listing" });
  }
};

export const getSearchSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: errors.array() });
    }
    const { q } = req.query;
    const cities = await Listing.aggregate([
      {
        $match: {
          status: "active",
          $or: [
            { "location.city": { $regex: q, $options: "i" } },
            { "location.country": { $regex: q, $options: "i" } },
          ],
        },
      },
      {
        $group: {
          _id: { city: "$location.city", country: "$location.country" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          city: "$_id.city",
          country: "$_id.country",
          count: 1,
          label: { $concat: ["$_id.city", ", ", "$_id.country"] },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    res.json({ suggestions: cities });
  } catch (error) {
    console.error("Search suggestions error:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching suggestions" });
  }
};
