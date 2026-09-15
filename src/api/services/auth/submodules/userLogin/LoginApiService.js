import BaseApiService from '../../../base/BaseApiService';

export class LoginApiService extends BaseApiService {
  async login(payload = {}) {
    const { email } = payload || {};
    const users = await this.get('/users', {
      params: { _limit: 1 },
    });
    
    const user = users[0] || { id: 1, name: 'John Doe', email: 'admin@company.com' };

    return {
      token: `axios-jwt-bearer-${Date.now()}`,
      user: {
        id: user.id,
        name: user.name,
        email: email || user.email,
        role: 'Administrator',
      },
    };
  }
}

const loginApiService = new LoginApiService();
export default loginApiService;
