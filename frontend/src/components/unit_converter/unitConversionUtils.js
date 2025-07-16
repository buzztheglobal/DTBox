// src/components/unit_converter/unitConversionUtils.js

const conversionFactors = {
  Length: {
    meter: 1,
    kilometer: 0.001,
    mile: 0.000621371,
    foot: 3.28084,
    inch: 39.3701,
    centimeter: 100,
    millimeter: 1000,
  },
  Weight: {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.00110231,
  },
  Volume: {
    liter: 1,
    milliliter: 1000,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    'cubic meter': 0.001,
    'cubic foot': 0.0353147,
  },
  Area: {
    'square meter': 1,
    'square kilometer': 0.000001,
    acre: 0.000247105,
    hectare: 0.0001,
    'square foot': 10.7639,
    'square inch': 1550,
  },
  Time: {
    second: 1,
    minute: 1 / 60,
    hour: 1 / 3600,
    day: 1 / 86400,
    week: 1 / (86400 * 7),
    year: 1 / (86400 * 365),
  },
  Data: {
    byte: 1,
    kilobyte: 1 / 1024,
    megabyte: 1 / (1024 * 1024),
    gigabyte: 1 / (1024 * 1024 * 1024),
    terabyte: 1 / (1024 ** 4),
  },
  Temperature: {
    // handled separately
  },
};

// Handle temperature conversion
const temperatureConvert = (value, fromUnit, toUnit) => {
  const num = parseFloat(value);
  if (fromUnit === toUnit) return num;

  if (fromUnit === 'Celsius') {
    return toUnit === 'Fahrenheit'
      ? (num * 9) / 5 + 32
      : toUnit === 'Kelvin'
      ? num + 273.15
      : num;
  } else if (fromUnit === 'Fahrenheit') {
    return toUnit === 'Celsius'
      ? ((num - 32) * 5) / 9
      : toUnit === 'Kelvin'
      ? ((num - 32) * 5) / 9 + 273.15
      : num;
  } else if (fromUnit === 'Kelvin') {
    return toUnit === 'Celsius'
      ? num - 273.15
      : toUnit === 'Fahrenheit'
      ? ((num - 273.15) * 9) / 5 + 32
      : num;
  }

  return num;
};

// Returns array of all categories
export const getCategories = () => Object.keys(conversionFactors);

// Returns array of units for the given category
export const getUnitsForCategory = (category) => {
  if (category === 'Temperature') {
    return ['Celsius', 'Fahrenheit', 'Kelvin'];
  }
  return Object.keys(conversionFactors[category]);
};

// Main conversion logic
export const convertValue = (category, fromUnit, toUnit, value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return '';

  if (category === 'Temperature') {
    return temperatureConvert(num, fromUnit, toUnit).toFixed(2);
  }

  const fromFactor = conversionFactors[category][fromUnit];
  const toFactor = conversionFactors[category][toUnit];
  const result = num * (toFactor / fromFactor);
  return result.toFixed(4);
};
