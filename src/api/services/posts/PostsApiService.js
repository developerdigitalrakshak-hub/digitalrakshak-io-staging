import BaseApiService from '../base/BaseApiService';

export class PostsApiService extends BaseApiService {
  async getPosts(payload = {}) {
    const { limit = 8, page = 1 } = payload || {};
    return await this.get(`/posts`, {
      params: {
        _limit: limit,
        _page: page,
      },
    });
  }

  async getPostById(payload = {}) {
    const { id } = payload;
    return await this.get(`/posts/${id}`);
  }
}

const postsApiService = new PostsApiService();
export default postsApiService;
