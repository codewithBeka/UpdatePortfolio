import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://codewithbeka.onrender.com/api/projects',
        credentials: 'include',
    }),
    tagTypes: ['Project'],
    endpoints: (builder) => ({
        getProjects: builder.query({
            // Accept categoryName, page, and limit as arguments for filtering
            query: ({ categoryName=undefined ,page = 1, limit = 4 }) => {
                const categoryQuery = categoryName ? `categoryName=${encodeURIComponent(categoryName)}` : '';
                const paginationQuery = `page=${page}&limit=${limit}`;
                return `/?${categoryQuery}${categoryQuery ? '&' : ''}${paginationQuery}`;
            },
            providesTags: ['Project'],
        }),
        getProjectById: builder.query({
            query: (id) => `/${id}`,
        }),
         getAllProjects: builder.query({
            query: () => "/all", // Fetches all projects
            providesTags: ["Project"],
          }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetProjectsQuery,
    useGetProjectByIdQuery,
    useGetAllProjectsQuery 
} = projectApi;