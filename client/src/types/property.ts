export interface PropertyImage {
  url: string;
  isPrimary: boolean;
  _id: string;
}

export interface PropertyLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  coordinates: [number, number];
  neighborhood?: string;
}

export interface PropertyRating {
  overall: number;
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  value: number;
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
    isSuperhost?: boolean;
    responseRate?: number; 
    responseTime?: string; 
    languages: string[];
    isIdentityVerified?: boolean; 
  };
  createdAt?: string; 
  verified?: boolean; 
}

export interface PropertyReview {
  _id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface HouseRules {
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: string;
  partiesAllowed: boolean;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  additionalRules?: string[]; 
}

export interface Availability {
  minStay: number;
  maxStay: number;
  advanceNotice?: number;
  preparationTime?: number; 
  calendar: Date[];
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  location: PropertyLocation;
  price: number;
  rating: PropertyRating;
  reviewCount: number;
  images: PropertyImage[];
  type: string;
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  beds: number; 
  instantBook: boolean;
  area: number;
  guests: number;
  host: PropertyHost;
  reviews: PropertyReview[];
  availability: Availability;
  createdAt?: string | Date; 
  isBooked?: boolean; 
  cleaningFee?: number; 
  category?:string;
  isFavorite?:boolean;
  weeklyDiscount?: number; 
  monthlyDiscount?: number; 
  currency?: string; 
  cancellationPolicy?: string; 
  securityDeposit?: number; 
  additionalFees?: string[]; 
  houseRules?: HouseRules; 
}

export interface SearchFilters {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  propertyTypes: string[];
  amenities: string[];
  rating: number;
}

export interface PropertyType {
  id: string;
  name: string;
  count: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface MapProperty {
   _id: string;
  title: string;
  images: PropertyImage[];
  location: {
    coordinates?: [number, number];
    address: string;
    city: string;
    state?: string;
    country: string;
    neighborhood?: string;
  };
  price: number;
  currency: string;

}

export interface Rating {
  overall: number;
  cleanliness: number;
  accuracy: number;
  communication: number;
  location: number;
  value: number;
}

export interface Host {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  joinedDate: string;
  verified: boolean;
  responseRate: number;
  responseTime: string;
  languages: string[];
  about: string;
}

export interface Review {
  _id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Guests {
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

interface Pricing {
  nights: number;
  basePrice: number;
  subtotal: number;
  serviceFee: number;
  taxes: number;
  totalPrice: number;
  currency: string;
}

export interface BookingDetails {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guests: Guests;
  property: Property;
  total?: number;
  nights?: number;
  pricing?: Pricing;
  specialRequests?: string;
}


