/* eslint-disable no-debugger */
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './EditRecipe.scss';
import { useState, useEffect } from 'react';
import DataLoadingWrapper from 'components/dataLoadingWrapper/DataLoadingWrapper';
import { useUploadImageMutation } from 'redux/api/upload/upload.api';
import { useGetRecipeByIdQuery, useGetRecipesListQuery, useUpdateRecipeMutation } from 'redux/api/recipe/recipe.api';
import IngredientsSelect from 'components/ingredientsSelect/IngredientsSelect';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useNavigate, useParams } from 'react-router-dom';
import { Ingredient, Recipe, RecipeForm } from 'types';

const EditRecipe = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const {
      isLoading: getRecipeLoading,
      error: getRecipeError,
      data: recipe,
   } = useGetRecipeByIdQuery(id ? id : '');
   const fetchRecipes = useGetRecipesListQuery();
   const fetchRecipeById = useGetRecipeByIdQuery(id ? id : '');
   const [recipeForm, setRecipeForm] = useState<RecipeForm>({
      title: '',
      description: '',
      instructions: '',
   });

   const [uploadImage, { isLoading: isImageLoading, error: uploadError }] =
      useUploadImageMutation();
   const [preview, setPreview] = useState('');
   const [image, setImage] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<FetchBaseQueryError | SerializedError | undefined>();
   const [selectedIngrts, setSelectedIngrts] = useState<Ingredient[]>([]);
   const [updateRecipe, { isLoading: isRecipeLoading, error: updateRecipeError, isSuccess }] =
      useUpdateRecipeMutation();

   useEffect(() => {
      setIsLoading(isRecipeLoading || isImageLoading || getRecipeLoading);
   }, [getRecipeLoading, isRecipeLoading, isImageLoading]);


   useEffect(() => {
      console.log(recipe);
      if (recipe) {
         setRecipeForm({
            title: recipe?.title || '',
            description: recipe?.description || '',
            instructions: recipe?.instructions || '',
         });
         setPreview(recipe?.imageUrl || '');
         setSelectedIngrts(recipe.ingredients);
      }
   }, [recipe]);

   useEffect(() => {
      const error = uploadError || updateRecipeError || getRecipeError;
      if (error) {
         setError(error);
      }
   }, [getRecipeError, uploadError, updateRecipeError]);

   const handleChange = (event: { target: { name: any; value: any } }) => {
      const { name, value } = event.target;
      setRecipeForm((prevFormData) => ({ ...prevFormData, [name]: value }));
   };
   const handleSubmit = async (event: any) => {
      console.log(selectedIngrts);
      event.preventDefault();
      const formData = new FormData();
      if (image) {
         formData.append('file', image);
         const imageData: any = await uploadImage(formData);
         const recipe: Partial<Recipe> = {
            ...recipeForm,
            ingredients: selectedIngrts.map((el: any) => {
               return { _id: el._id, quantity: el.quantity, unit: el.unit };
            }),
            imageUrl: imageData?.data.url,
         };
         await updateRecipe({recipe, id});
         await fetchRecipes.refetch();
         await fetchRecipeById.refetch();
         navigate('/recipes');
      } else {
         const recipe = {
            ...recipeForm,
            ingredients: selectedIngrts.map((el: any) => {
               return { _id: el._id, quantity: el.quantity, unit: el.unit };
            }),
            imageUrl: preview,
         };
         await updateRecipe({recipe, id});
         await fetchRecipes.refetch();
         await fetchRecipeById.refetch();
         navigate('/recipes');
      }
   };

   const handleImageChange = async (event: any) => {
      const file = event.target.files[0];
      setImage(file);

      // File Preview
      const reader: FileReader = new FileReader();
      reader.onload = () => {
         setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
   };

   return (
      <DataLoadingWrapper isLoading={isLoading} error={error} isSuccess={isSuccess}>
         {!isLoading && (
            <>
               <Row>
                  <header>
                     <h1>Edit Recipe</h1>
                  </header>
               </Row>
               <Row>
                  <Form onSubmit={handleSubmit}>
                     <br />
                     <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                           type="input"
                           value={recipeForm.title}
                           placeholder="Enter Title"
                           name="title"
                           onChange={handleChange}
                        />
                     </Form.Group>
                     <div>
                        <img className="image" src={preview} />
                     </div>
                     <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                           type="file"
                           size="lg"
                           name="image"
                           onChange={handleImageChange}
                        />
                     </Form.Group>

                     <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                           type="input"
                           value={recipeForm.description}
                           placeholder="Enter Description"
                           name="description"
                           onChange={handleChange}
                        />
                     </Form.Group>
                     <IngredientsSelect
                        setIsLoading={setIsLoading}
                        setSelectedIngrts={setSelectedIngrts}
                        selectedIngrts={selectedIngrts}
                        setError={setError}
                     />
                     <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control
                           as="textarea"
                           rows={5}
                           value={recipeForm.instructions}
                           name="instructions"
                           onChange={handleChange}
                        />
                     </Form.Group>
                     <Button variant="morden" type="submit">
                        Submit
                     </Button>
                  </Form>
               </Row>
            </>
         )}
      </DataLoadingWrapper>
   );
};

export default EditRecipe;
