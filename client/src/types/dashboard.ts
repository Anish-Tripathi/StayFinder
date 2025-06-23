export interface PropertyImage {
  url: string;
  isPrimary: boolean;
  _id: string;
}

export interface Guest {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email?: string;
  phone?: string;
}

export interface Host {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email?: string;
  phone?: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string; 
  neighborhood?: string;
}

export interface FilterOptions {
  status: string;
  search: string;
  dateRange: [Date | null, Date | null];
  priceRange: [number, number];
  propertyType: string[];
  amenities: string[];
}

export interface Listing {
  _id: string;
  title: string;
  images: PropertyImage[];
  location: Location;
  price?: number;
  host?: Host;
}

export interface AdditionalService {
  name: string;
  price: number;
  _id?: string;
}

export interface Pricing {
  basePrice?: number;
  nights?: number;
  subtotal?: number;
  cleaningFee?: number;
  serviceFee?: number;
  taxes?: number;
  discounts?: {
    weekly?: number;
    monthly?: number;
    coupon?: number;
  };
  totalPrice: number;
  currency: string;
}

export interface Cancellation {
  cancelledAt: string;
  cancelledBy: string;
  reason: string;
  customReason?: string;
  refundAmount?: number;
}

export interface Guests {
  adults: number;
  children?: number;
  infants?: number;
  pets?: number; 
}

export interface Payment {
  status: string;
  refundAmount?: number;
  method?: string; 
  transactionId?: string; 
  paidAt?: string; 
}

export interface Message {
  _id: string;
  content: string;
  sender: string;
  createdAt: string;
}

export interface Booking {
  _id: string;
  id: string;
  listing: Listing;
  guest: Guest;
  host: Host;
  checkIn: string;
  checkOut: string;
  status:
    | "pending"
    | "confirmed"
    | "cancelled_by_guest"
    | "cancelled_by_host"
    | "completed"
    | "no_show"
    | "in_progress"
    | "cancelled"; 
  pricing: Pricing;
  totalPrice: number;
  confirmationCode: string;
  guests?: Guests;
  specialRequests?: string;
  createdAt?: string;
  updatedAt?: string;
  cancellation?: Cancellation;
  payment: Payment;
  messages: Message[];
  additionalServices?: AdditionalService[]; 
  source?: string; 
  cancellationPolicy?: string; 
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}