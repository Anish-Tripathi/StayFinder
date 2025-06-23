import { IndianRupee } from "lucide-react";

interface PriceDisplayProps {
  price: number;
  period?: "night" | "week" | "month";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const PriceDisplay = ({
  price,
  period = "night",
  size = "md",
  className = "",
}: PriceDisplayProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const periodClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
    currencyDisplay: "symbol",
  })
    .format(price)
    .replace("₹", "")
    .trim();

  const periodText =
    period === "night" ? "night" : period === "week" ? "week" : "month";

  return (
    <div className={`flex items-end ${className}`}>
      <IndianRupee
        className={`h-4 w-4 text-gray-900 dark:text-white mb-0.5 mr-0.5`}
      />
      <span
        className={`${sizeClasses[size]} font-bold text-gray-900 dark:text-white mr-1`}
      >
        {formattedPrice}
      </span>
      <span
        className={`${periodClasses[size]} text-gray-500 dark:text-gray-400 mb-0.5`}
      >
        /{periodText}
      </span>
    </div>
  );
};

export default PriceDisplay;
