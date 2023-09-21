import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'redux';
//import { getAllRecipes } from 'redux/features/recipeSlice';

const useGetRecipes = () => {
   const dispatch = useDispatch<any>();
   const recipe = useSelector((state: RootState) => state.recipe);

   const { recipes, loading, error } = recipe;

   const getRecipes = useCallback(async () => {
      //const response = await dispatch(getAllRecipes());
      return {};
   }, [dispatch]);

   return { getRecipes, recipes, loading, error };
};

export default useGetRecipes;