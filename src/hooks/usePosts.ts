import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsApi } from '../api/endpoints/posts.api';
import type { Post } from '../api/types/post.types';

// Query Keys for caching
const POSTS_QUERY_KEY = ['posts'];

// ============================================
// 1. GET all posts (useQuery)
// ============================================
export function usePosts() {
  return useQuery<Post[]>({
    queryKey: POSTS_QUERY_KEY,
    queryFn: postsApi.getPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

// ============================================
// 2. GET single post (useQuery with enabled)
// ============================================
export function usePost(id: number | null) {
  return useQuery<Post>({
    queryKey: [...POSTS_QUERY_KEY, id],
    queryFn: () => postsApi.getPostById(id!),
    enabled: !!id, // Only run if id exists
    staleTime: 5 * 60 * 1000,
  });
}

// ============================================
// 3. CREATE post (useMutation)
// ============================================
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: (newPost) => {
      // Optimistic update: Add to cache immediately
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (oldData) => {
        return oldData ? [newPost, ...oldData] : [newPost];
      });
      // Or invalidate to refetch from server
      // queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
    },
  });
}

// ============================================
// 4. UPDATE post (useMutation)
// ============================================
export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.updatePost,
    onSuccess: (updatedPost) => {
      // Update cache
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (oldData) => {
        return oldData?.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        ) ?? [];
      });
    },
  });
}

// ============================================
// 5. DELETE post (useMutation)
// ============================================
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.setQueryData<Post[]>(POSTS_QUERY_KEY, (oldData) => {
        return oldData?.filter((post) => post.id !== deletedId) ?? [];
      });
    },
    onError: (error) => {
      console.error('Failed to delete post:', error);
    },
  });
}