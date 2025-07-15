// ✅ Correct
import React from 'react';
import DataStorageConverter from '../../components/data_converter/DataStorageConverter';

const DataStorageConverterPage = () => {
  return (
    <div className="tool-card converter-wrapper">
      <h2>Data Storage Converter</h2>
      <p>Easily convert between KB, MB, GB, TB and more.</p>
      <DataStorageConverter />
    </div>
  );
};

export default DataStorageConverterPage;
