import axios from 'axios';
import { apiConfig } from '../../config/apiConfig';
import { getConfig } from '../../config/yamlConfigAccessor';
import { handleApiError } from './errorHandler';

// Initialize axios instance safely without throwing at frontend import time
const axiosClient = axios.create();

// Validate and apply configuration at the exact moment an API call is made
axiosClient.interceptors.request.use(
  (config) => {
    // When an API call is made, strictly validate that baseUrl exists in YAML
    const targetBaseUrl = getConfig('api.baseUrl', true);
    config.baseURL = targetBaseUrl;

    const timeoutVal = getConfig('api.timeout', false);
    if (timeoutVal && !config.timeout) {
      config.timeout = parseInt(timeoutVal, 10);
    }

    const defaultHeaders = getConfig('api.headers', false);
    if (defaultHeaders) {
      config.headers = { ...defaultHeaders, ...config.headers };
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
      getConfig('api.apiToken', false);

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
