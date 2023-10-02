import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = 'http://localhost:3000';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.access_token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
        return headers
      }
    },
  }),
  endpoints:
   (build) => ({
    getUserInfo: build.query<any, void>({
      query() {
        return {
          url: `/user`,
          credentials: 'include',
          method: 'GET',
        };
      },
    }),
  }),
})

// export react hook
export const { useGetUserInfoQuery } = userApi;