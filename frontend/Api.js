import axios from "axios";
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002"
    : "http://13.211.175.247:5002";

const apiInstance = axios.create({
  baseURL: API_URL,
});

apiInstance.interceptors.request.use(
  (config) => {
    
    return config;
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => {
    console.log(response, 'response from axios');

    return response;
  },
  (error) => {
    console.log(error,'errrrrrrrrrrrrrrrrr');
    return Promise.reject(error);
    
  }
);

export default apiInstance;
