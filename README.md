# StayFinder - Full-Stack Property Rental Platform

<div align="center">
  <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/client/public/logo.png" alt="StayFinder Logo" width="200" height="200"/>
  <br />
  <p><em>Discover stays from studio apartments to high-end villas worldwide. Connect hosts and guests seamlessly with our comprehensive property rental platform.</em></p>
</div>

## Table of Contents

- [🚀 Overview](#overview)
- [✨ Features](#features)
  - [🔐 Authentication & Security](#authentication--security)
  - [🏠 Property Management](#property-management)
  - [📅 Booking System](#booking-system)
  - [💬 Real-Time Communication](#real-time-communication)
  - [👤 User Management](#user-management)
- [👥 Role-Based Features](#role-based-features)
  - [🎯 Guest Features](#guest-features)
  - [🏡 Host Features](#host-features)
  - [🤝 Common Features](#common-features)
- [🛠️ Tech Stack](#tech-stack)
- [📁 Project Structure](#project-structure)
- [⚡ Quick Start](#quick-start)
- [🎨 Preview Gallery](#preview-gallery)
- [🔧 Environment Variables](#environment-variables)
- [📝 API Documentation](#api-documentation)
- [🤝 Contributing](#contributing)

## 🚀 Overview

**StayFinder** is a comprehensive full-stack web application that revolutionizes property rental experiences. Built with modern technologies, it provides a seamless platform for property owners to list their spaces and travelers to discover perfect accommodations worldwide.

### Key Highlights
- 🌍 **Global Reach**: Browse properties from studio apartments to luxury villas
- 🔄 **Real-Time Features**: Live messaging, instant booking updates
- 💳 **Multiple Payment Options**: Stripe, UPI, and cash payments
- 🗺️ **Interactive Maps**: OpenStreetMap integration with clustering
- 📱 **Responsive Design**: Optimized for all devices
- 🎨 **Modern UI/UX**: Dark/light mode with intuitive navigation

## ✨ Features

### 🔐 Authentication & Security
- **Multi-Auth Support**: Email/password with verification + Google OAuth2
- **JWT Security**: Secure session management with refresh tokens
- **Role-Based Access**: Distinct Guest and Host permissions
- **Email Verification**: Account activation via Nodemailer

### 🏠 Property Management
- **Smart Search**: Location, dates, guests, and advanced filters
- **Category Browsing**: Beach, mountain, city, and more
- **Interactive Gallery**: High-resolution image carousels
- **Map Integration**: Leaflet with OpenStreetMap clustering
- **Detailed Listings**: Amenities, rules, host profiles, and reviews

### 📅 Booking System
- **Dynamic Pricing**: Real-time price calculations with breakdowns
- **Flexible Payments**: Stripe cards, UPI, and cash options
- **PDF Receipts**: Downloadable booking confirmations
- **Status Management**: Book, cancel, pay pending, and rate stays
- **History Tracking**: Complete booking timeline with filters

### 💬 Real-Time Communication
- **WhatsApp-Style Chat**: Emoji support and file sharing
- **Live Notifications**: Instant message alerts
- **Read Receipts**: Delivery and read status indicators
- **Persistent Sessions**: Messages saved across logins

### 👤 User Management
- **Profile Customization**: Personal details and preferences
- **Achievement System**: Host accomplishments and guest reviews
- **Theme Support**: Light and dark mode toggle
- **Notification Controls**: Customizable alert preferences

## 👥 Role-Based Features

### 🎯 Guest Features
| Feature | Description |
|---------|-------------|
| **Property Search** | Advanced filtering by location, price, amenities, ratings |
| **Booking Management** | View history, cancel bookings, pay dues, rate stays |
| **Favorites System** | Save properties with grid/list view options |
| **Review System** | Rate and review completed stays |
| **Real-Time Chat** | Message hosts for inquiries and coordination |

### 🏡 Host Features
| Feature | Description |
|---------|-------------|
| **Host Dashboard** | Analytics, revenue overview, recent bookings |
| **Property Listings** | Add, edit, delete properties with 10-step wizard |
| **Booking Management** | View, approve, cancel bookings with reasons |
| **Guest Communication** | Real-time messaging system |
| **Performance Metrics** | Occupancy rates, earnings, review scores |

### 🤝 Common Features
| Feature | Description |
|---------|-------------|
| **Responsive Design** | Mobile-first approach with cross-device compatibility |
| **Theme Switching** | Light/dark mode with user preference storage |
| **Multi-Language Ready** | Internationalization support structure |
| **Accessibility** | WCAG compliant with keyboard navigation |
| **Performance Optimized** | Lazy loading, image optimization, caching |

## 🛠️ Tech Stack

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

## 📁 Project Structure

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

## ⚡ Quick Start

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
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## 🎨 Preview Gallery

<details>
<summary><strong>🏠 Home & Landing Pages</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Hero Section with Search</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/home-hero.png" alt="Hero Section" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Property Categories</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/categories.png" alt="Categories" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

<details>
<summary><strong>🔍 Search & Discovery</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Advanced Search Filters</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/search-filters.png" alt="Search Filters" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Map View with Clustering</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/map-view.png" alt="Map View" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

<details>
<summary><strong>🏡 Property Details</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Property Gallery</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/property-gallery.png" alt="Property Gallery" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Booking Form</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/booking-form.png" alt="Booking Form" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

<details>
<summary><strong>📅 Booking Management</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Booking History</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/booking-history.png" alt="Booking History" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Payment Options</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/payment-options.png" alt="Payment Options" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

<details>
<summary><strong>🏠 Host Dashboard</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Host Analytics</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/host-dashboard.png" alt="Host Dashboard" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Property Listings Management</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/host-listings.png" alt="Host Listings" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

<details>
<summary><strong>➕ Add New Property</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Property Creation Wizard</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/add-property-wizard.png" alt="Add Property Wizard" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Image Upload Interface</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/image-upload.png" alt="Image Upload" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

<details>
<summary><strong>💬 Real-Time Messaging</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Chat Interface</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/chat-interface.png" alt="Chat Interface" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Message Notifications</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/notifications.png" alt="Notifications" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

<details>
<summary><strong>👤 User Profile & Settings</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>User Profile</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/user-profile.png" alt="User Profile" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Settings & Preferences</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/settings.png" alt="Settings" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

<details>
<summary><strong>🎨 Theme & Responsive Design</strong></summary>

<div align="center">
  <div style="display: flex; justify-content: space-between; margin: 20px 0;">
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Dark Mode Interface</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/dark-mode.png" alt="Dark Mode" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
    <div style="flex: 1; margin: 0 10px; text-align: center;">
      <h4>Mobile Responsive Design</h4>
      <img src="https://github.com/Anish-Tripathi/StayFinder/blob/main/preview/mobile-responsive.png" alt="Mobile Responsive" width="400" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"/>
    </div>
  </div>
</div>

</details>

## 🔧 Environment Variables

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

## 📝 API Documentation

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

## 🤝 Contributing

We welcome contributions to StayFinder! Here's how you can help:

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
- 🐛 Bug fixes and performance improvements
- 🎨 UI/UX enhancements
- 🔒 Security improvements
- 📱 Mobile app development
- 🌐 Internationalization
- 📊 Analytics and reporting features
- 🤖 AI-powered recommendations

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Anish-Tripathi">Anish Tripathi</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
