import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface AvailabilityProps {
  initialData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  cancellationPolicies: string[];
  expanded: boolean;
  toggleSection: () => void;
}

const Availability: React.FC<AvailabilityProps> = ({
  initialData,
  updateFormData,
  cancellationPolicies,
  expanded,
  toggleSection,
}) => {
  const [formState, setFormState] = useState({
    minStay: initialData.minStay || 1,
    maxStay: initialData.maxStay || 365,
    advanceNotice: initialData.advanceNotice || 0,
    preparationTime: initialData.preparationTime || 0,
    instantBook: initialData.instantBook || false,
    cancellationPolicy: initialData.cancellationPolicy || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Availability</h2>
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
                Minimum Stay (nights)
              </label>
              <input
                name="minStay"
                type="number"
                min="1"
                value={formState.minStay}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Maximum Stay (nights)
              </label>
              <input
                name="maxStay"
                type="number"
                min="1"
                value={formState.maxStay}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="365"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Advance Notice (days)
              </label>
              <input
                name="advanceNotice"
                type="number"
                min="0"
                value={formState.advanceNotice}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Preparation Time (days)
                </label>
                <input
                  name="preparationTime"
                  type="number"
                  min="0"
                  value={formState.preparationTime}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="instantBook"
                  checked={formState.instantBook}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable Instant Booking
                </span>
              </label>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Cancellation Policy*
              </label>
              <select
                name="cancellationPolicy"
                value={formState.cancellationPolicy}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a policy</option>
                {cancellationPolicies.map((policy) => (
                  <option key={policy} value={policy}>
                    {policy
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

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

export default Availability;
