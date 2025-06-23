import React from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { Listing } from "../../../types/booking";

interface FormData {
  images: Listing["images"];
}

interface PhotosProps {
  formData: FormData;
  previewImages: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number, isExisting: boolean) => void;
  setPrimaryImage: (index: number) => void;
  handleImageCaptionChange?: (index: number, caption: string) => void;
}

const Photos: React.FC<PhotosProps> = ({
  formData,
  previewImages,
  handleImageUpload,
  removeImage,
  setPrimaryImage,
  handleImageCaptionChange,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e);
      // Prevent resetting the input value
      e.target.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center mb-6">
        <Upload className="h-6 w-6 text-blue-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Photos
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {formData.images.map((image, index) => (
          <div key={image._id} className="relative">
            <img
              src={image.url}
              alt={image.caption || `Property ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(index, true)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <X className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setPrimaryImage(index)}
              className={`absolute bottom-2 left-2 px-2 py-1 text-xs rounded-full ${
                image.isPrimary
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {image.isPrimary ? "Primary" : "Set Primary"}
            </button>
            <input
              type="text"
              value={image.caption || ""}
              onChange={(e) =>
                handleImageCaptionChange?.(index, e.target.value)
              }
              className="w-full mt-2 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Add a caption"
            />
          </div>
        ))}
        {previewImages.map((preview, index) => (
          <div key={`preview-${index}`} className="relative">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(index, false)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload New Photos
        </label>
        <input
          id="file-upload"
          type="file"
          name="files"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>
    </motion.div>
  );
};

export default Photos;
