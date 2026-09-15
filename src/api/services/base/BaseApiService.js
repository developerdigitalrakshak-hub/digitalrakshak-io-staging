import axiosClient from '../../client/axiosClient';

export default class BaseApiService {
  constructor(client = axiosClient) {
    this.client = client;
  }

  async get(url, config = {}) {
    return await this.client.get(url, config);
  }

  async post(url, data = {}, config = {}) {
    return await this.client.post(url, data, config);
  }

  async put(url, data = {}, config = {}) {
    return await this.client.put(url, data, config);
  }

  async delete(url, config = {}) {
    return await this.client.delete(url, config);
  }
}
