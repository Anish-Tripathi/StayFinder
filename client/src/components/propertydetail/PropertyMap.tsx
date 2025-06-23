import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { Property } from "../../types/property";

interface PropertyMapProps {
  property: Property;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const coordinates: LatLngExpression = [
      property.location.coordinates[1], // latitude
      property.location.coordinates[0], // longitude
    ];

    mapRef.current = L.map(mapContainerRef.current, {
      center: coordinates,
      zoom: 15,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    // Custom marker icon
    const customIcon = L.divIcon({
      html: `
        <div class="relative">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EF4444"/>
          </svg>
        </div>
      `,
      className: "",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    // Add marker
    markerRef.current = L.marker(coordinates, { icon: customIcon }).addTo(
      mapRef.current
    );

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [property.location.coordinates]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="border-b border-gray-200 dark:border-gray-700 pb-8"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Where you'll be
      </h3>
      <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-4 p-6">
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
        <div ref={mapContainerRef} className="w-full h-[400px] relative" />
        <p className="text-gray-600 dark:text-gray-400 text-sm p-6">
          Exact location will be provided after booking confirmation.
        </p>
      </div>
    </motion.div>
  );
};

export default PropertyMap;
