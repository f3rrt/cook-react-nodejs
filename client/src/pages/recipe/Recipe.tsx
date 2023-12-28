import './Recipe.scss';
import {recipeApi, useGetRecipeByIdQuery} from 'redux/api/recipe/recipe.api';
import DataLoadingWrapper from 'components/dataLoadingWrapper/DataLoadingWrapper';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Card} from 'react-bootstrap';
import IngredientsTable from 'components/ingredientsTable/IngredientsTable';

const Recipe = () => {
   const {id} = useParams();
   const navigate = useNavigate();
   const {isLoading, error, data: recipe} = useGetRecipeByIdQuery(id ? id : '');
   const [trigger, {isSuccess}] = recipeApi.endpoints.deleteRecipeById.useLazyQuery();
   const deleteRecipe = () => {
      trigger(id ? id : '');
      navigate('/recipes');
   };
   return (
      <DataLoadingWrapper isLoading={isLoading} error={error} isSuccess={isSuccess}>
         {recipe && (
            <div>
               <Card className="recipe-card-wrapper">
                  <Card.Header className="recipe-header">
                     <div>
                        <h3>{recipe.title}</h3>
                     </div>

                     <div className="recipe-actions">
                        <Button variant="custom" onClick={() => navigate(`/edit-recipe/${id}`)}>
                           Edit
                        </Button>
                        <Button variant="danger" onClick={deleteRecipe}>
                           Delete
                        </Button>
                     </div>
                  </Card.Header>
                  <div className="card-content">
                     <Card.Img className="recipe-image"
                               src={process.env.BASE_SERVER_URL_PREFIX + recipe.imageUrl}/>
                     <Card.Body>
                        <Card.Text>
                           <h5>Description: </h5>
                           {recipe.description}
                        </Card.Text>
                        <IngredientsTable ing={recipe.ingredients}/>
                        <Card.Text>
                           <h5>Instructions: </h5> {recipe.instructions}
                        </Card.Text>
                     </Card.Body>
                  </div>
               </Card>
            </div>
         )}
      </DataLoadingWrapper>
   );
};

export default Recipe;
