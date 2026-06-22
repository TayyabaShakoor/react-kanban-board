import { usePosts, useDeletePost } from '../../hooks/usePosts';
import { Loader } from '../common/Loader';
import { ErrorFallback } from '../common/ErrorFallback';
import { PostCard } from '../common/Card';
import { useState } from 'react';
import type { Post } from '../../api/types/post.types'; // ✅ Import Post type

export function KanbanBoard() {
  const { data: posts, isLoading, isError, error, refetch } = usePosts();
  const deletePostMutation = useDeletePost();
  const [searchTerm, setSearchTerm] = useState('');

  // ============================================
  // 3-STATE HANDLING: Pending, Error, Success
  // ============================================

  // State 1: Loading
  if (isLoading) {
    return (
      <div className="min-h-100 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // State 2: Error
  if (isError) {
    return (
      <div className="min-h-100 flex items-center justify-center p-4">
        <ErrorFallback error={error as Error} reset={refetch} />
      </div>
    );
  }

  // State 3: Success - but empty data
  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-100 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-7xl mb-4">📭</div>
        <h3 className="text-xl font-semibold">No Posts Found</h3>
        <p className="text-sm mt-1">Try refreshing the page</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          🔄 Refresh
        </button>
      </div>
    );
  }

  // Filter posts by search - ✅ Added proper type for 'post'
  const filteredPosts = posts.filter((post: Post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // State 3: Success with data
  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📋 Posts Board
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>

      {/* Posts Grid - ✅ Added proper type for 'post' */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-lg">No posts match your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: Post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={(id: number) => deletePostMutation.mutate(id)} // ✅ Added type
            />
          ))}
        </div>
      )}
    </div>
  );
}