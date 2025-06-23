export interface Location {
  city: string;
  country: string;
}

export interface PropertyHost {
  firstName: string;
  lastName: string;
  avatar: string;
  joinedDate: string;
  email: string;
  phone?: string; 
  _id: string;
  hostInfo: {
    isSuperhost: boolean;
    responseRate?: number; 
    responseTime?: string; 
    languages: string[];
    isIdentityVerified?: boolean; 
  };
  createdAt?: string; 
  verified?: boolean; 
}

export interface Guest {
  firstName: string;
  lastName: string;
  fullName: string;
  _id: string;
}

export interface Rating {
  overall?: number;
}

export interface Listing {
  _id: string;
  title: string;
  type:string;
  images: Array<{ url: string }>;
  location: Location;
  rating?: Rating;
  price?: number;
  amenities?: string[];
  guests?: {
    adults?: number;
    children?: number;
    infants?: number;
    pets?: number;
  };
}

export interface Pricing {
  totalPrice: number;
  basePrice?: number;
  cleaningFee?: number;
  serviceFee?: number;
  taxes?: number;
  nights?: number;
  subtotal?: number;
  discounts?: {
    amount?: number;
    type?: string;
  };
  currency?: string;
}

export interface Payment {
  method: string;
  status: string;
  refundAmount?: number;
}

export interface Insurance {
  coverage?: number;
  premium?: number;
}

export interface Booking {
  _id: string;
  status: string;
  listing: Listing;
  host: PropertyHost;
  guest?: Guest;
  checkIn: string | Date;
  checkOut: string | Date;
  pricing: Pricing;
  confirmationCode?: string;
  guests?: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };

  
  duration?: number;
  nightsCount?: number;
  payment?: Payment;
  insurance?: Insurance;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  source?: string;
  additionalServices?: any[];
  cancellation?: {
  refundAmount?: number;
  reason?: string;
  cancelledAt?: string;
  customReason?: string;
};
  specialRequests?:string;
}
