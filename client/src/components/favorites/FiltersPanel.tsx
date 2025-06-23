import React, { useState } from "react";
import { X } from "lucide-react";

interface Filters {
  propertyType: string;
  priceMin: string;
  priceMax: string;
  guestCount: string;
}

interface FiltersPanelProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  onApplyFilters: (filters: Filters) => void;
  propertyTypes: string[];
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  setFilters,
  setShowFilters,
  onApplyFilters,
  propertyTypes,
}) => {
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "priceMin" || name === "priceMax") {
      if (value === "" || !isNaN(Number(value))) {
        setTempFilters((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setTempFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleApplyFilters = () => {
    if (
      tempFilters.priceMin &&
      tempFilters.priceMax &&
      Number(tempFilters.priceMin) > Number(tempFilters.priceMax)
    ) {
      alert("Minimum price cannot be greater than maximum price");
      return;
    }
    setFilters(tempFilters);
    onApplyFilters(tempFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: Filters = {
      propertyType: "",
      priceMin: "",
      priceMax: "",
      guestCount: "",
    };
    setTempFilters(clearedFilters);
    setFilters(clearedFilters);
    onApplyFilters(clearedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-900">Filters</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            name="propertyType"
            value={tempFilters.propertyType}
            onChange={handleFilterChange}
            className="w-full border border-gray-400 rounded-md px-3 py-2 text-sm"
          >
            <option value="">All Types</option>
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="priceMin"
                value={tempFilters.priceMin}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                name="priceMax"
                value={tempFilters.priceMax}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guest Count
          </label>
          <select
            name="guestCount"
            value={tempFilters.guestCount}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FiltersPanel;
