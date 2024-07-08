import React, { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./rangelider.css";

const MultiRangeSlide = ({
  minValue = 0,
  initialMinValue,
  maxValueProp,
  onValuesChanged,
}) => {
  const [minVal, setMinVal] = useState(initialMinValue ?? minValue);
  const [maxVal, setMaxVal] = useState(maxValueProp);

  // Debugging to check prop values
  console.log("Props:", { initialMinValue, minValue, maxValueProp });
  console.log("State:", { minVal, maxVal });

  useEffect(() => {
    setMinVal(initialMinValue ?? minValue);
    setMaxVal(maxValueProp);
  }, [initialMinValue, minValue, maxValueProp]);

  const handleValuesChange = (e) => {
    const { minValue, maxValue } = e;
    setMinVal(minValue);
    setMaxVal(maxValue);
    onValuesChanged(minValue, maxValue);
  };

  return (
    <div>
      <MultiRangeSlider
        min={minValue}
        max={maxValueProp}
        step={1}
        minValue={minVal}
        maxValue={maxVal}
        onChange={handleValuesChange}
      />
    </div>
  );
};

export default MultiRangeSlide;
