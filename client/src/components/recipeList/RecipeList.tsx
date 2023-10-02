import './RecipeList.scss';
import RecipeItem from 'components/recipeItem/RecipeItem';
import { useGetRecipesListQuery } from 'redux/api/recipe/recipe.api';
import DataLoadingWrapper from 'components/dataLoadingWrapper/DataLoadingWrapper';

const RecipeList = ({ limit }: any) => {
   const { isLoading, error, data: recipes } = useGetRecipesListQuery();

   return (
      <DataLoadingWrapper isLoading={isLoading} error={error}>
         {recipes &&
            recipes.map((recipe: any, i: number) => {
               if ((limit && i < limit) || !limit)
                  return <RecipeItem key={recipe._id} recipe={recipe} />;
            })}
         {recipes?.length === 0 && <div>No recipes</div>}
      </DataLoadingWrapper>
   );
};

export default RecipeList;
