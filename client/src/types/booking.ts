

export interface FilterOptions {
  dateRange: [Date | null, Date | null];
  priceRange: [number, number];
  propertyType: string[];
  amenities: string[];
  status?: string;
  location?: string;
}

 interface Guest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  verificationStatus: "pending" | "verified" | "rejected";
  adults?: number;
    children?: number;
    infants?: number;
    pets?: number;
}

export interface Booking {
  _id: string;
  confirmationCode: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  checkIn: string | Date;
  checkOut: string | Date;
  totalPrice: number;
  guest:{
    avatar?:string
  }
  guests: Guest;
  listing: {
    _id: string;
    title: string;
    images: {
      url: string;
      isPrimary: boolean;
      _id: string;
      id: string;
    }[];
    primaryImage: string;
    location: {
      address: string;
      city: string;
      country: string;
    };
    price: number;
    id: string;
    host: {  
      _id: string;
      firstName: string;
      lastName: string;
      avatar: string;
      fullName: string;
      id: string;
      responseRate?:string
      bio?:string
    };
    amenities?: string[];
  };
  pricing: {
    basePrice: number;
    nights: number;
    subtotal: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    totalPrice: number;
    currency: string;
    discounts: {
      coupon: {
        amount: number;
      };
      weekly: number;
      monthly: number;
    };
  };
  payment: {
    method: string;
    status: string;
    refundAmount: number;
    paymentSchedule: any[];
  };
  specialRequests?: string;
  messages: {
    sender: string;
    content: string;
    timestamp: string;
    read: boolean;
    _id: string;
    id: string;
    fileUrl?: string;
    fileName?: string;
    fileType?: string;
  }[];
  id: string;
  rating?: number;
   
}

export interface Location {
  city: string;
  country: string;
}

export interface Host {
  firstName: string;
  lastName: string;
}

export interface Rating {
  overall?: number;
}

export interface PropertyImage {
  _id?: string;
  url: string;
  caption?: string;
  isPrimary: boolean;
}

export interface Listing {
  _id?: string;
  title: string;
  description: string;
  type: "villa" | "haveli" | "cottage" | "apartment" | "resort" | "bungalow";
  category: "entire_place" | "private_room" | "shared_room";
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    neighborhood: string;
    coordinates: [number, number];
  };
  price: number;
  currency: "USD" | "INR" | string;
  cleaningFee: number;
  securityDeposit: number;
  weeklyDiscount: number;
  monthlyDiscount: number;
  amenities: string[];
  images: PropertyImage[];
  houseRules: {
    checkIn: { from: string; to: string };
    checkOut: string;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    partiesAllowed: boolean;
    quietHours?: { from?: string; to?: string };
    additionalRules: string[];
  };
  availability: {
    minStay: number;
    maxStay: number;
    advanceNotice: number;
    preparationTime: number;
    calendar: {
      date: string;
      available: boolean;
      price?: number;
      minStay?: number;
    }[];
  };
  status: "active" | "inactive" | "draft";
  tags: string[];
  featured: boolean;
  instantBook: boolean;
  cancellationPolicy: "flexible" | "moderate" | "strict"|"super_strict_30"|"super_strict_60";
  additionalFees: {
    name: string;
    amount: number;
    type: "per_night" | "per_stay" | "per_person";
    optional: boolean;
  }[];
  license?: {
    number?: string;
    type?: string;
    expiryDate?: string;
  }; // Make optional
  host: string;
  views?: number;
  rating?: { overall: number };
  reviewCount?: number;
  reviews?: any[];
  revenue?:number;
}

export interface Pricing {
  totalPrice: number;
  basePrice?: number;
  cleaningFee?: number;
  serviceFee?: number;
  taxes?: number;
}

export interface DashboardStats {
  totalListings: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  occupancyRate: number;
  responseRate: number;
  monthlyRevenue: number;
}