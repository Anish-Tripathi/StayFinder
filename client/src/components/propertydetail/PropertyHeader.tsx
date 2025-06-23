import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, Share2, Award, Shield } from "lucide-react";
import { Property } from "../../types/property";
import { Button } from "../ui/PropertyButton";
import Badge from "../ui/Badge";
import toast from "react-hot-toast";

interface PropertyHeaderProps {
  property: Property;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Fetch initial favorite status
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const response = await fetch(`/api/favorites/check/${property._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setIsFavorite(data.isFavorite);
        } else {
          console.error("Failed to check favorite status:", data.message);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [property._id]);

  // Handle favorite toggle
  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
      alert("Please log in to add favorites");
      return;
    }

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(`/api/favorites/${property._id}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setIsFavorite(!isFavorite);

        toast.success(data.message);
      } else {
        console.error("Favorite action failed:", data.message);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {property.title}
            </h1>
            {property.host.verified && (
              <Badge variant="success" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {property.rating?.overall?.toFixed(1) ?? "0.0"}
              </span>
              <span>({property.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span className="hover:underline cursor-pointer">
                {property.location.city}, {property.location.state}
              </span>
            </div>

            {property.instantBook && (
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Instant Book
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 capitalize">
            <span>{property.type}</span>
            <span>•</span>
            <span>{property.guests} guests</span>
            <span>•</span>
            <span>{property.bedrooms} bedrooms</span>
            <span>•</span>
            <span>{property.bathrooms} bathrooms</span>
            {property.area && (
              <>
                <span>•</span>
                <span>{property.area} sq ft</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={handleFavoriteToggle}
            className="rounded-full"
          >
            <Heart
              className={`h-5 w-5 transition-colors duration-200 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </Button>

          <Button
            variant="outline"
            size="md"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyHeader;
