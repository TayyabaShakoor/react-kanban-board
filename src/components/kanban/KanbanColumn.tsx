import type { ReactNode } from 'react';

interface KanbanColumnProps {
  title: string;
  icon: string;
  count: number;
  color?: 'blue' | 'purple' | 'pink' | 'green';
  children: ReactNode;
}

const colorClasses = {
  blue: 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10',
  purple: 'border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/10',
  pink: 'border-pink-300 dark:border-pink-700 bg-pink-50/50 dark:bg-pink-900/10',
  green: 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10',
};

export function KanbanColumn({ 
  title, 
  icon, 
  count, 
  color = 'blue', 
  children 
}: KanbanColumnProps) {
  return (
    <div className={`rounded-2xl border-2 ${colorClasses[color]} p-4 transition-all duration-300 hover:shadow-xl`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-bold bg-white/80 dark:bg-gray-800/80 rounded-full text-gray-700 dark:text-gray-300 shadow-sm">
          {count}
        </span>
      </div>

      {/* Column Content */}
      <div className="space-y-3 max-h-150 overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
}