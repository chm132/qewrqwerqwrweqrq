import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://3.38.228.144:8080/',
    // baseUrl: '',
    prepareHeaders: (headers) => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Lesson', 'Community', 'News', 'Guest', 'User'],
  endpoints: (builder) => ({}),
});
