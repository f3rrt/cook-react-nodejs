import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.BASE_SERVER_URL_PREFIX;

export const ingredientApi = createApi({
   reducerPath: 'ingredientApi',
   baseQuery: fetchBaseQuery({
      baseUrl,
      mode: 'cors',
      prepareHeaders: (headers, { getState }: any) => {
         const token = getState().auth.refresh_token;
         if (token) {
            headers.set('authorization', `Bearer ${token}`);
            return headers;
         }
      },
   }),
   endpoints: (build) => ({
      getIngredientsList: build.query<any, void>({
         query() {
            return {
               url: `/ingredient`,
               // credentials: 'include',
               method: 'GET',
            };
         },
      }),
      findIngredientsByIds: build.mutation<any, Partial<any>>({
         query(data) {
            return {
               url: 'ingredient/getbyid',
               method: 'POST',
               body: data,
               credentials: 'include',
            };
         },
      }),
      createIngredient: build.mutation<any, any>({
         query(data) {
            return {
               url: 'ingredient',
               method: 'POST',
               body: data,
               credentials: 'include',
            };
         },
      }),
   }),
});

// export react hook
export const { useFindIngredientsByIdsMutation, useGetIngredientsListQuery, useCreateIngredientMutation } = ingredientApi;
