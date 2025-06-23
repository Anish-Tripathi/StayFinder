import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  Clock,
  MessageCircle,
  Globe,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Lock,
  CheckCircle,
} from "lucide-react";
import { Property } from "../../types/property";
import { Card } from "../ui/Card";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  const getHostInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const hostFeatures = [
    {
      icon: Shield,
      title: "Identity verified",
      description: "Host identity has been verified",
      show: property.host.hostInfo?.isIdentityVerified || false,
    },
    {
      icon: Award,
      title: "Superhost",
      description: "Superhosts are experienced hosts with great reviews",
      show: property.host.hostInfo?.isSuperhost || false,
    },
    {
      icon: MessageCircle,
      title: `${property.host.hostInfo?.responseRate || 0}% response rate`,
      description: "Responds quickly to messages",
      show: true,
    },
    {
      icon: Clock,
      title: `Response time: ${
        property.host.hostInfo?.responseTime || "within an hour"
      }`,
      description: "Host responds quickly",
      show: (property.host.hostInfo?.responseRate || 0) >= 80,
    },
  ];

  const visibleFeatures = hostFeatures
    .filter((feature) => feature.show)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Property Type and Host Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 capitalize">
              {property.type} hosted by {property.host.firstName}{" "}
              {property.host.lastName}
            </h2>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <span>
                {property.guests} guest{property.guests !== 1 ? "s" : ""}
              </span>
              <span>•</span>
              <span>
                {property.bedrooms} bedroom{property.bedrooms !== 1 ? "s" : ""}
              </span>
              <span>•</span>
              <span>
                {property.beds} bed{property.beds !== 1 ? "s" : ""}
              </span>
              <span>•</span>
              <span>
                {property.bathrooms} bathroom
                {property.bathrooms !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Host Avatar */}
          <div className="ml-6">
            <div className="h-14 w-14 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              {property.host.avatar ? (
                <img
                  src={
                    property.host.avatar.startsWith("http")
                      ? property.host.avatar
                      : `http://localhost:5000/${property.host.avatar}`
                  }
                  alt={`${property.host.firstName} ${property.host.lastName}`}
                  className="h-14 w-14 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-lg">
                  {getHostInitials(
                    property.host.firstName,
                    property.host.lastName
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Property Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
          {property.description}
        </p>
      </motion.div>

      {/* Host Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {property.host.firstName} is a great host
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Host Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <Card className="p-6">
          <div className="flex items-start space-x-6">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              {property.host.avatar ? (
                <img
                  src={
                    property.host.avatar.startsWith("http")
                      ? property.host.avatar
                      : `http://localhost:5000/${property.host.avatar}`
                  }
                  alt={`${property.host.firstName} ${property.host.lastName}`}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <span className="text-white font-semibold text-xl">
                  {getHostInitials(
                    property.host.firstName,
                    property.host.lastName
                  )}
                </span>
              )}
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Hosted by {property.host.firstName} {property.host.lastName}
              </h3>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                {property.host.hostInfo?.languages &&
                  property.host.hostInfo.languages.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <span>
                        Speaks {property.host.hostInfo.languages.join(", ")}
                      </span>
                    </div>
                  )}
                {property.host.createdAt && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Joined {new Date(property.host.createdAt).getFullYear()}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {property.host.hostInfo?.isIdentityVerified && (
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Identity verified
                    </span>
                  </div>
                )}
                {property.host.hostInfo?.isSuperhost && (
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Superhost
                    </span>
                  </div>
                )}
                {property.host.hostInfo?.responseRate && (
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {property.host.hostInfo.responseRate}% response rate
                    </span>
                  </div>
                )}
                {property.host.hostInfo?.responseTime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Response time: {property.host.hostInfo.responseTime}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              To protect your payment, never transfer money or communicate
              outside of the platform.
            </p>
            {/* Contact Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {property.host.email}
                      </p>
                    </div>
                  </div>
                  {property.host.phone && (
                    <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Phone
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {property.host.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Location Info with Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Where you'll be
        </h3>
        <Card className="p-6 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-4 mb-4">
            <MapPin className="h-6 w-6 text-red-500" />
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {property.location.city}, {property.location.country}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {property.location.address}
              </p>
            </div>
          </div>
          <div
            id="map"
            className="w-full h-[400px] rounded-lg relative"
            ref={(el) => {
              if (
                el &&
                !el.hasChildNodes() &&
                property?.location?.coordinates?.length >= 2
              ) {
                const coordinates: LatLngExpression = [
                  property.location.coordinates[1], // latitude
                  property.location.coordinates[0], // longitude
                ];
                const map = L.map(el, {
                  center: coordinates,
                  zoom: 18,
                  scrollWheelZoom: true,
                });
                L.tileLayer(
                  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  {
                    attribution:
                      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                  }
                ).addTo(map);
                const customIcon = L.divIcon({
                  html: `
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EF4444"/>
                    </svg>
                  `,
                  className: "",
                  iconSize: [40, 40],
                  iconAnchor: [20, 40],
                });
                L.marker(coordinates, { icon: customIcon }).addTo(map);
              }
            }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
            Exact location will be provided after booking confirmation.
          </p>
        </Card>
      </motion.div>

      {/* House Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          House Rules
        </h3>
        <Card className="p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-600 dark:text-gray-400">
            {property.houseRules?.checkIn && (
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>
                  Check-in: {property.houseRules.checkIn.from} -{" "}
                  {property.houseRules.checkIn.to}
                </span>
              </li>
            )}
            {property.houseRules?.checkOut && (
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Check-out: {property.houseRules.checkOut}</span>
              </li>
            )}
            <li className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-red-500" />
              <span>
                {property.houseRules?.partiesAllowed
                  ? "Parties allowed"
                  : "No parties"}
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-red-500" />
              <span>
                {property.houseRules?.petsAllowed ? "Pets allowed" : "No pets"}
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-red-500" />
              <span>
                {property.houseRules?.smokingAllowed
                  ? "Smoking allowed"
                  : "No smoking"}
              </span>
            </li>
          </ul>
        </Card>
      </motion.div>

      {/* Cancellation Policy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Cancellation Policy
        </h3>
        <Card className="p-6">
          <p className="text-gray-600 dark:text-gray-400">
            {property.cancellationPolicy
              ? property.cancellationPolicy === "moderate"
                ? "Moderate: Free cancellation within 5 days of booking, or 48 hours before check-in."
                : property.cancellationPolicy === "strict"
                ? "Strict: 50% refund up to 7 days before check-in."
                : "Flexible: Full refund up to 24 hours before check-in."
              : "No specific cancellation policy provided."}
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default PropertyInfo;
