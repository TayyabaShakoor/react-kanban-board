import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { postsApi } from '../api/endpoints/posts.api';
import type { Post } from '../api/types/post.types';
import type { PaginationParams, PaginatedResponse } from '../api/types/pagination.types';

const POSTS_QUERY_KEY = 'posts';

// ============================================
// GET posts with pagination
// ============================================
export function usePosts(params: PaginationParams) {
  const queryKey = [POSTS_QUERY_KEY, { 
    page: params.page, 
    limit: params.limit,
    search: params.search || '',
    sortBy: params.sortBy || '',
    sortOrder: params.sortOrder || '',
  }];

  return useQuery<PaginatedResponse<Post>>({
    queryKey,
    queryFn: () => postsApi.getPosts(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

// ============================================
// DELETE post
// ============================================
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => postsApi.deletePost(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<PaginatedResponse<Post>>(
        [POSTS_QUERY_KEY], 
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter((post: Post) => post.id !== deletedId),
            totalCount: oldData.totalCount - 1,
          };
        }
      );
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
    },
  });
}

// ============================================
// CREATE post
// ============================================
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { userId: number; title: string; body: string }) => 
      postsApi.createPost(payload),
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData<PaginatedResponse<Post>>(
        [POSTS_QUERY_KEY],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: [newPost, ...oldData.data],
            totalCount: oldData.totalCount + 1,
          };
        }
      );
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });
}

// ============================================
// UPDATE post
// ============================================
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: number; userId?: number; title?: string; body?: string }) => 
      postsApi.updatePost(payload),
    onSuccess: (updatedPost: Post) => {
      queryClient.setQueryData<PaginatedResponse<Post>>(
        [POSTS_QUERY_KEY],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: oldData.data.map((post: Post) =>
              post.id === updatedPost.id ? updatedPost : post
            ),
          };
        }
      );
    },
    onError: (error) => {
      console.error('Failed to update post:', error);
    },
  });
}