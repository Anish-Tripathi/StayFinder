import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface HouseRulesProps {
  initialData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  expanded: boolean;
  toggleSection: () => void;
}

const HouseRules: React.FC<HouseRulesProps> = ({
  initialData,
  updateFormData,
  expanded,
  toggleSection,
}) => {
  const [formState, setFormState] = useState({
    checkInFrom: initialData.checkInFrom || "15:00",
    checkInTo: initialData.checkInTo || "21:00",
    checkOut: initialData.checkOut || "11:00",
    smokingAllowed: initialData.smokingAllowed || false,
    petsAllowed: initialData.petsAllowed || false,
    partiesAllowed: initialData.partiesAllowed || false,
    quietHoursFrom: initialData.quietHoursFrom || "",
    quietHoursTo: initialData.quietHoursTo || "",
    additionalRules: initialData.additionalRules || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">House Rules</h2>
        </div>
        {expanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </div>
      {expanded && (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Check-in From
                </label>
                <input
                  name="checkInFrom"
                  type="time"
                  value={formState.checkInFrom}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Check-in To
                </label>
                <input
                  name="checkInTo"
                  type="time"
                  value={formState.checkInTo}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Check-out
                </label>
                <input
                  name="checkOut"
                  type="time"
                  value={formState.checkOut}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="smokingAllowed"
                  checked={formState.smokingAllowed}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Smoking Allowed
                </span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="petsAllowed"
                  checked={formState.petsAllowed}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Pets Allowed
                </span>
              </label>
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="partiesAllowed"
                  checked={formState.partiesAllowed}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Parties Allowed
                </span>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Quiet Hours From
                </label>
                <input
                  name="quietHoursFrom"
                  type="time"
                  value={formState.quietHoursFrom}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Quiet Hours To
                </label>
                <input
                  name="quietHoursTo"
                  type="time"
                  value={formState.quietHoursTo}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Additional Rules
              </label>
              <textarea
                name="additionalRules"
                rows={3}
                value={formState.additionalRules}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add one rule per line..."
              />
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

export default HouseRules;
