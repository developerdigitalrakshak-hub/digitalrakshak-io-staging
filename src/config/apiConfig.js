import { getApiBaseUrl, getApiTimeout, getApiHeaders, getConfig } from './yamlConfigAccessor';

export const apiConfig = {
  baseUrl: getApiBaseUrl(),
  timeout: getApiTimeout(),
  appId: getConfig('api.appId', 'rostering_app_v1'),
  clientId: getConfig('api.clientId', 'rostering_client_987654321'),
  headers: getApiHeaders(),
};

export default apiConfig;
