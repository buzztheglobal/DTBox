// src/components/unit_converter/unitConversionUtils.js

// 1. Define all categories and units with conversion factors to a base unit
const conversionFactors = {
  Length: {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701,
  },
  Weight: {
    kilogram: 1,
    gram: 1000,
    milligram: 1000000,
    pound: 2.20462,
    ounce: 35.274,
    ton: 0.00110231,
  },
  Volume: {
    liter: 1,
    milliliter: 1000,
    'cubic meter': 0.001,
    'cubic foot': 0.0353147,
    gallon: 0.264172,
    quart: 1.05669,
    pint: 2.11338,
    tablespoon: 67.628,
    teaspoon: 202.884,
  },
  Area: {
    'square meter': 1,
    'square kilometer': 0.000001,
    'square centimeter': 10000,
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
    gigabyte: 1 / (1024 ** 3),
    terabyte: 1 / (1024 ** 4),
  },
  Speed: {
    'meters per second': 1,
    'kilometers per hour': 3.6,
    'miles per hour': 2.23694,
    'feet per second': 3.28084,
    knot: 1.94384,
  },
  Energy: {
    joule: 1,
    kilojoule: 0.001,
    calorie: 0.239006,
    kilocalorie: 0.000239006,
    'watt-hour': 0.000278,
    'kilowatt-hour': 0.000000278,
  },
  Pressure: {
    pascal: 1,
    kilopascal: 0.001,
    bar: 0.00001,
    atm: 0.00000986923,
    psi: 0.000145038,
  },
  Power: {
    watt: 1,
    kilowatt: 0.001,
    horsepower: 0.00134102,
    'megawatt': 0.000001,
  },
  Angle: {
    degree: 1,
    radian: 0.0174533,
    gradian: 1.11111,
  },
  Temperature: {
    // handled separately
  },
  Currency: {
    USD: 1,
    EUR: 0.92, // static placeholder
    INR: 83,
    GBP: 0.78,
    JPY: 157,
  }
};

// 2. Group categories into Metric/Imperial
export const categoryGroupMap = {
  Metric: [
    'Length', 'Weight', 'Volume', 'Area', 'Speed', 'Pressure', 'Power', 'Energy', 'Temperature', 'Data'
  ],
  Imperial: [
    'Length', 'Weight', 'Volume', 'Area', 'Speed'
  ],
  Other: ['Time', 'Angle', 'Currency'],
};

// 3. Temperature special logic
const temperatureConvert = (value, from, to) => {
  const num = parseFloat(value);
  if (from === to) return num;
  if (from === 'Celsius') return to === 'Fahrenheit' ? (num * 9 / 5) + 32 : to === 'Kelvin' ? num + 273.15 : num;
  if (from === 'Fahrenheit') return to === 'Celsius' ? (num - 32) * 5 / 9 : to === 'Kelvin' ? ((num - 32) * 5 / 9) + 273.15 : num;
  if (from === 'Kelvin') return to === 'Celsius' ? num - 273.15 : to === 'Fahrenheit' ? ((num - 273.15) * 9 / 5) + 32 : num;
  return num;
};

// 4. Main exposed functions

export const getCategories = () => Object.keys(conversionFactors);

export const getUnitsForCategory = (category) => {
  if (category === 'Temperature') return ['Celsius', 'Fahrenheit', 'Kelvin'];
  return Object.keys(conversionFactors[category]);
};

export const convertValue = (category, fromUnit, toUnit, value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return '';
  if (category === 'Temperature') return temperatureConvert(num, fromUnit, toUnit).toFixed(2);
  const fromFactor = conversionFactors[category][fromUnit];
  const toFactor = conversionFactors[category][toUnit];
  const result = num * (toFactor / fromFactor);
  return result.toFixed(4);
};
