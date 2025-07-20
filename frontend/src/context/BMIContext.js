// File: frontend/src/context/BMIContext.js

import React, { createContext, useState } from 'react';

export const BMIContext = createContext();

export function BMIContextProvider({ children }) {
  const [result, setResult] = useState(null);

  return (
    <BMIContext.Provider value={{ result, setResult }}>
      {children}
    </BMIContext.Provider>
  );
}
