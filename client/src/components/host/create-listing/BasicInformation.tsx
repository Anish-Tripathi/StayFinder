import { Home, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface BasicInformationProps {
  initialData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  propertyTypes: string[];
  categories: string[];
  expanded: boolean;
  toggleSection: () => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
  initialData,
  updateFormData,
  propertyTypes,
  categories,
  expanded,
  toggleSection,
}) => {
  const [formState, setFormState] = useState({
    title: initialData.title || "",
    type: initialData.type || "",
    category: initialData.category || "",
    description: initialData.description || "",
    tags: initialData.tags || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
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
            <Home className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Basic Information
          </h2>
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
                Title*
              </label>
              <input
                name="title"
                type="text"
                value={formState.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Cozy apartment in downtown"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Property Type*
              </label>
              <select
                name="type"
                value={formState.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Category*
              </label>
              <select
                name="category"
                value={formState.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Description*
              </label>
              <textarea
                name="description"
                value={formState.description}
                onChange={handleChange}
                rows={5}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-5000 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your property in detail..."
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Tags (comma-separated)
              </label>
              <input
                name="tags"
                type="text"
                value={formState.tags}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., cozy, modern, scenic"
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

export default BasicInformation;
