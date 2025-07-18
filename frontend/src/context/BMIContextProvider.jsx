// File: src/context/BMIContextProvider.jsx
import React, { useState } from 'react';
import { BMIContext } from './BMIContext';

export function BMIContextProvider({ children }) {
  const [result, setResult] = useState(null);

  return (
    <BMIContext.Provider value={{ result, setResult }}>
      {children}
    </BMIContext.Provider>
  );
}
