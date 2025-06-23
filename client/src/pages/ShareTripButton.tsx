import { Share } from "lucide-react";
import toast from "react-hot-toast";

const ShareTripButton = ({ bookingId }: { bookingId: string }) => {
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/booking-confirmation/${bookingId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "StayFinder Booking",
          text: "Check out my trip details!",
          url: shareUrl,
        });
      } catch (err: any) {
        if (err.name !== "AbortError") {
          toast.error("Failed to share");
        }
      }
    } else {
      // Fallback for unsupported browsers
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <button
      className="w-full btn-secondary flex items-center justify-center space-x-2"
      onClick={handleShare}
    >
      <Share className="h-4 w-4" />
      <span>Share Trip</span>
    </button>
  );
};

export default ShareTripButton;
