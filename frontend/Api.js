import axios from "axios";
const apiInstance = axios.create({
  baseURL: "http://localhost:3002",
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
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
