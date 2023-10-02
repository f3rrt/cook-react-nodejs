/* eslint-disable no-debugger */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl ='https://recipe-95hi.onrender.com/'

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    mode: "cors", 
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().auth.refresh_token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
        return headers
      }
    },
  }),
  endpoints:
   (build) => ({
    uploadImage: build.mutation<any, any>({
      query(data) {
         return {
            url: 'upload',
            method: 'POST',
            body: data,
         };
      },
      transformResponse: (response: any) => {
        console.log(response);
        return response
      }
        
   }),
  }),
})

// export react hook
export const { useUploadImageMutation } = uploadApi;
