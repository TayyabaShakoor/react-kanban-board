import { apiClient } from '../client';
import type { Post } from '../types/post.types';
import type { PaginatedResponse, PaginationParams } from '../types/pagination.types';
import { buildQueryString } from '../../utils/queryParams';

export const postsApi = {
  // GET posts with pagination - Local Server
  getPosts: async (params: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const queryString = buildQueryString({
      _page: params.page,
      _limit: params.limit,
      q: params.search || undefined,
      _sort: params.sortBy || undefined,
      _order: params.sortOrder || undefined,
    });

    // ✅ Local endpoint - Response directly matches PaginatedResponse
    const response = await apiClient.get<PaginatedResponse<Post>>(`/data${queryString}`);
    return response.data;
  },

  // GET single post - Local Server
  getPostById: async (id: number): Promise<Post> => {
    const response = await apiClient.get<Post>(`/data/${id}`);
    return response.data;
  },

  // CREATE post - Local Server (Mock)
  createPost: async (payload: { userId: number; title: string; body: string }): Promise<Post> => {
    const response = await apiClient.post<Post>('/data', payload);
    return response.data;
  },

  // UPDATE post - Local Server (Mock)
  updatePost: async ({ id, ...payload }: { id: number; userId?: number; title?: string; body?: string }): Promise<Post> => {
    const response = await apiClient.put<Post>(`/data/${id}`, payload);
    return response.data;
  },

  // DELETE post - Local Server (Mock)
  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(`/data/${id}`);
  },
};