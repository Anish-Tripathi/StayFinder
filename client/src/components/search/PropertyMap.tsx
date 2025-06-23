import { useEffect, useRef, useState } from "react";
import { MapProperty } from "../../types/property";
import * as L from "leaflet";

interface PropertyMapProps {
  properties: MapProperty[];
  center: [number, number] | null | undefined;
  zoom?: number;
  height?: string;
  onMarkerClick?: (propertyId: string) => void;
  showPriceMarkers?: boolean;
  className?: string;
}

const PropertyMap = ({
  properties,
  center,
  zoom = 12,
  height = "100%",
  onMarkerClick,
  showPriceMarkers = true,
  className = "",
}: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  // Default center
  const defaultCenter: [number, number] = [20.5937, 78.9629];

  // Validate center coordinates
  const isValidCenter = (
    center: [number, number] | null | undefined
  ): center is [number, number] => {
    return (
      Array.isArray(center) &&
      center.length === 2 &&
      typeof center[0] === "number" &&
      typeof center[1] === "number" &&
      !isNaN(center[0]) &&
      !isNaN(center[1])
    );
  };

  // Load Leaflet CSS and JS
  useEffect(() => {
    if (window.L) {
      setIsLoaded(true);
      return;
    }

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (css.parentNode) css.parentNode.removeChild(css);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || !window.L) return;

    // Calculate center from properties
    let mapCenter = defaultCenter;

    if (isValidCenter(center)) {
      mapCenter = center;
    } else if (properties.length > 0) {
      const validProperties = properties.filter(
        (p) =>
          p.location.coordinates &&
          Array.isArray(p.location.coordinates) &&
          p.location.coordinates.length === 2 &&
          !isNaN(p.location.coordinates[0]) &&
          !isNaN(p.location.coordinates[1])
      );

      if (validProperties.length > 0) {
        const avgLat =
          validProperties.reduce(
            (sum, p) => sum + p.location.coordinates![1],
            0
          ) / validProperties.length;
        const avgLng =
          validProperties.reduce(
            (sum, p) => sum + p.location.coordinates![0],
            0
          ) / validProperties.length;
        mapCenter = [avgLat, avgLng];
      }
    }

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    mapInstanceRef.current = L.map(mapRef.current).setView(mapCenter, zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstanceRef.current);

    // Set map as ready after a small delay to ensure tiles are loaded
    setTimeout(() => {
      setIsMapReady(true);
    }, 500);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      setIsMapReady(false);
    };
  }, [isLoaded, center, zoom]);

  // Update markers - Wait for map to be ready
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L || !isMapReady) {
      return;
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    if (properties.length === 0) {
      return;
    }

    let markersAdded = 0;

    // Add new markers
    properties.forEach((property, index) => {
      // Check if coordinates exist
      if (!property.location?.coordinates) {
        console.warn(` No coordinates found for property: ${property.title}`);
      }

      if (
        !Array.isArray(property.location.coordinates) ||
        property.location.coordinates.length !== 2
      ) {
        console.warn(
          `Invalid coordinates format for property: ${property.title}`,
          "Expected array of 2 numbers, got:",
          property.location.coordinates
        );
        return;
      }

      const [lng, lat] = property.location.coordinates;

      // Additional validation for coordinates
      if (isNaN(lat) || isNaN(lng) || (lat === 0 && lng === 0)) {
        console.warn(
          ` Invalid lat/lng values for property: ${property.title} - lat: ${lat}, lng: ${lng}`
        );
        return;
      }

      try {
        if (showPriceMarkers) {
          const customIcon = L.divIcon({
            html: `
              <div class="price-marker">
                <div class="price-marker-content">
                  <div class="price">₹${
                    property.price?.toLocaleString() || "N/A"
                  }</div>
                  <div class="property-name">${property.title}</div>
                  ${
                    property.images && property.images.length > 0
                      ? `<img src="${property.images[0].url}" alt="${property.title}" style="width: 100px; height: 60px; object-fit: cover; border-radius: 4px; margin-top: 4px;" />`
                      : ""
                  }
                </div>
              </div>
            `,
            className: "custom-div-icon",
            iconSize: [140, 80],
            iconAnchor: [70, 80],
          });

          const marker = L.marker([lat, lng], { icon: customIcon })
            .addTo(mapInstanceRef.current!)
            .on("click", () => {
              onMarkerClick?.(property._id);
            });

          markersRef.current.push(marker);
          markersAdded++;
        } else {
          const marker = L.marker([lat, lng])
            .addTo(mapInstanceRef.current!)
            .bindPopup(
              `
              <div style="min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${
                  property.title
                }</h3>
                <p style="margin: 0 0 5px 0; color: #666; font-size: 12px;">
                  <strong>₹${
                    property.price?.toLocaleString() || "N/A"
                  }</strong> per night
                </p>
                <p style="margin: 0 0 5px 0; font-size: 11px; color: #888;">
                  ${property.location?.address || ""}
                </p>
                <p style="margin: 0; font-size: 11px; color: #666;">
                  ${property.location?.city}${
                property.location?.state ? ", " + property.location.state : ""
              }, ${property.location?.country}
                </p>
              </div>
            `
            )
            .on("click", () => {
              onMarkerClick?.(property._id);
            });

          markersRef.current.push(marker);
          markersAdded++;
        }
      } catch (error) {
        console.error(` Error adding marker for ${property.title}:`, error);
      }
    });

    // Adjust bounds if we have markers
    if (markersRef.current.length > 0) {
      try {
        if (markersRef.current.length === 1) {
          const marker = markersRef.current[0];
          const latLng = marker.getLatLng();
          mapInstanceRef.current.setView([latLng.lat, latLng.lng], 13);
        } else {
          const group = L.featureGroup(markersRef.current);
          mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
        }
      } catch (error) {
        console.error("Error adjusting map bounds:", error);
      }
    } else {
    }
  }, [properties, showPriceMarkers, onMarkerClick, isMapReady]);

  if (!isLoaded) {
    return (
      <div
        className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
        style={{ height }}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500 dark:text-gray-400">Loading map...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
          .price-marker {
            background: white;
            border: 2px solid #3b82f6;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60px;
            min-width: 120px;
            padding: 8px 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
          }
          
          .price-marker::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #3b82f6;
          }
          
          .price-marker:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
            border-color: #1d4ed8;
            z-index: 1000;
          }
          
          .price-marker-content {
            text-align: center;
          }
          
          .price-marker-content .price {
            font-size: 14px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 2px;
          }
          
          .price-marker-content .property-name {
            font-size: 10px;
            color: #6b7280;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 110px;
            line-height: 1.2;
          }
          
          .custom-div-icon {
            background: transparent !important;
            border: none !important;
          }
          
          .leaflet-container {
            font-family: inherit;
          }
          
          .leaflet-popup-content h3 {
            color: #1f2937;
          }
          
          .leaflet-popup-content {
            margin: 8px !important;
          }
        `}
      </style>
      <div
        ref={mapRef}
        className={className}
        style={{ height, width: "100%" }}
      />
    </>
  );
};

export default PropertyMap;
