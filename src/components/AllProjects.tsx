"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import SkeletonLoader from "./ui/SkeletonLoader";
import { BentoTilt } from "./ui/BentoTilt";
import { Category, Project } from "@/utils/types";

interface AllProjectsProps {
  categories: Category[];
}

const fetchProjects = async ({
  pageParam = 1,
  activeFilter,
}: {
  pageParam?: number;
  activeFilter: string;
}) => {
  const categoryQuery =
    activeFilter !== "All"
      ? `&categoryName=${encodeURIComponent(activeFilter)}`
      : "";
  const limit = 4;

  const res = await fetch(
    `https://codewithbeka.onrender.com/api/projects?page=${pageParam}&limit=${limit}${categoryQuery}`,
    { credentials: "include" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch projects. Status: ${res.status}`);
  }

  const data = await res.json();
  return { projects: data.projects || [], nextPage: pageParam + 1 };
};

const AllProjects: React.FC<AllProjectsProps> = ({ categories }) => {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects", activeFilter],
    queryFn: ({ pageParam = 1 }) => fetchProjects({ pageParam, activeFilter }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.projects.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1, // Add this line
  });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSeeMore = () => {
    fetchNextPage();
  };

  const projects = data?.pages.flatMap((page) => page.projects) || [];

  return (
    <section className="py-20 z-20" id="projects">
      <h1 className="heading">
        A robust selection of <span className="text-purple">All projects</span>
      </h1>
      <div className="flex flex-wrap justify-center items-center my-16">
        {["All", ...categories.map((category) => category.name)].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleFilterChange(item)}
              className={`flex items-center justify-center p-2 rounded-md dark:border-white/[0.2] text-white font-bold cursor-pointer transition-all duration-300 m-2 
                        ${
                          activeFilter === item
                            ? "bg-indigo-500 text-purple"
                            : "hover:bg-indigo-500 hover:text-purple"
                        }`}
              style={{
                background:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
            >
              {item}
            </div>
          )
        )}
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <div className="flex  flex-wrap items-center justify-center  p-4 gap-14 md:gap-16 mt-3 ">
          {projects.map((project: Project) => (
            <BentoTilt key={project._id} className="relative ">
              <div className="lg:min-h-[32.5rem]  h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]">
                <div className="rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-white/[0.1] p-4 group-hover/pin:border-white/[0.2]   ">
                  <div className="relative flex items-center justify-center sm:w-96 w-[80vw]  overflow-hidden sm:h-[30vh] md:h-[25vh]  h-[30vh] xl:h-[35vh]  mb-10">
                    <Image
                      src={project.media[0]?.url || "/bg.png"}
                      alt="cover"
                      fill
                      style={{ objectFit: "cover" }}
                      className="z-10 absolute bottom-0"
                      loading="lazy"
                    />
                  </div>

                  <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                    {project.title}
                  </h1>
                  <p
                    className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                    style={{ color: "#BEC1DD", margin: "1vh 0" }}
                  >
                    {project.simpleDescription}
                  </p>

                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex justify-center items-center">
                      <Link href={`/project/${project._id}`}>
                        <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                          Read More
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </BentoTilt>
          ))}
        </div>
      )}
      {error && <div className="text-red-500 text-center">{error.message}</div>}
      {projects.length === 0 && !isLoading && (
        <div className="text-center text-gray-500">
          No projects found for this category. Please try a different one.
        </div>
      )}
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSeeMore}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          >
            {isFetchingNextPage ? "Loading..." : "See More"}
          </button>
        </div>
      )}
    </section>
  );
};

export default AllProjects;

// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Category, Project } from "@/utils/types";
// import SkeletonLoader from "./ui/SkeletonLoader";
// import { BentoTilt } from "./ui/BentoTilt";

// interface AllProjectsProps {
//   categories: Category[];
// }

// const AllProjects: React.FC<AllProjectsProps> = ({ categories }) => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [activeFilter, setActiveFilter] = useState<string>("All");
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null); // Error state
//   const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false);

//   const limit = 4; // Number of projects to display per request

//   /**
//    * Fetch projects from the API
//    */
//   const fetchProjects = async (page: number, category: string) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       console.log(
//         `Fetching projects for page ${page} and category: ${category}`
//       ); // Debug log
//       const categoryQuery =
//         category !== "All"
//           ? `&categoryName=${encodeURIComponent(category)}`
//           : "";

//       const res = await fetch(
//         `https://codewithbeka.onrender.com/api/projects?page=${page}&limit=${limit}${categoryQuery}`,
//         {
//           credentials: "include",
//         }
//       );

//       if (!res.ok) {
//         throw new Error(`Failed to fetch projects. Status: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log("API response:", data); // Debug log
//       return data.projects || [];
//     } catch (error) {
//       console.error("Error fetching projects:", error); // Debug log
//       setError("Failed to fetch projects. Please try again ."); // Set error message

//       return [];
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /**
//    * Load projects when the component mounts or the filter changes
//    */
//   // Assuming Project type is already defined in your types
//   useEffect(() => {
//     const loadProjects = async (): Promise<void> => {
//       console.log("Active filter changed:", activeFilter); // Debug log

//       // Fetch projects with the current filter
//       const fetchedProjects: Project[] = await fetchProjects(1, activeFilter);

//       // Sort projects by createdAt (assuming createdAt is in ISO format)
//       const sortedProjects: Project[] = fetchedProjects.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );

//       setProjects(sortedProjects);
//       setCurrentPage(1); // Reset page to 1 when the filter changes
//     };

//     loadProjects().catch((error) => {
//       console.error("Error loading projects:", error); // Handle any errors
//     });
//   }, [activeFilter]);

//   /**
//    * Handle "See More" button click
//    */
//   const handleSeeMore = async () => {
//     const nextPage = currentPage + 1;
//     console.log(`Loading more projects for page ${nextPage}`); // Debug log
//     const newProjects = await fetchProjects(nextPage, activeFilter);
//     setProjects((prev) => [...prev, ...newProjects]); // Append new projects
//     setCurrentPage(nextPage); // Increment the page
//   };

//   /**
//    * Handle category filter change
//    */
//   const handleFilterChange = (filter: string) => {
//     console.log(`Filter changed to: ${filter}`); // Debug log
//     setActiveFilter(filter);
//     setIsLoading(true);
//   };

//   // Loading states
//   // if (isLoading && projects.length === 0) {
//   //   console.log("Loading projects for the first time..."); // Debug log
//   //   return <SkeletonLoader />; // Show loader while fetching projects
//   // }

//   return (
//     <section className="py-20 z-20" id="projects">
//       <h1 className="heading">
//         A robust selection of <span className="text-purple">All projects</span>
//       </h1>
//       <div className="flex flex-wrap justify-center items-center my-16">
//         {["All", ...categories.map((category) => category.name)].map(
//           (item, index) => (
//             <div
//               key={index}
//               onClick={() => handleFilterChange(item)}
//               className={`flex items-center justify-center p-2 rounded-md dark:border-white/[0.2] text-white font-bold cursor-pointer transition-all duration-300 m-2
//                         ${
//                           activeFilter === item
//                             ? "bg-indigo-500 text-purple"
//                             : "hover:bg-indigo-500 hover:text-purple"
//                         }`}
//               style={{
//                 background:
//                   "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
//               }}
//             >
//               {item}
//             </div>
//           )
//         )}
//       </div>

//       {isLoadingProjects && projects.length === 0 ? (
//         <SkeletonLoader />
//       ) : (
//         <div className="flex  flex-wrap items-center justify-center  p-4 gap-14 md:gap-16 mt-3 ">
//           {projects.map((project) => (
//             <BentoTilt key={project._id} className="relative ">
//               <div className="lg:min-h-[32.5rem]  h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]">
//                 <div className="rounded-2xl  shadow-[0_8px_16px_rgb(0_0_0/0.4)] border border-white/[0.1] p-4 group-hover/pin:border-white/[0.2]   ">
//                   <div className="relative flex items-center justify-center sm:w-96 w-[80vw]  overflow-hidden sm:h-[30vh] md:h-[25vh]  h-[30vh] xl:h-[35vh]  mb-10">
//                     <div
//                       className="relative w-full h-full  overflow-hidden lg:rounded-3xl"
//                       style={{ backgroundColor: "#13162D" }}
//                     >
//                       <Image
//                         src="/bg.png"
//                         alt="background"
//                         fill={true} // Use fill to allow the image to fill the parent
//                         style={{ objectFit: "cover" }} // Control the object fit with CSS
//                         className="z-0"
//                         loading="lazy"
//                       />
//                     </div>

//                     <Image
//                       src={project.media[0]?.url || "/bg.png"}
//                       alt="cover"
//                       fill // Use fill to allow the image to fill the parent
//                       style={{ objectFit: "cover", opacity: 0 }} // Control the object fit with CSS
//                       className="z-10 absolute bottom-0"
//                       loading="lazy"
//                       onLoad={(e) => {
//                         const target = e.currentTarget;
//                         target.style.opacity = "1"; // Fade in effect
//                       }}
//                     />
//                   </div>

//                   <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
//                     {project.title}
//                   </h1>
//                   <p
//                     className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
//                     style={{ color: "#BEC1DD", margin: "1vh 0" }}
//                   >
//                     {project.simpleDescription}
//                   </p>

//                   <div className="flex items-center justify-between mt-7 mb-3">
//                     <div className="flex items-center">
//                       {project.technologies.map((tech, index) => (
//                         <div
//                           key={index}
//                           className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
//                         >
//                           <Image
//                             src={tech.image}
//                             alt={`Icon ${index + 1}`}
//                             width={40}
//                             height={40}
//                             style={{
//                               objectFit: "cover",
//                               width: "auto",
//                               height: "auto",
//                             }}
//                             loading="lazy"
//                             className="p-2"
//                           />
//                         </div>
//                       ))}
//                     </div>

//                     <div className="flex justify-center items-center">
//                       <Link href={`/project/${project._id}`}>
//                         <p className="flex lg:text-xl md:text-xs text-sm text-purple">
//                           Read More
//                         </p>
//                         {/* <FaLocationArrow className="ms-3" color="#CBACF9" /> */}
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </BentoTilt>
//           ))}
//         </div>
//       )}
//       {/* {isLoadingProjects && projects.length === 0 && <SkeletonLoader />} */}
//       {error && <div className="text-red-500 text-center">{error}</div>}
//       {/* Display error message */}
//       {projects.length === 0 && !isLoading && !error && (
//         <div className="text-center text-gray-500">
//           No projects found for this category. Please try a different one.
//         </div>
//       )}
//       {projects.length > 0 && projects.length % limit === 0 && (
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handleSeeMore}
//             className="px-4 py-2 bg-indigo-500 text-white rounded-md"
//           >
//             See More
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default AllProjects;
