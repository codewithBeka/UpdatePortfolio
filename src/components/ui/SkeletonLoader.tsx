"use client";

const SkeletonLoader = () => {
  return (
    <div className="flex flex-wrap items-center justify-center p-6 gap-10 mt-3">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center justify-center sm:w-96 w-[80vw] border border-gray-200 rounded-lg shadow-lg overflow-hidden"
        >
          {/* Image Skeleton */}
          <div className="bg-gray-200 animate-pulse w-full h-[20vh] lg:h-[30vh] mb-4 rounded-lg"></div>

          {/* Title Skeleton */}
          <div className="bg-gray-200 animate-pulse h-6 w-3/4 rounded-md mb-2"></div>

          {/* Description Skeleton */}
          <div className="bg-gray-200 animate-pulse h-4 w-1/2 rounded-md mb-4"></div>

          {/* Technology Icons Skeleton */}
          <div className="flex items-center justify-between w-full px-4 mb-3">
            <div className="flex items-center">
              {Array.from({ length: 3 }).map((_, techIndex) => (
                <div
                  key={techIndex}
                  className="border border-gray-300 rounded-full bg-gray-100 lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center mr-2"
                >
                  <div className="bg-gray-200 animate-pulse w-8 h-8 rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Read More Skeleton */}
            <div className="bg-gray-200 animate-pulse h-6 w-24 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
