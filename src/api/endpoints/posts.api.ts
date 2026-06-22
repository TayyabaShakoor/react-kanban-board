import { apiClient } from '../client';
import type { Post, PostCreatePayload, PostUpdatePayload } from '../types/post.types';

export const postsApi = {
  // GET all posts
  getPosts: async (): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>('/posts?_limit=12');
    return response.data;
  },

  // GET single post by ID
  getPostById: async (id: number): Promise<Post> => {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  // CREATE new post
  createPost: async (payload: PostCreatePayload): Promise<Post> => {
    const response = await apiClient.post<Post>('/posts', payload);
    return response.data;
  },

  // UPDATE existing post
  updatePost: async ({ id, ...payload }: PostUpdatePayload): Promise<Post> => {
    const response = await apiClient.put<Post>(`/posts/${id}`, payload);
    return response.data;
  },

  // DELETE post
  deletePost: async (id: number): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};