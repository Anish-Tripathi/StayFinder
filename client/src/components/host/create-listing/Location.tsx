import { useState } from "react";
import { Home, ChevronUp, ChevronDown } from "lucide-react";

interface LocationProps {
  initialData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  expanded: boolean;
  toggleSection: () => void;
}

const Location: React.FC<LocationProps> = ({
  initialData,
  updateFormData,
  expanded,
  toggleSection,
}) => {
  const [formState, setFormState] = useState({
    location: {
      address: initialData.location?.address || "",
      city: initialData.location?.city || "",
      country: initialData.location?.country || "",
      state: initialData.location?.state || "",
      zipCode: initialData.location?.zipCode || "",
      neighborhood: initialData.location?.neighborhood || "",
    },
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value.trim(), // Trim whitespace
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { address, city, country } = formState.location;
    if (!address || !city || !country) {
      setError("Address, city, and country are required");
      return;
    }
    if (address.length < 5) {
      setError("Address must be at least 5 characters long");
      return;
    }
    if (!/^[a-zA-Z0-9\s,.#-]+$/.test(address)) {
      setError("Address contains invalid characters");
      return;
    }
    setError(null);
    console.log("Location formState:", formState);
    updateFormData(formState);
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={toggleSection}
      >
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-blue-50 mr-3">
            <Home className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Location</h2>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </div>

      {expanded && (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Address*
              </label>
              <input
                name="address"
                type="text"
                value={formState.location.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 123 Main St, Mira Road"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Include street number, road name, or landmark for accuracy
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                City*
              </label>
              <input
                name="city"
                type="text"
                value={formState.location.city}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Mumbai"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Country*
              </label>
              <input
                name="country"
                type="text"
                value={formState.location.country}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., India"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                State
              </label>
              <input
                name="state"
                type="text"
                value={formState.location.state}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Maharashtra"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Zip Code
              </label>
              <input
                name="zipCode"
                type="text"
                value={formState.location.zipCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 400001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Neighborhood
              </label>
              <input
                name="neighborhood"
                type="text"
                value={formState.location.neighborhood}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Colaba"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
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

export default Location;
