// backend/utils/validators.js
export function isValidUrl(maybeUrl) {
  try {
    const u = new URL(maybeUrl);
    return ["http:", "https:"].includes(u.protocol);
  } catch {
    return false;
  }
}

export function isValidCode(code) {
  return /^[a-zA-Z0-9-_]{3,32}$/.test(code);
}
//C:\Users\gupta\Documents\DailyToolbox\backend\utils\validators.js