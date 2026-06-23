import { apiClient } from '../client';
import type { Post } from '../types/post.types';
import type { PaginatedResponse, PaginationParams } from '../types/pagination.types';
import { buildQueryString } from '../../utils/queryParams';

export const postsApi = {
  /**
   * GET posts with pagination
   */
  getPosts: async (params: PaginationParams): Promise<PaginatedResponse<Post>> => {
    const queryString = buildQueryString({
      _page: params.page,
      _limit: params.limit,
      q: params.search || undefined,
      _sort: params.sortBy || undefined,
      _order: params.sortOrder || undefined,
    });

    const response = await apiClient.get<Post[]>(`/posts${queryString}`);
    
    const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
    const totalPages = Math.ceil(totalCount / params.limit);
    
    return {
      data: response.data,
      totalCount,
      currentPage: params.page,
      totalPages,
      hasNextPage: params.page < totalPages,
      hasPrevPage: params.page > 1,
      limit: params.limit,
    };
  },

  /**
   * GET single post by ID
   */
  getPostById: async (id: number): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  /**
   * ✅ CREATE new post
   */
  createPost: async (payload: { userId: number; title: string; body: string }): Promise<Post> => {
    const response = await apiClient.post<Post>('/posts', payload);
    return response.data;
  },

  /**
   * ✅ UPDATE existing post
   */
  updatePost: async ({ id, ...payload }: { id: number; userId?: number; title?: string; body?: string }): Promise<Post> => {
    const response = await apiClient.put<Post>(`/posts/${id}`, payload);
    return response.data;
  },

  /**
   * ✅ DELETE post
   */
  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },

  /**
   * Search posts with pagination
   */
  searchPosts: async (searchTerm: string, page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> => {
    const queryString = buildQueryString({
      q: searchTerm,
      _page: page,
      _limit: limit,
    });

    const response = await apiClient.get<Post[]>(`/posts${queryString}`);
    const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      data: response.data,
      totalCount,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      limit,
    };
  },
};