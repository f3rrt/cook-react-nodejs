import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from 'store';
import { getAllRecipes } from 'store/slices/recipeSlice';

const useGetRecipes = () => {
   const dispatch = useDispatch<AppDispatch>();
   const recipe = useSelector((state: RootState) => state.recipe);

   const { recipes, loading, error } = recipe;

   const getRecipes = useCallback(async () => {
      const response = await dispatch(getAllRecipes());
      return response.payload;
   }, [dispatch]);

   return { getRecipes, recipes, loading, error };
};

export default useGetRecipes;