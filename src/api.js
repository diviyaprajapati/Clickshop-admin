import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const API = axios.create({
  baseURL: 'https://clickshop-6ul3.onrender.com/api/products'
    
});

// 📤 Request Logger
API.interceptors.request.use((config) => {
  console.log("📤 Sending Request:", config.method.toUpperCase(), config.url);
  return config;
});

// ✅ Response Logger with detailed error
API.interceptors.response.use(
  (response) => {
    console.log("✅ Response Data:", response.data);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.response?.data || error.message;

    console.error(`❌ API Error (Status: ${status}): ${message}`);
    return Promise.reject(error);
  }
);

export default API;
