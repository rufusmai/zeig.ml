const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex">
      <div className="rounded-lg bg-gray-200 dark:bg-gray-600 h-16 w-16" />
      <div className="ml-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-36" />
        <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded w-72 mt-2" />
      </div>
      <div className="ml-auto flex-none text-right">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-28" />
        <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded w-10 mt-2 ml-auto" />
      </div>
    </div>
    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-28 mt-2" />
  </div>
)

export default LoadingSkeleton
