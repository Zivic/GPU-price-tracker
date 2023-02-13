import React from "react";

const PriceSlider = () => {
  return (
    <div className="relative pt-1">
      <label className="form-label">Price range</label>
      <input
        type="range"
        className="
          form-range
          w-full
          h-6
          p-0
          bg-transparent
          focus:outline-none focus:ring-0 focus:shadow-none
        "
        min="0"
        max="5"
        id="customRange2"
      />
    </div>
  );
};
export default PriceSlider;
