import { useState } from "react";
import { FileText, ChevronUp, ChevronDown } from "lucide-react";

interface LegalProps {
  initialData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  expanded: boolean;
  toggleSection: () => void;
}

const Legal: React.FC<LegalProps> = ({
  initialData,
  updateFormData,
  expanded,
  toggleSection,
}) => {
  const [formState, setFormState] = useState({
    license: {
      number: initialData.license?.number || "",
      type: initialData.license?.type || "",
      expiryDate: initialData.license?.expiryDate || "",
    },
  });
  const [error] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      license: {
        ...prev.license,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { number, type, expiryDate } = formState.license;
    // Only include license if at least one field is provided
    const licenseData =
      number || type || expiryDate ? { license: formState.license } : {};
    console.log("Legal formState:", licenseData);
    updateFormData(licenseData);
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={toggleSection}
      >
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-blue-50 mr-3">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Legal</h2>
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
                License Number
              </label>
              <input
                name="number"
                type="text"
                value={formState.license.number}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="12345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                License Type
              </label>
              <input
                name="type"
                type="text"
                value={formState.license.type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Rental Permit"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Expiry Date
              </label>
              <input
                name="expiryDate"
                type="date"
                value={formState.license.expiryDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </form>
      )}
    </section>
  );
};

export default Legal;
