
export interface DashboardStats {
  totalListings: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
  responseRate: number;
  monthlyGrowth: {
    listings: number;
    bookings: number;
    revenue: number;
    rating: number;
  };
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: [number, number];
  };
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  status: "active" | "inactive" | "pending";
  bookings: number;
  revenue: number;
  availability: {
    startDate: string;
    endDate: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Guest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  verificationStatus: "pending" | "verified" | "rejected";
}

export interface Booking {
  _id: string;
  listing: {
    _id: string;
    title: string;
    images: string[];
    location: {
      city: string;
      country: string;
    };
  };
  guest: Guest;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "refunded";
  totalPrice: number;
  nights: number;
  serviceFee: number;
  taxes: number;
  specialRequests?: string;
  messages: BookingMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface BookingMessage {
  _id: string;
  sender: "host" | "guest";
  message: string;
  timestamp: string;
  read: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: "booking" | "blocked" | "available";
  booking?: Booking;
  color?: string;
}

export interface AnalyticsData {
  revenue: {
    monthly: Array<{
      month: string;
      revenue: number;
      bookings: number;
    }>;
    yearly: Array<{
      year: number;
      revenue: number;
      bookings: number;
    }>;
  };
  occupancy: {
    rate: number;
    trend: Array<{
      date: string;
      rate: number;
    }>;
  };
  topListings: Array<{
    listingId: string;
    title: string;
    revenue: number;
    bookings: number;
    rating: number;
  }>;
  guestInsights: {
    repeatGuests: number;
    averageStay: number;
    cancellationRate: number;
  };
  seasonalTrends: Array<{
    month: string;
    averagePrice: number;
    demandScore: number;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// API Error interface
export interface ApiError {
  message: string;
  status: number;
  data?: any;
}