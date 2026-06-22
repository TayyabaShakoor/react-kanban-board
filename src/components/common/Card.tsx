import type { Post } from '../../api/types/post.types';

interface PostCardProps {
  post: Post;
  onDelete?: (id: number) => void;
  onEdit?: (post: Post) => void;
}

export function PostCard({ post, onDelete, onEdit }: PostCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-700">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-linear-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full">
              📝 Post #{post.id}
            </span>
            <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              User {post.userId}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 hover:line-clamp-none transition-all">
            {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </h3>

          {/* Body */}
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {post.body}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onEdit && (
            <button
              onClick={() => onEdit(post)}
              className="p-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              title="Edit"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                if (window.confirm(`Delete post "${post.title}"?`)) {
                  onDelete(post.id);
                }
              }}
              className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Delete"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}