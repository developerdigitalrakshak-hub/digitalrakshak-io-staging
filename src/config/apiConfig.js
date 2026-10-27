/**
 * Global API Configuration.
 * Directly driven by environment variables (.env).
 */
export const apiConfig = {
  get baseUrl() {
    return process.env.NEXT_PUBLIC_API_BASE_URL || '';
  },
  get timeout() {
    return process.env.NEXT_PUBLIC_API_TIMEOUT
      ? parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT, 10)
      : 30000;
  },
  get apiKey() {
    return process.env.NEXT_PUBLIC_API_KEY || '';
  },
  get apiSecret() {
    return process.env.NEXT_PUBLIC_API_SECRET || '';
  },
  get apiToken() {
    return (
      process.env.NEXT_PUBLIC_X_API_TOKEN ||
      process.env.NEXT_PUBLIC_API_TOKEN ||
      process.env.NEXT_PUBLIC_FRONT_API_TOKEN ||
      ''
    );
  },
  get appId() {
    return process.env.NEXT_PUBLIC_APP_ID || '';
  },
  get clientId() {
    return process.env.NEXT_PUBLIC_CLIENT_ID || '';
  },
  get headers() {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    if (process.env.NEXT_PUBLIC_APP_ID) {
      headers['X-App-ID'] = process.env.NEXT_PUBLIC_APP_ID;
    }
    if (process.env.NEXT_PUBLIC_CLIENT_ID) {
      headers['X-Client-ID'] = process.env.NEXT_PUBLIC_CLIENT_ID;
    }
    const token =
      process.env.NEXT_PUBLIC_X_API_TOKEN ||
      process.env.NEXT_PUBLIC_API_TOKEN ||
      process.env.NEXT_PUBLIC_FRONT_API_TOKEN;
    if (token) {
      headers['X-API-TOKEN'] = token;
    }
    return headers;
  },
};

export default apiConfig;
