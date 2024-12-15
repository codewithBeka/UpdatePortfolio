// store/messagesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://codewithbeka.onrender.com/api/messages', credentials: 'include' }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (newMessage) => ({
        url: '',
        method: 'POST',
        body: newMessage,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = messagesApi;