import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://codewithbeka.onrender.com/api/categories', credentials: 'include' }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => '/',
        }),

    }),
});

export const {
    useGetCategoriesQuery,
} = categoryApi;