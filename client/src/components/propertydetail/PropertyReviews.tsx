import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Filter,
  ChevronDown,
} from "lucide-react";
import { Property, Review } from "../../types/property";
import { formatDate } from "../../utils/dateHelpers";

interface PropertyReviewsProps {
  property: Property;
  delay?: number;
}

interface ReviewFilters {
  rating: number | null;
  sortBy: "newest" | "oldest" | "highest" | "lowest";
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({
  property,
  delay = 0.4,
}) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [filters, setFilters] = useState<ReviewFilters>({
    rating: null,
    sortBy: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);

  const { rating, reviewCount, reviews } = property;

  // Rating breakdown calculation
  const getRatingBreakdown = () => {
    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      breakdown[review.rating]++;
    });
    return breakdown;
  };

  // Filter and sort reviews
  const getFilteredAndSortedReviews = () => {
    let filteredReviews = [...reviews];

    // Apply rating filter
    if (filters.rating) {
      filteredReviews = filteredReviews.filter(
        (review) => review.rating === filters.rating
      );
    }

    // Apply sorting
    filteredReviews.sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return filteredReviews;
  };

  const ratingBreakdown = getRatingBreakdown();
  const filteredReviews = getFilteredAndSortedReviews();
  const displayedReviews = showAllReviews
    ? filteredReviews
    : filteredReviews.slice(0, 6);

  // Star rating component
  const StarRating: React.FC<{ rating: number; size?: "sm" | "md" | "lg" }> = ({
    rating,
    size = "sm",
  }) => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  // Rating breakdown bars
  const RatingBreakdown = () => (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = ratingBreakdown[stars] || 0;
        const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0;

        return (
          <div key={stars} className="flex items-center space-x-3 text-sm">
            <div className="flex items-center space-x-1 w-12">
              <span className="text-gray-700 dark:text-gray-300">{stars}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-gray-500 dark:text-gray-400 w-8 text-right">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );

  // Individual review component
  const ReviewCard: React.FC<{ review: Review; index: number }> = ({
    review,
    index,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {review.user.avatar ? (
            <img
              src={review.user.avatar}
              alt={review.user.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">
                {review.user.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {review.user.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(review.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {review.comment}
          </p>

          {/* Review actions */}
          <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
            <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful</span>
            </button>
            <button className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (!reviews || reviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="text-center py-12"
      >
        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No reviews yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Be the first to share your experience at this property!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="space-y-8"
    >
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {rating?.overall?.toFixed(1) || "0.0"}
          </h3>
          <div className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">{reviewCount}</span>
            <span className="ml-1">review{reviewCount !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
            Rating breakdown
          </h4>
          <RatingBreakdown />
        </div>

        {/* Category Ratings */}
        {rating && (
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Category ratings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(rating).map(([category, score]) => {
                if (category === "overall") return null;
                return (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                      {category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                        {score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Rating:
            </label>
            <select
              value={filters.rating || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  rating: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
            >
              <option value="">All ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  sortBy: e.target.value as ReviewFilters["sortBy"],
                })
              }
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>
        </motion.div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedReviews.map((review, index) => (
          <ReviewCard key={review._id} review={review} index={index} />
        ))}
      </div>

      {/* Show More Button */}
      {filteredReviews.length > 6 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="btn-secondary"
          >
            {showAllReviews
              ? "Show less"
              : `Show all ${filteredReviews.length} reviews`}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyReviews;
