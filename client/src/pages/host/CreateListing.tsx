import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import api from "../../services/api";
import {
  BasicInformation,
  Location,
  Pricing,
  Details,
  Amenities,
  Photos,
  HouseRules,
  Availability,
  AdditionalFees,
  LegalInformation,
} from "../../components/host/create-listing";
import toast from "react-hot-toast";

interface ImageUrl {
  url: string;
  isFile: boolean;
}

const STEPS = [
  "Basic",
  "Location",
  "Pricing",
  "Details",
  "Amenities",
  "Photos",
  "Rules",
  "Availability",
  "Fees",
  "Legal",
] as const;

type Step = (typeof STEPS)[number];

const CreateListing = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("Basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [imageUploads, setImageUploads] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<ImageUrl[]>([]);
  const [imageInput, setImageInput] = useState("");
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [expandedSections, setExpandedSections] = useState<
    Record<Step, boolean>
  >({
    Basic: true,
    Location: false,
    Pricing: false,
    Details: false,
    Amenities: false,
    Photos: false,
    Rules: false,
    Availability: false,
    Fees: false,
    Legal: false,
  });

  const updateFormData = (data: Record<string, any>) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
    if (currentStep !== "Legal") {
      goToNextStep();
    }
  };

  const toggleSection = (step: Step) => {
    setExpandedSections((prev) => ({
      ...prev,
      [step]: !prev[step],
    }));
  };

  const scrollToStep = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goToNextStep = () => {
    try {
      const currentIndex = STEPS.indexOf(currentStep);
      if (currentIndex < STEPS.length - 1) {
        const nextStep = STEPS[currentIndex + 1];

        setCurrentStep(nextStep);
        setExpandedSections((prev) => ({
          ...prev,
          [currentStep]: false,
          [nextStep]: true,
        }));

        // Scroll with offset
        setTimeout(scrollToStep, 50);
      }
    } catch (error) {
      console.error("Error advancing to next step:", error);
      setError("Failed to advance to the next step. Please try again.");
    }
  };

  const goToPrevStep = () => {
    try {
      const currentIndex = STEPS.indexOf(currentStep);
      if (currentIndex > 0) {
        const prevStep = STEPS[currentIndex - 1];

        setCurrentStep(prevStep);
        setExpandedSections((prev) => ({
          ...prev,
          [currentStep]: false,
          [prevStep]: true,
        }));

        // Scroll with offset
        setTimeout(scrollToStep, 50);
      }
    } catch (error) {
      console.error("Error going to previous step:", error);
      setError("Failed to go to the previous step. Please try again.");
    }
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsSubmitting(true);
      setError("");

      if (imageUploads.length === 0 && imageUrls.length === 0) {
        setError("At least one image is required.");
        setIsSubmitting(false);
        return;
      }

      let imageData: { url: string; isPrimary: boolean }[] = [];
      if (imageUploads.length > 0) {
        const uploadedUrls = await uploadImages(imageUploads);
        imageData = uploadedUrls.map((url: string) => ({
          url,
          isPrimary: false,
        }));
      }

      if (imageUrls.length > 0) {
        const userProvidedUrls = imageUrls
          .filter((img) => !img.isFile)
          .map((img) => img.url);
        imageData = [
          ...imageData,
          ...userProvidedUrls.map((url: string) => ({ url, isPrimary: false })),
        ];
      }

      const data = {
        ...formData,
        images: imageData,
        host: user.id,
        currency: "INR",
        status: "active",
      };

      const response = await api.post("/listings", data);
      toast.success("Listing created successfully!");
      navigate("/host");
    } catch (err: any) {
      console.error("Submission error:", err.response?.data);
      let errorMessage =
        err.response?.data?.message ||
        "Failed to create listing. Please try again.";
      if (err.response?.data?.missingFields) {
        const missing = Object.entries(err.response.data.missingFields)
          .filter(([_, value]) => value)
          .map(([field]) => field.replace("location", "location."))
          .join(", ");
        errorMessage += `\nMissing fields: ${missing}`;
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadImages = async (files: File[]) => {
    try {
      const formData = new FormData();
      files.forEach((file: File) => formData.append("images", file));
      const response = await api.post("/listings/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (!response.data.urls || response.data.urls.length === 0) {
        throw new Error("No image URLs returned from server");
      }
      return response.data.urls as string[];
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to upload images. Please try again.";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "Basic":
        return (
          <BasicInformation
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Basic}
            toggleSection={() => toggleSection("Basic")}
            propertyTypes={[
              "haveli",
              "house",
              "cottage",
              "apartment",
              "villa",
              "resort",
              "bungalow",
              "tent",
              "guesthouse",
            ]}
            categories={["entire_place", "private_room", "shared_room"]}
          />
        );
      case "Location":
        return (
          <Location
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Location}
            toggleSection={() => toggleSection("Location")}
          />
        );
      case "Pricing":
        return (
          <Pricing
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Pricing}
            toggleSection={() => toggleSection("Pricing")}
          />
        );
      case "Details":
        return (
          <Details
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Details}
            toggleSection={() => toggleSection("Details")}
          />
        );
      case "Amenities":
        return (
          <Amenities
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Amenities}
            toggleSection={() => toggleSection("Amenities")}
            amenitiesList={[
              "wifi",
              "kitchen",
              "courtyard",
              "parking",
              "air_conditioning",
              "heating",
              "elevator",
              "gym",
              "washer",
              "tv",
              "pool",
              "pet_friendly",
            ]}
          />
        );
      case "Photos":
        return (
          <Photos
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Photos}
            toggleSection={() => toggleSection("Photos")}
            imageUploads={imageUploads}
            setImageUploads={setImageUploads}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            imageInput={imageInput}
            setImageInput={setImageInput}
            uploadMethod={uploadMethod}
            setUploadMethod={setUploadMethod}
            setError={setError}
          />
        );
      case "Rules":
        return (
          <HouseRules
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Rules}
            toggleSection={() => toggleSection("Rules")}
          />
        );
      case "Availability":
        return (
          <Availability
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Availability}
            toggleSection={() => toggleSection("Availability")}
            cancellationPolicies={[
              "flexible",
              "moderate",
              "strict",
              "super_strict_30",
              "super_strict_60",
            ]}
          />
        );
      case "Fees":
        return (
          <AdditionalFees
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Fees}
            toggleSection={() => toggleSection("Fees")}
          />
        );
      case "Legal":
        return (
          <LegalInformation
            initialData={formData}
            updateFormData={updateFormData}
            expanded={expandedSections.Legal}
            toggleSection={() => toggleSection("Legal")}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Create Your <span className="text-blue-600">Listing</span>
            </h1>
            <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
              Step {STEPS.indexOf(currentStep) + 1} of {STEPS.length}:{" "}
              {currentStep}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="mb-2">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => (
                <div
                  key={step}
                  className={`flex flex-col items-center ${
                    index < STEPS.length - 1 ? "flex-1" : ""
                  }`}
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(step)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                        STEPS.indexOf(currentStep) >= index
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {STEPS.indexOf(currentStep) > index ? (
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </button>
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium transition-colors duration-200 ${
                      currentStep === step
                        ? "text-blue-600"
                        : STEPS.indexOf(currentStep) > index
                        ? "text-gray-700"
                        : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${
                    ((STEPS.indexOf(currentStep) + 1) / STEPS.length) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentStep} Information
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Complete this section to continue with your listing creation
                process.
              </p>
            </div>

            {/* Step Content */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              {renderCurrentStep()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              {currentStep !== "Basic" ? (
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep === "Legal" && (
                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 disabled:from-green-300 disabled:to-green-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Listing
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <h4 className="text-red-800 font-medium mb-1">Error</h4>
                    <p className="text-red-700 text-sm whitespace-pre-line">
                      {error}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
