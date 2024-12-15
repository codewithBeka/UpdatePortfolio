// src/features/testimonialsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const testimonialsApi = createApi({
  reducerPath: 'testimonialsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://codewithbeka.onrender.com/api/testimonials' , credentials: 'include',}),
  tagTypes: ['Testimonial'],
  endpoints: (builder) => ({
    getAllTestimonials: builder.query({
      query: () => '/',
      providesTags: ['Testimonial'],
    }),

   
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAllTestimonialsQuery,
} = testimonialsApi;

// Export the reducer to be included in the store
export default testimonialsApi.reducer;