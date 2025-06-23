import { useState, useEffect } from "react";
import HeroCarousel from "../components/home/HeroCarousel";
import HeroContent from "../components/home/HeroContent";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProperties from "../components/home/FeaturedProperties";
import WhyChooseUs from "../components/home/WhyChooseUs";
import api from "../services/api";

interface Property {
  _id: string;
  title: string;
  location: {
    address: string;
    city: string;
    country: string;
    coordinates: [number, number];
  };
  price: number;
  rating: {
    overall: number;
    cleanliness: number;
    accuracy: number;
    communication: number;
    location: number;
    value: number;
  };
  reviewCount: number;
  images: Array<{
    url: string;
    isPrimary: boolean;
    _id: string;
  }>;
  type: string;
  amenities: string[];
  host: {
    name: string;
    avatar: string;
  };
  isFavorite?: boolean;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await api.get("/listings?featured=true&limit=8");
        setFeaturedProperties(response.data.listings || []);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel and Content Overlay */}
      <HeroCarousel>
        <HeroContent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </HeroCarousel>

      <div className="relative z-0">
        <CategoriesSection />
        <FeaturedProperties
          featuredProperties={featuredProperties}
          isLoading={isLoading}
        />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default Home;
