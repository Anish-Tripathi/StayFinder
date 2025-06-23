// components/property/PropertyImageGallery.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyImage } from "../../types/property";
import { Button } from "../ui/PropertyButton";

interface PropertyImageGalleryProps {
  images: PropertyImage[];
  title: string;
}

const PropertyImageGallery: React.FC<PropertyImageGalleryProps> = ({
  images,
  title,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultImage =
    "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800";
  const displayImages =
    images?.length > 0
      ? images
      : [{ url: defaultImage, isPrimary: true, _id: "default" }];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
          {/* Main image */}
          <div className="md:col-span-2 md:row-span-2 relative group">
            <img
              src={displayImages[0]?.url}
              alt={title}
              className="w-full h-64 md:h-full object-cover cursor-pointer transition-all duration-300 group-hover:brightness-90"
              onClick={() => {
                setCurrentIndex(0);
                setShowModal(true);
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
          </div>

          {/* Secondary images */}
          {displayImages.slice(1, 5).map((image, index) => (
            <div key={image._id || index} className="relative group">
              <img
                src={image.url}
                alt={`${title} ${index + 2}`}
                className="w-full h-32 object-cover cursor-pointer transition-all duration-300 group-hover:brightness-90"
                onClick={() => {
                  setCurrentIndex(index + 1);
                  setShowModal(true);
                }}
              />
              {index === 3 && displayImages.length > 5 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    +{displayImages.length - 5} more
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Show all photos button */}
        <div className="flex justify-end mt-4">
          <Button
            variant="outline"
            size="md"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2"
          >
            <Images className="h-4 w-4" />
            Show all photos ({displayImages.length})
          </Button>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close button */}
            <Button
              variant="ghost"
              size="md"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation */}
            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 z-10 bg-black bg-opacity-50 text-white hover:bg-opacity-70"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Main image */}
            <img
              src={displayImages[currentIndex]?.url}
              alt={`${title} ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {displayImages.length}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PropertyImageGallery;
