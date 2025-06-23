import { useState } from "react";
import { DollarSign, ChevronUp, ChevronDown } from "lucide-react";

interface PricingProps {
  initialData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  expanded: boolean;
  toggleSection: () => void;
}

const Pricing: React.FC<PricingProps> = ({
  initialData,
  updateFormData,
  expanded,
  toggleSection,
}) => {
  const [formState, setFormState] = useState({
    price: initialData.price || 1000,
    cleaningFee: initialData.cleaningFee || 500,
    securityDeposit: initialData.securityDeposit || 2000,
    weeklyDiscount: initialData.weeklyDiscount || 10,
    monthlyDiscount: initialData.monthlyDiscount || 20,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: parseInt(value),
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
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Pricing</h2>
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
                Nightly Price (₹)*
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  name="price"
                  type="number"
                  min="1"
                  value={formState.price}
                  onChange={handleChange}
                  className="w-full p-3 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Cleaning Fee (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  name="cleaningFee"
                  type="number"
                  min="0"
                  value={formState.cleaningFee}
                  onChange={handleChange}
                  className="w-full p-3 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Security Deposit (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  name="securityDeposit"
                  type="number"
                  min="0"
                  value={formState.securityDeposit}
                  onChange={handleChange}
                  className="w-full p-3 pl-8 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Weekly Discount (%)
              </label>
              <input
                name="weeklyDiscount"
                type="number"
                min="0"
                max="50"
                value={formState.weeklyDiscount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Monthly Discount (%)
              </label>
              <input
                name="monthlyDiscount"
                type="number"
                min="0"
                max="50"
                value={formState.monthlyDiscount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="20"
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

export default Pricing;
