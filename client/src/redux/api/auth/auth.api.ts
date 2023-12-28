import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGenericResponse } from 'types';

const baseUrl = process.env.BASE_SERVER_URL_PREFIX;

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({
      baseUrl: `${baseUrl}/auth/`,
   }),

   endpoints: (builder) => ({
      registerUser: builder.mutation<IGenericResponse, any>({
         query(data) {
            return {
               url: 'register',
               method: 'POST',
               body: data,
            };
         },
      }),
      loginUser: builder.mutation<any, any>({
         query(data) {
            return {
               url: 'login',
               method: 'POST',
               body: data,
               credentials: 'include',
            };
         },
      }),
      verifyEmail: builder.mutation<any, any>({
         query({ verificationCode }) {
            return {
               url: `verifyemail/${verificationCode}`,
               method: 'GET',
            };
         },
      }),
      logoutUser: builder.mutation<void, void>({
         query() {
            return {
               url: 'logout',
               credentials: 'include',
            };
         },
      }),
   }),
});

export const {
   useLoginUserMutation,
   useRegisterUserMutation,
   useLogoutUserMutation,
   useVerifyEmailMutation,
} = authApi;
