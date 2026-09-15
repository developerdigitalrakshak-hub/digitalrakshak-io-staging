import axios from 'axios';
import { apiConfig } from '../../config/apiConfig';
import { handleApiError } from './errorHandler';

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  headers: apiConfig.headers,
});

axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    config.headers['X-Request-Timestamp'] = new Date().toISOString();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const formattedError = handleApiError(error);
    return Promise.reject(formattedError);
  }
);

export default axiosClient;
