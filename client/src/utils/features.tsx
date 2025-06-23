import {
  MessageCircle,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Headset,
  Key,
} from "lucide-react";

export const features = [
  {
    icon: <MessageCircle className="w-10 h-10 text-primary-600" />,
    title: "Instant Messaging Support",
    description:
      "Communicate with hosts or our support team in real-time, ensuring faster resolutions and seamless coordination.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-primary-600" />,
    title: "Interactive Map Integration",
    description:
      "Explore properties using dynamic maps with filters, directions, and proximity details to nearby attractions.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-primary-600" />,
    title: "End-to-End Secure Transactions",
    description:
      "All payments are encrypted with industry-grade security protocols to safeguard your personal and financial data.",
  },
  {
    icon: <BadgeCheck className="w-10 h-10 text-primary-600" />,
    title: "Trusted & Verified Hosts",
    description:
      "Every host is verified through identity checks and quality screenings to ensure your stay is safe and reliable.",
  },
  {
    icon: <Headset className="w-10 h-10 text-primary-600" />,
    title: "Dedicated 24/7 Customer Service",
    description:
      "Reach out any time of day — our multilingual support team is always available to help with questions or issues.",
  },
  {
    icon: <Key className="w-10 h-10 text-primary-600" />,
    title: "Hassle-Free Self Check-in",
    description:
      "Most properties offer digital keys or smart locks, allowing you to check in on your schedule — no waiting required.",
  },
];
