import { usePosts, useDeletePost } from '../../hooks/usePosts';
import { Loader } from '../common/Loader';
import { ErrorFallback } from '../common/ErrorFallback';
import { PostCard } from '../common/Card';
import { Pagination } from '../common/Pagination';
import { useState } from 'react';
import type { Post } from '../../api/types/post.types';

export function KanbanBoard() {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { 
    data: postsData, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = usePosts({ 
    page, 
    limit, 
    search: searchTerm,
    sortBy: 'id',
    sortOrder: 'desc'
  });

  const deletePostMutation = useDeletePost();

  // ✅ Handle search
  const handleSearch = () => {
    if (searchInput.trim()) {
      setSearchTerm(searchInput.trim());
      setPage(1);
    } else {
      // If search is empty, clear search
      clearSearch();
    }
  };

  // ✅ Clear search and reset to page 1
  const clearSearch = () => {
    setSearchInput('');
    setSearchTerm('');
    setPage(1);
  };

  // ✅ Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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

  // State 3: Success - empty
  if (!postsData || postsData.data.length === 0) {
    return (
      <div className="min-h-100 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-7xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold">No Posts Found</h3>
        <p className="text-sm mt-1">
          {searchTerm 
            ? `No results found for "${searchTerm}"` 
            : 'Try adjusting your search or page'}
        </p>
        
        {/* ✅ Back/Reset Button */}
        <div className="flex gap-3 mt-6">
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              🔄 Clear Search & Show All
            </button>
          )}
          <button
            onClick={() => refetch()}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📋 Posts Board
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {searchTerm ? (
              <span>
                Showing results for "<span className="font-semibold text-blue-600 dark:text-blue-400">{searchTerm}</span>" • 
                Page {page} of {postsData.totalPages} • {postsData.totalCount} posts found
              </span>
            ) : (
              <span>
                Page {page} of {postsData.totalPages} • {postsData.totalCount} total posts
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* ✅ Clear Search Button (when search is active) */}
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              ✕ Clear Search
            </button>
          )}
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="🔍 Search posts by title or content..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                if (searchTerm) clearSearch();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
        >
          Search
        </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsData.data.map((post: Post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={(id: number) => deletePostMutation.mutate(id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={postsData.currentPage}
        totalPages={postsData.totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        hasNextPage={postsData.hasNextPage}
        hasPrevPage={postsData.hasPrevPage}
        totalItems={postsData.totalCount}
        itemsPerPage={postsData.limit}
      />
    </div>
  );
}