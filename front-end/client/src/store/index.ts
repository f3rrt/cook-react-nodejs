import { configureStore } from '@reduxjs/toolkit';

import appReducer from 'store/slices/appSlice';
import recipeReducer from 'store/slices/recipeSlice';

const store = configureStore({
   reducer: {
      app: appReducer,
      recipe: recipeReducer
   },
});

export type RootState = ReturnType<typeof store.getState>
export default store;