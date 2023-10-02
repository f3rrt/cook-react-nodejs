import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authApi } from './api/auth/auth.api';
import { recipeApi } from './api/recipe/recipe.api';
import authReducer from 'redux/features/authSlice'
import { ingredientApi } from './api/ingredient/ingredient.api';
import { uploadApi } from './api/upload/upload.api';


export const store: any = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [recipeApi.reducerPath]: recipeApi.reducer,
      [ingredientApi.reducerPath]: ingredientApi.reducer,
      [uploadApi.reducerPath]: uploadApi.reducer,
      auth: authReducer,
   },
   devTools: true,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([
         authApi.middleware,
         recipeApi.middleware,
         ingredientApi.middleware,
         uploadApi.middleware
      ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
