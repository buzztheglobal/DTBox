// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust backend
});

// Utility methods
export const fetchData = (endpoint) => API.get(endpoint);
export const postData = (endpoint, data) => API.post(endpoint, data);

// 🟢 Add this
export const fetchTools = async () => {
  const res = await API.get("/menuitems");
  return res.data;
};

export default API;
