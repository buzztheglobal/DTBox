// src/components/common/RouteWrapper.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const RouteWrapper = ({ children }) => {
  const params = useParams();
  return children(params);
};

export default RouteWrapper;