import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  reviewCount?: number;
  className?: string;
}

const Rating = ({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = true,
  reviewCount,
  className = "",
}: RatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      if (i <= Math.floor(rating)) {
        // Full star
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
          />
        );
      } else if (i - 0.5 <= rating) {
        // Half star
        stars.push(
          <div key={i} className="relative">
            <Star
              className={`${sizeClasses[size]} text-gray-300 dark:text-gray-600`}
            />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star
                className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`}
              />
            </div>
          </div>
        );
      } else {
        // Empty star
        stars.push(
          <Star
            key={i}
            className={`${sizeClasses[size]} text-gray-300 dark:text-gray-600`}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <div className="flex items-center">{renderStars()}</div>

      {showNumber && (
        <span
          className={`font-medium text-gray-700 dark:text-gray-300 ${textSizeClasses[size]}`}
        >
          {rating.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span
          className={`text-gray-500 dark:text-gray-400 ${textSizeClasses[size]}`}
        >
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </span>
      )}
    </div>
  );
};

export default Rating;
