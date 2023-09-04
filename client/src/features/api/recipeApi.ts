import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMutateRecipe, IRecipe, IRecipeResponse } from "../types/index";
import NProgress from "nprogress";

const BASEURL = "http://localhost:8000/api/recipes";

export const recipeAPI = createApi({
  reducerPath: "recipeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  tagTypes: ["Recipes"],
  endpoints: (builder) => ({
    createRecipe: builder.mutation<IRecipeResponse, IMutateRecipe>({
      query(recipe) {
        return {
          url: "/",
          method: "POST",
          credentials: "include",
          body: recipe,
        };
      },
      invalidatesTags: [{ type: "Recipes", id: "LIST" }],
      transformResponse: (result: { recipe: IRecipeResponse }) => result.recipe,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
    updateRecipe: builder.mutation<
      IRecipeResponse,
      { id: string; recipe: IMutateRecipe }
    >({
      query({ id, recipe }) {
        return {
          url: `/${id}`,
          method: "PATCH",
          credentials: "include",
          body: recipe,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Recipes", id },
              { type: "Recipes", id: "LIST" },
            ]
          : [{ type: "Recipes", id: "LIST" }],
      transformResponse: (response: { recipe: IRecipeResponse }) =>
        response.recipe,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
    getRecipe: builder.query<IRecipeResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
          credentials: "include",
        };
      },
      providesTags: (result, error, id) => [{ type: "Recipes", id }],
    }),
    getAllRecipes: builder.query<IRecipe[], { page: number; limit: number }>({
      query({ page, limit }) {
        return {
          url: `/?page=${page}&limit=${limit}`,
          credentials: "include",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Recipes" as const,
                id,
              })),
              { type: "Recipes", id: "LIST" },
            ]
          : [{ type: "Recipes", id: "LIST" }],
      transformResponse: (results: { recipes: IRecipe[] }) => results.recipes,
      onQueryStarted(arg, api) {
        NProgress.start();
      },
      keepUnusedDataFor: 5,
    }),
    deleteRecipe: builder.mutation<IRecipeResponse, string>({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
          credentials: "include",
        };
      },
      invalidatesTags: [{ type: "Recipes", id: "LIST" }],
      onQueryStarted(arg, api) {
        NProgress.start();
      },
    }),
  }),
});

export const {
  useCreateRecipeMutation,
  useDeleteRecipeMutation,
  useUpdateRecipeMutation,
  useGetAllRecipesQuery,
} = recipeAPI;
