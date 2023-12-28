import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareAuthHeaders } from 'common/common';
import { Recipe } from 'types';

const baseUrl = process.env.BASE_SERVER_URL_PREFIX;

export const recipeApi = createApi({
   reducerPath: 'recipeApi',
   baseQuery: fetchBaseQuery({
      baseUrl: baseUrl,
      mode: 'cors',
      prepareHeaders: (headers, { getState }) => {
         prepareAuthHeaders(headers, getState);
      },
   }),
   endpoints: (build) => ({
      getRecipesList: build.query<Recipe[], void>({
         query() {
            return {
               url: `/recipe`,
               method: 'GET',
            };
         },
      }),
      getRecipeById: build.query<Recipe, string>({
         query(id) {
            return {
               url: `/recipe/${id}`,
               method: 'GET',
            };
         },
      }),
      deleteRecipeById: build.query<Recipe, string>({
         query(id) {
            return {
               url: `/recipe/${id}`,
               method: 'DELETE',
            };
         },
      }),
      createRecipe: build.mutation<Recipe, Partial<Recipe>>({
         query(data) {
            return {
               url: 'recipe',
               method: 'POST',
               body: data,
               credentials: 'include',
            };
         },
      }),
      searchRecipe: build.query<any, any>({
         query(data) {
            return {
               url: `recipe/search`,
               method: 'POST',
               body: {
                  data,
               },
            };
         },
      }),
      updateRecipe: build.mutation<Recipe, {recipe: Partial<Recipe>, id: any}>({
         query(data) {
            return {
               url: `/recipe/${data.id}`,
               method: 'PUT',
               body: data.recipe,
               credentials: 'include',
            };
         },
      }),
   }),
});

// export react hook
export const {
   useGetRecipesListQuery,
   useUpdateRecipeMutation,
   useCreateRecipeMutation,
   useGetRecipeByIdQuery,
   useDeleteRecipeByIdQuery,
   useSearchRecipeQuery,
} = recipeApi;
