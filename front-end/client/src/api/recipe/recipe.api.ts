import {
   RecipeService as IRecipeService,
   GetAllRecipesResponse,
} from 'api/recipe/recipe.model';

import httpClient from 'common/http/httpClient';

const RecipeService = (): IRecipeService => {
   return {
      getAllRecipes: (): HttpPromise<GetAllRecipesResponse> => {
         return httpClient.get('/recipes');
      },
   };
};

export default RecipeService();
