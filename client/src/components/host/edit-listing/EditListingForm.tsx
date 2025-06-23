import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Home,
  MapPin,
  IndianRupee,
  Star,
  Shield,
  Calendar,
  Settings,
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  BasicInfo,
  LocationDetails,
  PricingDetails,
  Amenities,
  Policies,
  Availability,
  Photos,
  Settings as SettingsTab,
} from "../../../components/host/edit-listing";
import { Listing } from "../../../types/booking";
import api from "../../../services/api";
import { NavigateFunction } from "react-router-dom";

interface EditListingFormProps {
  formData: Listing;
  setFormData: React.Dispatch<React.SetStateAction<Listing>>;
  listing: Listing;
  navigate: NavigateFunction;
}

const EditListingForm: React.FC<EditListingFormProps> = ({
  formData,
  setFormData,
  listing,
  navigate,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [newHouseRule, setNewHouseRule] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newFee, setNewFee] = useState({
    name: "",
    amount: 0,
    type: "per_night" as "per_night" | "per_stay" | "per_person",
    optional: false,
  });

  // Cleanup preview URLs on component unmount
  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (name.includes("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else if (name.includes("houseRules.")) {
      const field = name.split(".")[1];
      if (field === "checkIn" || field === "quietHours") {
        const subField = name.split(".")[2];
        setFormData((prev) => ({
          ...prev,
          houseRules: {
            ...prev.houseRules,
            [field]: { ...prev.houseRules[field], [subField]: value },
          },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          houseRules: {
            ...prev.houseRules,
            [field]: type === "checkbox" ? checked : value,
          },
        }));
      }
    } else if (name.includes("availability.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          [field]: type === "number" ? parseInt(value) : value,
        },
      }));
    } else if (name.includes("license.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        license: { ...prev.license, [field]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "number"
            ? parseFloat(value) || 0
            : type === "checkbox"
            ? checked
            : value,
      }));
    }
  };

  const handleFeeChange = (field: string, value: any) => {
    setNewFee((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((a) => a !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const addHouseRule = () => {
    if (newHouseRule.trim()) {
      setFormData((prev) => ({
        ...prev,
        houseRules: {
          ...prev.houseRules,
          additionalRules: [
            ...(prev.houseRules.additionalRules || []),
            newHouseRule.trim(),
          ],
        },
      }));
      setNewHouseRule("");
    }
  };

  const removeHouseRule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      houseRules: {
        ...prev.houseRules,
        additionalRules: prev.houseRules.additionalRules.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const addFee = () => {
    if (newFee.name.trim() && newFee.amount > 0) {
      setFormData((prev) => ({
        ...prev,
        additionalFees: [...prev.additionalFees, { ...newFee }],
      }));
      setNewFee({ name: "", amount: 0, type: "per_night", optional: false });
    }
  };

  const removeFee = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalFees: prev.additionalFees.filter((_, i) => i !== index),
    }));
  };

  const removeImage = async (index: number, isExisting: boolean) => {
    if (isExisting) {
      const imageToRemove = formData.images[index];
      try {
        await api.delete(`/listings/${listing._id}/image/${imageToRemove._id}`);
        setFormData((prev) => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index),
        }));
        toast.success("Image removed successfully");
      } catch (error: any) {
        console.error("Remove image error:", error);
        toast.error(error.response?.data?.message || "Failed to remove image");
      }
    } else {
      URL.revokeObjectURL(previewImages[index]);
      setNewImages((prev) => prev.filter((_, i) => i !== index));
      setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const setPrimaryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isPrimary: i === index,
      })),
    }));
  };

  const handleImageCaptionChange = (index: number, caption: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) =>
        i === index ? { ...img, caption } : img
      ),
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let uploadedImageUrls: string[] = [];

      // Only upload if there are new images
      if (newImages.length > 0) {
        const formDataImages = new FormData();

        // The key here is to append each file with the correct field name
        // that matches what multer expects: "files"
        newImages.forEach((image) => {
          formDataImages.append("files", image, image.name);
        });

        const uploadResponse = await api.post(
          "/listings/upload",
          formDataImages,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        uploadedImageUrls = uploadResponse.data.urls;

        // Clean up preview URLs
        previewImages.forEach((url) => URL.revokeObjectURL(url));
        setNewImages([]);
        setPreviewImages([]);
      }

      // Combine existing images with newly uploaded ones
      const updatedImages = [
        ...formData.images,
        ...uploadedImageUrls.map((url) => ({
          url,
          isPrimary: false,
          _id: undefined,
          caption: "",
        })),
      ];

      // Ensure at least one image is primary
      if (
        updatedImages.length > 0 &&
        !updatedImages.some((img) => img.isPrimary)
      ) {
        updatedImages[0].isPrimary = true;
      }

      const updateData = {
        ...formData,
        images: updatedImages,
      };

      await api.put(`/listings/${listing._id}`, updateData);
      toast.success("Listing updated successfully");
      navigate("/host");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to update listing";
      console.error("Submit error:", {
        message,
        status: error.response?.status,
        data: error.response?.data,
        fullError: error,
      });
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      toast.error("No files selected");
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      toast.error("No valid images selected");
      return;
    }

    setNewImages((prev) => [...prev, ...validFiles]);
    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Home },
    { id: "location", label: "Location", icon: MapPin },
    { id: "pricing", label: "Pricing", icon: IndianRupee },
    { id: "amenities", label: "Amenities", icon: Star },
    { id: "policies", label: "Policies", icon: Shield },
    { id: "availability", label: "Availability", icon: Calendar },
    { id: "media", label: "Photos", icon: Upload },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-900 dark:text-gray-100">Edit</span>{" "}
            <span className="text-blue-600">Listing</span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-lg">
            Update your property details
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 lg:flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sticky top-8">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
            >
              {activeTab === "basic" && (
                <BasicInfo
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {activeTab === "location" && (
                <LocationDetails
                  formData={formData}
                  handleInputChange={handleInputChange}
                  setFormData={setFormData}
                />
              )}
              {activeTab === "pricing" && (
                <PricingDetails
                  formData={formData}
                  handleInputChange={handleInputChange}
                  newFee={newFee}
                  handleFeeChange={handleFeeChange}
                  addFee={addFee}
                  removeFee={removeFee}
                />
              )}
              {activeTab === "amenities" && (
                <Amenities formData={formData} toggleAmenity={toggleAmenity} />
              )}
              {activeTab === "policies" && (
                <Policies
                  formData={formData}
                  handleInputChange={handleInputChange}
                  newHouseRule={newHouseRule}
                  setNewHouseRule={setNewHouseRule}
                  addHouseRule={addHouseRule}
                  removeHouseRule={removeHouseRule}
                />
              )}
              {activeTab === "availability" && (
                <Availability
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}
              {activeTab === "media" && (
                <Photos
                  formData={formData}
                  previewImages={previewImages}
                  handleImageUpload={handleImageUpload}
                  removeImage={removeImage}
                  setPrimaryImage={setPrimaryImage}
                  handleImageCaptionChange={handleImageCaptionChange}
                />
              )}
              {activeTab === "settings" && (
                <SettingsTab
                  formData={formData}
                  handleInputChange={handleInputChange}
                  newTag={newTag}
                  setNewTag={setNewTag}
                  addTag={addTag}
                  removeTag={removeTag}
                />
              )}

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/host")}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EditListingForm;
