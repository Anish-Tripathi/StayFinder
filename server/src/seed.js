import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Listing from "./models/Listing.js";
import Booking from "./models/Booking.js";

dotenv.config();

// Sample Users
const sampleUsers = [
  {
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@example.com",
    password: "delhi1234",
    role: "guest",
    phone: "+919876543210",
    bio: "Travel enthusiast from Delhi who loves exploring heritage sites",
  },
  {
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@example.com",
    password: "mumbai123",
    role: "host",
    phone: "+919876543211",
    bio: "Mumbai-based host with beautiful apartments near beaches",
    hostInfo: {
      responseRate: 99,
      responseTime: "within 30 minutes",
      languages: ["Hindi", "English", "Gujarati"],
      isSuperhost: true,
    },
  },
  {
    firstName: "Arjun",
    lastName: "Singh",
    email: "arjun.singh@example.com",
    password: "jaipur123",
    role: "host",
    phone: "+919876543212",
    bio: "Heritage home owner in Jaipur offering authentic Rajasthani experience",
    hostInfo: {
      responseRate: 97,
      responseTime: "within an hour",
      languages: ["Hindi", "English"],
      isSuperhost: true,
    },
  },
  {
    firstName: "Ananya",
    lastName: "Gupta",
    email: "ananya.g@example.com",
    password: "bangalore12",
    role: "guest",
    phone: "+919876543213",
    bio: "Software professional from Bangalore who travels frequently for work",
  },
  {
    firstName: "Vikram",
    lastName: "Joshi",
    email: "vikram.j@example.com",
    password: "goa2023",
    role: "host",
    phone: "+919876543214",
    bio: "Beach cottage owner in Goa specializing in long-term stays",
    hostInfo: {
      responseRate: 94,
      responseTime: "within 2 hours",
      languages: ["Hindi", "English", "Konkani"],
      isSuperhost: false,
    },
  },
];

const sampleListings = [
  {
    title: "Heritage Haveli with Rajasthani Charm",
    description:
      "Experience royal Rajasthani hospitality in this beautifully restored haveli. Features traditional architecture, intricate carvings, and a peaceful courtyard. Perfect for families seeking an authentic cultural experience with modern amenities.",
    type: "haveli",
    category: "entire_place",
    guests: 8,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3,
    location: {
      address: "123 Haveli Road",
      city: "Udaipur",
      state: "Rajasthan",
      country: "India",
      zipCode: "313001",
      coordinates: [73.7125, 24.5854],
      neighborhood: "City Palace Area",
    },
    price: 8500,
    cleaningFee: 1500,
    weeklyDiscount: 10,
    monthlyDiscount: 20,
    images: [
      {
        url: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800",
        isPrimary: true,
      },
      {
        url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
    amenities: [
      "wifi",
      "kitchen",
      "courtyard",
      "parking",
      "traditional_decor",
      "air_conditioning",
      "heritage_dining",
    ],
    status: "active",
    featured: true,
    rating: {
      overall: 4.8,
      cleanliness: 4.9,
      accuracy: 4.8,
      communication: 4.7,
      location: 4.9,
      value: 4.6,
    },
    reviewCount: 47,
  },
  {
    title: "Himalayan View Cottage in Manali",
    description:
      "Wake up to stunning Himalayan peaks in this cozy mountain cottage. Surrounded by apple orchards and pine forests, perfect for nature lovers and adventure seekers. Features fireplace, mountain views, and easy access to trekking trails.",
    type: "cottage",
    category: "entire_place",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    location: {
      address: "456 Himalaya View Road",
      city: "Manali",
      state: "Himachal Pradesh",
      country: "India",
      zipCode: "175131",
      coordinates: [77.1734, 32.2396],
      neighborhood: "Old Manali",
    },
    price: 4500,
    cleaningFee: 800,
    weeklyDiscount: 15,
    images: [
      {
        url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
        isPrimary: true,
      },
    ],
    amenities: [
      "wifi",
      "kitchen",
      "fireplace",
      "mountain_view",
      "parking",
      "heating",
      "trekking_access",
    ],
    status: "active",
    featured: true,
    rating: {
      overall: 4.6,
      cleanliness: 4.7,
      accuracy: 4.6,
      communication: 4.8,
      location: 4.5,
      value: 4.7,
    },
    reviewCount: 32,
  },
  {
    title: "Modern Service Apartment in Cyber City",
    description:
      "Contemporary service apartment in Gurgaon's business district. Fully furnished with modern amenities, perfect for business travelers and IT professionals. Walking distance to metro, malls, and corporate offices.",
    type: "apartment",
    category: "entire_place",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    location: {
      address: "789 DLF Cyber Hub",
      city: "Gurgaon",
      state: "Haryana",
      country: "India",
      zipCode: "122002",
      coordinates: [77.0688, 28.4595],
      neighborhood: "DLF Cyber City",
    },
    price: 3200,
    cleaningFee: 600,
    images: [
      {
        url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
        isPrimary: true,
      },
    ],
    amenities: [
      "wifi",
      "kitchen",
      "air_conditioning",
      "elevator",
      "laptop_friendly_workspace",
      "gym",
      "security",
    ],
    status: "active",
    rating: {
      overall: 4.4,
      cleanliness: 4.5,
      accuracy: 4.4,
      communication: 4.6,
      location: 4.8,
      value: 4.2,
    },
    reviewCount: 28,
  },
  {
    title: "Backwater Villa in God's Own Country",
    description:
      "Serene villa overlooking Kerala's famous backwaters. Experience tranquil boat rides, traditional Ayurvedic treatments, and authentic Kerala cuisine. Perfect for couples seeking a romantic getaway or families wanting to explore Kerala's natural beauty.",
    type: "villa",
    category: "entire_place",
    guests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    location: {
      address: "321 Backwater Lane",
      city: "Alleppey",
      state: "Kerala",
      country: "India",
      zipCode: "688001",
      coordinates: [76.3388, 9.4981],
      neighborhood: "Vembanad Lake",
    },
    price: 6200,
    cleaningFee: 1000,
    weeklyDiscount: 12,
    images: [
      {
        url: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
        isPrimary: true,
      },
    ],
    amenities: [
      "wifi",
      "kitchen",
      "backwater_view",
      "parking",
      "boat_access",
      "ayurvedic_spa",
      "traditional_meals",
    ],
    status: "active",
    rating: {
      overall: 4.7,
      cleanliness: 4.8,
      accuracy: 4.7,
      communication: 4.9,
      location: 4.6,
      value: 4.8,
    },
    reviewCount: 19,
  },
  {
    title: "Luxury Beach Resort in Paradise",
    description:
      "Premium beachfront property with pristine white sand beaches and crystal-clear waters. Features infinity pool, spa services, and water sports facilities. Perfect for luxury vacations and special celebrations.",
    type: "resort",
    category: "entire_place",
    guests: 8,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3,
    location: {
      address: "555 Beach Paradise Road",
      city: "Calangute",
      state: "Goa",
      country: "India",
      zipCode: "403516",
      coordinates: [73.7554, 15.5444],
      neighborhood: "North Goa",
    },
    price: 12000,
    cleaningFee: 2000,
    images: [
      {
        url: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800",
        isPrimary: true,
      },
    ],
    amenities: [
      "wifi",
      "kitchen",
      "infinity_pool",
      "spa",
      "air_conditioning",
      "beachfront",
      "water_sports",
      "concierge",
    ],
    status: "active",
    featured: true,
    rating: {
      overall: 4.9,
      cleanliness: 4.9,
      accuracy: 4.8,
      communication: 4.9,
      location: 4.9,
      value: 4.7,
    },
    reviewCount: 63,
  },
  {
    title: "Colonial Bungalow in Hill Station",
    description:
      "Charming British-era bungalow with colonial architecture and modern comforts. Surrounded by tea gardens and misty hills, offering spectacular sunrise views. Perfect for peaceful retreats and family gatherings.",
    type: "bungalow",
    category: "entire_place",
    guests: 10,
    bedrooms: 5,
    beds: 5,
    bathrooms: 4,
    location: {
      address: "678 Tea Garden Estate",
      city: "Darjeeling",
      state: "West Bengal",
      country: "India",
      zipCode: "734101",
      coordinates: [88.2636, 27.041],
      neighborhood: "Happy Valley",
    },
    price: 7500,
    cleaningFee: 1200,
    weeklyDiscount: 18,
    monthlyDiscount: 25,
    images: [
      {
        url: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
        isPrimary: true,
      },
    ],
    amenities: [
      "wifi",
      "kitchen",
      "fireplace",
      "tea_garden_view",
      "parking",
      "heritage_furniture",
      "mountain_view",
      "library",
    ],
    status: "active",
    featured: true,
    rating: {
      overall: 4.8,
      cleanliness: 4.8,
      accuracy: 4.9,
      communication: 4.8,
      location: 4.7,
      value: 4.9,
    },
    reviewCount: 41,
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/stayfinder"
    );
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});
    console.log("Cleared existing data");

    const users = await User.create(sampleUsers);
    console.log(`Created ${users.length} users`);

    const hosts = users.filter((user) => user.role === "host");
    const listingsWithHosts = sampleListings.map((listing, index) => ({
      ...listing,
      host: hosts[index % hosts.length]._id,
    }));

    const listings = await Listing.create(listingsWithHosts);
    console.log(`Created ${listings.length} listings`);

    const guest = users.find((user) => user.role === "guest");

    console.log("Database seeded successfully!");
    console.log("\nSample login credentials:");
    console.log("Guest: rahul.sharma@example.com / delhi1234");
    console.log("Host:priya.patel@example.com / mumbai123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
