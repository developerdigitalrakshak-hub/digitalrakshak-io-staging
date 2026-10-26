import { getApiBaseUrl, getApiTimeout, getApiHeaders, getApiToken, getConfig } from './yamlConfigAccessor';

/**
 * Global API Configuration.
 * Strictly driven by api.config.yml and env variables.
 * No default values or fallback constants are provided.
 */
export const apiConfig = {
  get baseUrl() {
    return getApiBaseUrl();
  },
  get timeout() {
    return getApiTimeout();
  },
  get apiKey() {
    return getConfig('api.apiKey');
  },
  get apiSecret() {
    return getConfig('api.apiSecret');
  },
  get apiToken() {
    return getApiToken();
  },
  get appId() {
    return getConfig('api.appId');
  },
  get clientId() {
    return getConfig('api.clientId');
  },
  get headers() {
    return getApiHeaders();
  },
};

export default apiConfig;
