import axios from 'axios';
import { apiConfig } from '../../config/apiConfig';
import { handleApiError } from './errorHandler';

// Initialize axios instance safely without throwing at frontend import time
const axiosClient = axios.create();

// Validate and apply configuration at the exact moment an API call is made
axiosClient.interceptors.request.use(
  (config) => {
    // Set base URL from apiConfig
    if (apiConfig.baseUrl) {
      config.baseURL = apiConfig.baseUrl;
    }

    if (apiConfig.timeout && !config.timeout) {
      config.timeout = apiConfig.timeout;
    }

    if (apiConfig.headers) {
      config.headers = { ...apiConfig.headers, ...config.headers };
    }

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

    // Attach X-API-TOKEN for Front and general API endpoints if not already provided
    const frontApiToken =
      config.headers['X-API-TOKEN'] ||
      (typeof window !== 'undefined' ? localStorage.getItem('api_token') : null) ||
      apiConfig.apiToken;

    if (!config.headers['X-API-TOKEN'] && frontApiToken) {
      config.headers['X-API-TOKEN'] = frontApiToken;
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
