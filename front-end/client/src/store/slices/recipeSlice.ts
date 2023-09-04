/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { recipeApi } from 'api/services';

export interface RecipeSlice {
   recipes: any | null;
   loading: boolean;
   error: any;
}

const INITIAL_STATE = {
   recipes: null,
   loading: false,
   error: null,
} as RecipeSlice;

export const getAllRecipes = createAsyncThunk('recipe/getAllRecipes', recipeApi.getAllRecipes);

const recipeSlice = createSlice({
   name: 'recipe',
   initialState: INITIAL_STATE,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllRecipes.pending, (state) => {
            state.loading = true;
         })
         .addCase(getAllRecipes.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.recipes = action.payload.data;
         })
         .addCase(getAllRecipes.rejected, (state, action) => {
            state.loading = false;
            state.recipes = null;
            state.error = action.payload;
         });
   },
});

export default recipeSlice.reducer;