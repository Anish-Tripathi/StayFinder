import { IndianRupee, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

interface AdditionalFeesProps {
  initialData: Record<string, any>;
  updateFormData: (data: Record<string, any>) => void;
  expanded: boolean;
  toggleSection: () => void;
}

const AdditionalFees: React.FC<AdditionalFeesProps> = ({
  initialData,
  updateFormData,
  expanded,
  toggleSection,
}) => {
  const [fees, setFees] = useState<
    Array<{
      name: string;
      amount: number;
      type: "per_stay" | "per_night" | "per_person";
      optional: boolean;
    }>
  >(initialData.additionalFees || []);

  const handleAddFee = () => {
    setFees([
      ...fees,
      { name: "", amount: 0, type: "per_stay" as "per_stay", optional: false },
    ]);
  };

  const handleRemoveFee = (index: number) => {
    const newFees = [...fees];
    newFees.splice(index, 1);
    setFees(newFees);
  };

  const handleFeeChange = (index: number, field: string, value: any) => {
    const newFees = [...fees];
    newFees[index] = { ...newFees[index], [field]: value };
    setFees(newFees);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({ additionalFees: fees });
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={toggleSection}
      >
        <div className="flex items-center">
          <div className="p-2 rounded-lg bg-blue-50 mr-3">
            <IndianRupee className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Additional Fees
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
          <div className="space-y-4">
            {fees.map((fee, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Fee Name
                  </label>
                  <input
                    type="text"
                    value={fee.name}
                    onChange={(e) =>
                      handleFeeChange(index, "name", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Pet Fee"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={fee.amount}
                    onChange={(e) =>
                      handleFeeChange(
                        index,
                        "amount",
                        parseFloat(e.target.value)
                      )
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Type
                  </label>
                  <select
                    value={fee.type}
                    onChange={(e) =>
                      handleFeeChange(index, "type", e.target.value)
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="per_stay">Per Stay</option>
                    <option value="per_night">Per Night</option>
                    <option value="per_person">Per Person</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3 mt-6">
                    <input
                      type="checkbox"
                      checked={fee.optional}
                      onChange={(e) =>
                        handleFeeChange(index, "optional", e.target.checked)
                      }
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Optional
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveFee(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddFee}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Add Another Fee
            </button>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

export default AdditionalFees;
