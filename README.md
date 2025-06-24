# StayFinder - Unified Property Hosting & Booking Platform

<div align="center">
  <img src="./client/public/logo.png" alt="StayFinder Logo" width="150" height="150"/>
  <br />
  <p><em>Discover stays from studio apartments to high-end villas worldwide. Connect hosts and guests seamlessly with our comprehensive property rental platform.</em></p>
</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Role-Based Features](#role-based-features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Preview Gallery](#preview-gallery)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

  ***

## Overview

**StayFinder** is a comprehensive full-stack web application that revolutionizes property rental experiences. Built with modern technologies, it provides a seamless platform for property owners to list their spaces and travelers to discover perfect accommodations worldwide.

### Key Highlights

- Global Reach: Browse properties from studio apartments to luxury villas
- Real-Time Features: Live messaging, instant booking updates
- Multiple Payment Options: Stripe, UPI, and cash payments
- Interactive Maps: OpenStreetMap integration with clustering
- Responsive Design: Optimized for all devices
- Modern UI/UX: Dark/light mode with intuitive navigation

---

## Features

### Authentication & Security

- **Multi-Auth Support**: Email/password with verification + Google OAuth2
- **JWT Security**: Secure session management with refresh tokens
- **Role-Based Access**: Distinct Guest and Host permissions
- **Email Verification**: Account activation via Nodemailer

### Property Management

- **Smart Search**: Location, dates, guests, and advanced filters
- **Category Browsing**: Beach, mountain, city, and more
- **Interactive Gallery**: High-resolution image carousels
- **Map Integration**: Leaflet with OpenStreetMap clustering
- **Detailed Listings**: Amenities, rules, host profiles, and reviews

### Booking System

- **Dynamic Pricing**: Real-time price calculations with breakdowns
- **Flexible Payments**: Stripe cards, UPI, and cash options
- **PDF Receipts**: Downloadable booking confirmations
- **Status Management**: Book, cancel, pay pending, and rate stays
- **History Tracking**: Complete booking timeline with filters

### Real-Time Communication

- **WhatsApp-Style Chat**: Emoji support and file sharing
- **Live Notifications**: Instant message alerts
- **Read Receipts**: Delivery and read status indicators
- **Persistent Sessions**: Messages saved across logins

### User Management

- **Profile Customization**: Personal details and preferences
- **Achievement System**: Host accomplishments and guest reviews
- **Theme Support**: Light and dark mode toggle
- **Notification Controls**: Customizable alert preferences

---

## Role-Based Features

### Guest Features

| Feature                | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| **Property Search**    | Advanced filtering by location, price, amenities, ratings |
| **Booking Management** | View history, cancel bookings, pay dues, rate stays       |
| **Favorites System**   | Save properties with grid/list view options               |
| **Review System**      | Rate and review completed stays                           |
| **Real-Time Chat**     | Message hosts for inquiries and coordination              |

### Host Features

| Feature                 | Description                                      |
| ----------------------- | ------------------------------------------------ |
| **Host Dashboard**      | Analytics, revenue overview, recent bookings     |
| **Property Listings**   | Add, edit, delete properties with 10-step wizard |
| **Booking Management**  | View, approve, cancel bookings with reasons      |
| **Guest Communication** | Real-time messaging system                       |
| **Performance Metrics** | Occupancy rates, earnings, review scores         |

### Common Features

| Feature                   | Description                                           |
| ------------------------- | ----------------------------------------------------- |
| **Responsive Design**     | Mobile-first approach with cross-device compatibility |
| **Theme Switching**       | Light/dark mode with user preference storage          |
| **Multi-Language Ready**  | Internationalization support structure                |
| **Accessibility**         | WCAG compliant with keyboard navigation               |
| **Performance Optimized** | Lazy loading, image optimization, caching             |

---

## Tech Stack

### Frontend

- **React.js** - Component-based UI framework
- **TailwindCSS** - Utility-first CSS framework
- **Module CSS** - Scoped styling for components
- **Socket.IO Client** - Real-time communication
- **Leaflet** - Interactive map library

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Socket.IO** - WebSocket implementation
- **JWT** - JSON Web Token authentication

### Services & APIs

- **Stripe** - Payment processing
- **Google OAuth** - Social authentication
- **Nodemailer** - Email service
- **OpenStreetMap** - Mapping service
- **Cloudinary** - Image hosting and optimization

---

## Live Demo

- **Deployed URL:** _Working on it..._
- **Demo Video:** [Watch on YouTube](https://www.youtube.com/watch?v=your-demo-video-id)

---

## Preview Gallery

> If any uploaded image appears scaled or unclear, please click on the image to view it in full resolution for better clarity.

---

<details>
<summary><strong>Authentication & Authorization</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Register Page</h4>
      <img src="./client/public/register.png" alt="Register Page" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
     <td align="center" style="padding: 20px;">
      <h4>Login Page</h4>
      <img src="./client/public/login.png" alt="Login Page" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Forgot Password with email verification</h4>
      <img src="./client/public/forgot-password.png" alt="Forgot Password Page" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Reset Password after  successful code verification</h4>
      <img src="./client/public/reset-password.png" alt="Reset Password Page" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Home & Landing Pages</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Hero Carousel with Search bar</h4>
      <img src="./client/public/hero-carousel.png" alt="Hero Section" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Platform Features</h4>
      <img src="./client/public/features.png" alt="Homepage Statistics" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
     <td align="center" style="padding: 20px;">
      <h4>Property Categories</h4>
      <img src="./client/public/categories.png" alt="Categories" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
     </td>
       <td align="center" style="padding: 20px;">
      <h4>Featured Properties</h4>
      <img src="./client/public/featured-properties.png" alt="Featured Properties" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Search & Discovery</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Advanced Search Filters</h4>
      <img src="./client/public/search-filters.png" alt="Search Filters" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Map View with Clustering</h4>
      <img src="./client/public/map-view.png" alt="Map View" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Inidvidual Propery Map View</h4>
      <img src="./client/public/property-map.png" alt="Search Results" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Filter Property Results</h4>
      <img src="./client/public/search-results.png" alt="Filter Panel" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Property Details</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Property Gallery</h4>
      <img src="./client/public/property-gallery.png" alt="Property Gallery" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Host Details & Booking Form </h4>
      <img src="./client/public/booking-form.png" alt="Booking Form" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Property Map and Details</h4>
      <img src="./client/public/property-details.png" alt="Property Amenities" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Property Amenities & Reviews</h4>
      <img src="./client/public/property-amenities.png" alt="Reviews & Ratings" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Booking & Payment </strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Booking Details</h4>
      <img src="./client/public/payment-property-details.png" alt="Booking History" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Payment Options- Stripe, UPI, Cash</h4>
      <img src="./client/public/payment-methods.png" alt="Payment Options" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Booking Confirmation</h4>
      <img src="./client/public/booking-confirmation.png" alt="Booking Confirmation" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Payment Receipt</h4>
      <img src="./client/public/booking-reciept.png" alt="Payment Receipt" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Booking History</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>All Booking Records</h4>
      <img src="./client/public/booking-history.png" alt="All Booking Records" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Bookings Filter</h4>
      <img src="./client/public/booking-history-filter.png" alt="Filter by Payment Mode" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
    <tr>
   <td align="center" style="padding: 20px;">
      <h4>Filtered Booking Results</h4>
      <img src="./client/public/booking-history-filter-results.png" alt="Filtered Booking Results" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Rate Your Stay</h4>
      <img src="./client/public/rate-booking.png" alt="Detailed Booking View" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Detailed Booking View</h4>
      <img src="./client/public/booking-history-details.png" alt="Detailed Booking View" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Cancelled Booking Details</h4>
      <img src="./client/public/cancelled-details.png" alt="Filtered Booking Results" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong> Property Favorites & Profile Settings</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Favorites Grid View</h4>
      <img src="./client/public/property-favorites-grid.png" alt="Favorites Grid View" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Favorites Vertical View</h4>
      <img src="./client/public/property-favorites-vertical.png" alt="Favorites Vertical View" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>User Profile Overview</h4>
      <img src="./client/public/profile.png" alt="User Profile Overview" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Profile Settings</h4>
      <img src="./client/public/profile-settings.png" alt="Profile Settings" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Host Dashboard</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Host Analytics</h4>
      <img src="./client/public/host-dashboard.png" alt="Host Dashboard" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Property Listings Management</h4>
      <img src="./client/public/host-listings.png" alt="Host Listings" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
   <td align="center" style="padding: 20px;">
      <h4>Booking Requests</h4>
      <img src="./client/public/booking-requests.png" alt="Booking Requests" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Guest Reviews</h4>
      <img src="./client/public/host-reviews.png" alt="Revenue Overview" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
   
  </tr>
</table>

</details>

<details>
<summary><strong>Property Management</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>List New Property</h4>
      <img src="./client/public/create-listings.png" alt="Add Property Wizard" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>All Listings</h4>
      <img src="./client/public/host-listings.png" alt="Image Upload" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Listings Details</h4>
      <img src="./client/public/listings-details.png" alt="Property Details Form" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Edit Listings Details</h4>
      <img src="./client/public/edit-listings.png" alt="Property Details Form" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Property Booking Management</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>All Property Bookings</h4>
      <img src="./client/public/host-bookings.png" alt="Add Property Wizard" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Bookings Details</h4>
      <img src="./client/public/host-booking-details.png" alt="Image Upload" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Update Bookings Status</h4>
      <img src="./client/public/host-bookings-status-update.png" alt="Property Details Form" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Cancel Property Bookings With Reason</h4>
      <img src="./client/public/host-bookings-cancel.png" alt="Property Details Form" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Real-Time Messaging Support</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Chat Interface with Emoji Support</h4>
      <img src="./client/public/chat-interface.png" alt="Chat Interface" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>File Sharing</h4>
      <img src="./client/public/file-sharing.png" alt="Notifications" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Demo Voice Call</h4>
      <img src="./client/public/voice-call.png" alt="Conversation List" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Demo Video Call</h4>
      <img src="./client/public/video-call.png" alt="File Sharing" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Become a Host</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Host Onboarding Hero Section</h4>
      <img src="./client/public/become-host-hero.png" alt="Host Onboarding Hero Section" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>About Hosting Overview</h4>
      <img src="./client/public/become-host-about.png" alt="About Hosting Overview" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Host Features & Benefits</h4>
      <img src="./client/public/become-host-features.png" alt="Host Features & Benefits" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Hosting FAQ & Support</h4>
      <img src="./client/public/become-host-qna.png" alt="Hosting FAQ & Support" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

<details>
<summary><strong>Terms, Privacy & Feedback</strong></summary>

<table>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Terms & Conditions</h4>
      <img src="./client/public/terms.png" alt="Dark Mode" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
    <td align="center" style="padding: 20px;">
      <h4>Safety & Privacy Tips</h4>
      <img src="./client/public/privacy.png" alt="Mobile Responsive" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>General Feedback</h4>
      <img src="./client/public/feedback-1.png" alt="Notifications" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
     <td align="center" style="padding: 20px;">
      <h4>Rate Experience</h4>
      <img src="./client/public/feedback-2.png" alt="Conversation List" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
  <tr>
    <td align="center" style="padding: 20px;">
      <h4>Quick Feedback</h4>
      <img src="./client/public/feedback-3.png" alt="File Sharing" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
     <td align="center" style="padding: 20px;">
      <h4>Role Based Footer</h4>
      <img src="./client/public/footer.png" alt="Tablet Layout" width="500" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </td>
  </tr>
</table>

</details>

---

## Project Structure

```
StayFinder/
├── 📁 client/                    # React frontend
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI components
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 lib/             # Utility functions
│   │   ├── 📁 pages/           # Route components
│   │   ├── 📁 services/        # API service layer
│   │   ├── 📁 store/           # State management
│   │   ├── 📁 types/           # TypeScript definitions
│   │   └── 📁 utils/           # Helper functions
│   ├── 📄 App.tsx              # Main app component
│   ├── 📄 main.tsx             # Entry point
│   └── 📄 index.css            # Global styles
├── 📁 server/                   # Node.js backend
│   ├── 📁 src/
│   │   ├── 📁 config/          # Database and app configuration
│   │   ├── 📁 controllers/     # Route handlers
│   │   ├── 📁 db/              # Database connection
│   │   ├── 📁 middleware/      # Express middleware
│   │   ├── 📁 models/          # Mongoose schemas
│   │   ├── 📁 routes/          # API route definitions
│   │   └── 📁 uploads/         # File upload directory
│   ├── 📄 seed.js              # Database seeding script
│   └── 📄 server.js            # Main server file
├── 📄 .env                     # Environment variables
├── 📄 .gitignore              # Git ignore rules
├── 📄 package.json            # Project dependencies
└── 📄 README.md               # Project documentation
```

---

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Anish-Tripathi/StayFinder.git
   cd StayFinder
   ```

2. **Install dependencies**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy example env file in server directory
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Seed the database** (optional)

   ```bash
   cd server
   npm run seed
   ```

5. **Start the development servers**

   ```bash
   # Terminal 1 - Start backend server
   cd server
   npm run dev

   # Terminal 2 - Start frontend server
   cd client
   npm start
   ```

6. **Access the application**

   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

   ***

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/stayfinder
# or MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/stayfinder

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL
CLIENT_URL=http://localhost:3000
```

---

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify/:token` - Email verification

### Property Endpoints

- `GET /api/properties` - Get all properties with filters
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create new property (Host only)
- `PUT /api/properties/:id` - Update property (Host only)
- `DELETE /api/properties/:id` - Delete property (Host only)

### Booking Endpoints

- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user bookings
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel booking

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/favorites` - Get user favorites
- `POST /api/users/favorites/:propertyId` - Add to favorites

### Messaging Endpoints

- `GET /api/messages/:conversationId` - Get conversation messages
- `POST /api/messages` - Send new message
- `GET /api/conversations` - Get user conversations

---

## Contributing

I welcome contributions to StayFinder! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style Guidelines

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

### Areas for Contribution

- Bug fixes and performance improvements
- UI/UX enhancements
- Security improvements
- Mobile app development
- Internationalization
- Analytics and reporting features
- AI-powered recommendations

---

## Acknowledgements

- [Stripe](https://stripe.com) – for seamless payment integration
- [Leaflet](https://leafletjs.com) and [OpenStreetMap](https://www.openstreetmap.org) – for interactive maps
- [Google OAuth 2.0](https://clerk.dev) – for authentication services
- [Socket.IO](https://socket.io) – for real-time messaging
- [MERN Stack Community](https://github.com/MERN) – for resources and open-source inspiration

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Anish-Tripathi">Anish Tripathi</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
