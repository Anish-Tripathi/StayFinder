import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  guest: { name: string; avatar: string; location: string };
  listing: string;
  rating: number;
  date: string;
  comment: string;
  response?: string | null;
}

const RecentReviews = () => {
  const reviews: Review[] = [
    {
      id: 1,
      guest: {
        name: "Priya Sharma",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        location: "Mumbai, India",
      },
      listing: "Cozy Himalayan Retreat",
      rating: 5,
      date: "2025-05-15",
      comment:
        "Absolutely loved our stay! The retreat was serene, and the host was very responsive. Highly recommend!",
      response: "Thank you, Priya! We’d love to host you again.",
    },
    {
      id: 2,
      guest: {
        name: "Rahul Gupta",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        location: "Delhi, India",
      },
      listing: "Downtown Bangalore Loft",
      rating: 4,
      date: "2025-05-10",
      comment:
        "Great location and modern space. Minor issue with Wi-Fi, but the host fixed it quickly.",
      response:
        "Thanks, Rahul! We’ve upgraded the Wi-Fi for better connectivity.",
    },
    {
      id: 3,
      guest: {
        name: "Anjali Patel",
        avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        location: "Goa, India",
      },
      listing: "Beachfront Villa",
      rating: 5,
      date: "2025-04-28",
      comment:
        "Perfect beach getaway! Stunning views and all amenities provided. The host shared great local tips.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
    >
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
          >
            <div className="flex items-start space-x-4">
              <img
                src={review.guest.avatar}
                alt={review.guest.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {review.guest.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {review.guest.location}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {review.listing} •{" "}
                  {new Date(review.date).toLocaleDateString("en-IN")}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {review.comment}
                </p>
                {review.response && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-3">
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Your response:
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      {review.response}
                    </p>
                  </div>
                )}
                {!review.response && (
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2">
                    Respond to this review
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentReviews;
