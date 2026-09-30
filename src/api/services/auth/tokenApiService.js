import BaseApiService from '../base/BaseApiService';
import { apiConfig } from '@/config/apiConfig';


export class TokenApiService extends BaseApiService {
  /**
   * Generate Access Token (OAuth 2.0 Client Credentials)
   * POST /v1/oauth/token
   * @param {Object} options Optional custom secret or parameters
   */
  async generateToken(options = {}) {
    const apiSecret = options.apiSecret || apiConfig.apiSecret;
    
    // Using URLSearchParams for application/x-www-form-urlencoded payload
    const payload = new URLSearchParams();
    payload.append('grant_type', options.grantType || 'client_credentials');

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (apiSecret) {
      headers.Authorization = `Bearer ${apiSecret}`;
    }

    const response = await this.post('/v1/oauth/token', payload.toString(), {
      headers,
    });

    if (response && response.access_token && typeof window !== 'undefined') {
      localStorage.setItem('token', response.access_token);
      localStorage.setItem('access_token', response.access_token);
    }

    return response;
  }
}

const tokenApiService = new TokenApiService();
export default tokenApiService;
