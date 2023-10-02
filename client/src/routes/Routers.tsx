/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLoading from 'components/pageLoading/PageLoading';
import Page from 'components/wrapper/Wrapper';

import paths from 'routes/paths';
import AuthMiddleware from 'helpers/AuthMiddleware';

const Home = lazy(() => import('pages/home/Home'));
const PageNotFound = lazy(() => import('pages/page-not-found/PageNotFound'));
const Registration = lazy(() => import('pages/registration/Registration'));
const LogIn = lazy(() => import('pages/log-in/LogIn'));
const Profile = lazy(() => import('pages/profile/Profile'));
const AddRecipe = lazy(() => import('pages/add-recipe/AddRecipe'));
const EditRecipe = lazy(() => import('pages/edit-recipe/EditRecipe'));
const Recipes = lazy(() => import('pages/recipes/Recipes'));
const Recipe = lazy(() => import('pages/recipe/Recipe'));
const LogOut = lazy(() => import('pages/log-out/LogOut'));

interface Routes {
   path: string;
   element: React.ReactNode;
}

const getRouteElement = (Component: React.ElementType, isProtected?: boolean): React.ReactNode => {
   return (
      <Suspense fallback={<PageLoading />}>
         <Page>
            {isProtected ? (
               <AuthMiddleware>
                  <Component />
               </AuthMiddleware>
            ) : (
               <Component />
            )}
         </Page>
      </Suspense>
   );
};

const routes: Routes[] = [
   { path: paths.HOME, element: getRouteElement(Home) },
   { path: paths.DEFAULT, element: getRouteElement(Home) },
   { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
   { path: paths.REGISTRATION, element: getRouteElement(Registration) },
   { path: paths.LOGIN, element: getRouteElement(LogIn) },
   { path: paths.PROFILE, element: getRouteElement(Profile, true) },
   { path: paths.CREATE_RECIPE, element: getRouteElement(AddRecipe, true) },
   { path: paths.EDIT_RECIPE, element: getRouteElement(EditRecipe, true) },
   { path: paths.RECIPES, element: getRouteElement(Recipes, true) },
   { path: paths.RECIPE, element: getRouteElement(Recipe, true) },
   { path: paths.LOGOUT, element: getRouteElement(LogOut, true) },
];


export default createBrowserRouter(routes);
