import type { Post } from '../../api/types/post.types';

interface KanbanItemProps {
  post: Post;
  onDragStart?: (e: React.DragEvent, post: Post) => void;
  onClick?: (post: Post) => void;
}

export function KanbanItem({ post, onDragStart, onClick }: KanbanItemProps) {
  return (
    <div
      draggable={!!onDragStart}
      onDragStart={(e) => onDragStart?.(e, post)}
      onClick={() => onClick?.(post)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h4>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
            {post.body}
          </p>
        </div>
        <span className="shrink-0 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
          #{post.id}
        </span>
      </div>
    </div>
  );
}