import { getApiBaseUrl, getApiTimeout, getApiHeaders, getConfig } from './yamlConfigAccessor';

export const apiConfig = {
  baseUrl: getApiBaseUrl(),
  timeout: getApiTimeout(),
  apiKey: getConfig('api.apiKey', process.env.NEXT_PUBLIC_API_KEY || 'your_uat_api_key'),
  apiSecret: getConfig('api.apiSecret', process.env.NEXT_PUBLIC_API_SECRET || 'your_uat_api_secret'),
  appId: getConfig('api.appId', 'digitalrakshak_app'),
  clientId: getConfig('api.clientId', 'digitalrakshak_client'),
  headers: getApiHeaders(),
};

export default apiConfig;

