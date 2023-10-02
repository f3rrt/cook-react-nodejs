// import {
//    IngredientService as IIngredientService,
//    GetAllIngredientsResponse,
// } from 'api/ingredient/ingredient.model';

// import httpClient from 'common/http/httpClient';

// const IngredientService = (): IIngredientService => {
//    return {
//       getAllIngredients: (): HttpPromise<GetAllIngredientsResponse> => {
//          return httpClient.get('/ingredient');
//       },
//    };
// };

// export default IngredientService();

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000/';

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
         //  build.query({
         // query: () => ({
         //   url: '/ingredient',
         //   method: 'GET',
         // }),
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
