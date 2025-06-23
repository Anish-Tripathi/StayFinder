import { Dispatch, SetStateAction, useState } from "react";
import { Image, X, Link } from "lucide-react";

interface ImageUrl {
  url: string;
  isFile: boolean;
}

interface PhotosProps {
  initialData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  expanded: boolean;
  toggleSection: () => void;
  imageUploads: File[];
  setImageUploads: Dispatch<SetStateAction<File[]>>;
  imageUrls: ImageUrl[];
  setImageUrls: Dispatch<SetStateAction<ImageUrl[]>>;
  imageInput: string;
  setImageInput: Dispatch<SetStateAction<string>>;
  uploadMethod: "file" | "url";
  setUploadMethod: Dispatch<SetStateAction<"file" | "url">>;
  setError: Dispatch<SetStateAction<string>>;
}

const Photos: React.FC<PhotosProps> = ({
  initialData,
  updateFormData,
  expanded,
  toggleSection,
  imageUploads,
  setImageUploads,
  imageUrls,
  setImageUrls,
  imageInput,
  setImageInput,
  uploadMethod,
  setUploadMethod,
  setError,
}) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length > 10) {
        setLocalError("You can upload a maximum of 10 images.");
        return;
      }
      setImageUploads(files);
      const urls = files.map((file) => ({
        url: URL.createObjectURL(file),
        isFile: true,
      }));
      setImageUrls(urls);
      setLocalError(null);
      setError(""); // Clear parent error
    }
  };

  const handleImageUrlSubmit = () => {
    if (imageInput.trim()) {
      if (!/\.(jpg|jpeg|png|gif)$/i.test(imageInput)) {
        setLocalError(
          "Please provide a valid image URL (jpg, jpeg, png, or gif)."
        );
        return;
      }
      if (imageUrls.length >= 10) {
        setLocalError("You can add a maximum of 10 images.");
        return;
      }
      const newUrls = [...imageUrls, { url: imageInput, isFile: false }];
      setImageUrls(newUrls);
      setImageInput("");
      setLocalError(null);
      setError(""); // Clear parent error
    }
  };

  const removeImage = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    const newUploads = imageUploads.filter((_, i) => i !== index);
    setImageUploads(newUploads);
    setLocalError(null);
    setError(""); // Clear parent error
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrls.length === 0) {
      setLocalError("At least one image is required.");
      setError("At least one image is required.");
      return;
    }
    setLocalError(null);
    setError(""); // Clear parent error
    updateFormData({
      imageUrls,
      imageUploads,
    });
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={toggleSection}
      >
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-blue-50 mr-3">
            <Image className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
        </div>
        {expanded ? <X className="h-5 w-5" /> : <Link className="h-5 w-5" />}
      </div>
      {expanded && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setUploadMethod("file")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                uploadMethod === "file"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Upload Files
            </button>
            <button
              type="button"
              onClick={() => setUploadMethod("url")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                uploadMethod === "url"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Add URL
            </button>
          </div>

          {uploadMethod === "file" ? (
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Image className="h-12 w-12 text-gray-400 mb-3" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG (Max. 10MB each, up to 10 images)
                </p>
              </div>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="flex space-x-2 items-center">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleImageUrlSubmit}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Link className="h-4 w-4 mr-2" />
                Add
              </button>
            </div>
          )}

          {imageUrls.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Selected Images ({imageUrls.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageUrls.map((img, index) => (
                  <div
                    key={index}
                    className="relative group h-40 rounded-lg overflow-hidden"
                  >
                    <img
                      src={img.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {localError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {localError}
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save & Continue
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Photos;
