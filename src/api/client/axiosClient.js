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
    const isTokenEndpoint = config.url && config.url.includes('/v1/oauth/token');

    if (isTokenEndpoint) {
      if (!config.headers.Authorization && apiConfig.apiSecret) {
        config.headers.Authorization = `Bearer ${apiConfig.apiSecret}`;
      }
    } else {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token') || localStorage.getItem('access_token');
        if (token && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      if (!config.headers.apikey && apiConfig.apiKey) {
        config.headers.apikey = apiConfig.apiKey;
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

