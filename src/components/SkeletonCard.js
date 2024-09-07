const SkeletonCard = () => {
  return (
    <h1 className="text-white w-[30%] p-2 flex items-center justify-center">
      <div class="max-w-sm w-full p-4 bg-black shadow-lg rounded-lg">
        {/* Image Skeleton */}
        <div class="animate-pulse">
          <div class="bg-gray-600 h-40 rounded-md"></div>
        </div>
        {/* Content Skeleton*/}
        <div class="mt-4 space-y-3 animate-pulse">
          {/* Text Lines Skeleton */}
          <div class="space-y-2">
            <div class="h-4 bg-gray-500 rounded w-5/6"></div>
            <div class="h-4 bg-gray-500 rounded w-4/6"></div>
            <div class="h-4 bg-gray-500 rounded w-2/6"></div>
          </div>
        </div>
      </div>
    </h1>
  );
};

export default SkeletonCard;
