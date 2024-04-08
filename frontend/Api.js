import axios from "axios";
const apiInstance = axios.create({
  baseURL: "www.anisha.shop",
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
    console.log(response, 'repone fromio');

    return response;
  },
  (error) => {
    console.log(error,'errrrrrrrrrrrrrrrrr');
    return Promise.reject(error);
    
  }
);

export default apiInstance;
