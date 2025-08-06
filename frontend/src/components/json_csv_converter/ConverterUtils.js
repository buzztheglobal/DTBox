// /src/components/json_csv_converter/ConverterUtils.js
// /src/components/json_csv_converter/converterUtils.js

export function jsonToCsv(jsonArray, delimiter = ",", flatten = true) {
  if (!Array.isArray(jsonArray)) return "";

  const headers = Array.from(
    new Set(jsonArray.flatMap(obj =>
      Object.keys(flatten ? flattenObject(obj) : obj)
    ))
  );

  const csvRows = [headers.join(delimiter)];

  jsonArray.forEach((obj) => {
    const rowSource = flatten ? flattenObject(obj) : obj;
    const row = headers.map(header => {
      const val = rowSource[header] !== undefined ? String(rowSource[header]) : "";
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvRows.push(row.join(delimiter));
  });

  return csvRows.join("\n");
}

export function csvToJson(csvText, delimiter = ",") {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(delimiter).map(h => h.trim());

  const data = lines.slice(1).map(line => {
    const values = line.split(delimiter);
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] ? values[i].trim() : "";
    });
    return obj;
  });

  return data;
}

function flattenObject(obj, prefix = "", res = {}) {
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      flattenObject(value, newKey, res);
    } else {
      res[newKey] = value;
    }
  }
  return res;
}

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\components\json_csv_converter\ConverterUtils.js