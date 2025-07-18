// File: frontend/src/context/BMIContext.js
import { createContext } from 'react';

export const BMIContext = createContext({
  result: null,
  setResult: () => {},
});