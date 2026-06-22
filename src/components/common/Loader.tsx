export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
        {/* Spinning gradient ring */}
        <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent animate-spin"></div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
        Loading data...
      </p>
    </div>
  );
}