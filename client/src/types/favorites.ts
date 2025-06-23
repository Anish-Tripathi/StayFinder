interface Location {
  address: string;
  city: string;
  country: string;
  neighborhood?: string;
}

interface Host {
  firstName: string;
  lastName: string;
  avatar?: string;
  hostInfo?: {
    isSuperhost: boolean;
  };
}

interface Rating {
  overall: number;
}

export interface Listing {
  _id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  location: Location;
  images: { url: string; isPrimary: boolean }[];
  host: Host;
  rating: Rating;
  reviewCount: number;
  currency: string;
  createdAt: string
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}