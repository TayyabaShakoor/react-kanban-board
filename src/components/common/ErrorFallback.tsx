interface ErrorFallbackProps {
  error: Error | null;
  reset?: () => void;
}

export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-200 dark:border-red-800 shadow-lg max-w-md mx-auto">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-bold text-red-700 dark:text-red-400">
        Failed to Load Data
      </h3>
      <p className="text-sm text-red-600 dark:text-red-300 mt-2 text-center">
        {error?.message || 'Something went wrong while fetching data'}
      </p>
      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
        Please try again later
      </p>
      {reset && (
        <button
          onClick={reset}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          🔄 Retry
        </button>
      )}
    </div>
  );
}