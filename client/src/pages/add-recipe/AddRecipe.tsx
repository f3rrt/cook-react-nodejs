/* eslint-disable no-debugger */
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddRecipe.scss';
import { useState, useEffect } from 'react';
import DataLoadingWrapper from 'components/dataLoadingWrapper/DataLoadingWrapper';
import { useUploadImageMutation } from 'redux/api/upload/upload.api';
import { useCreateRecipeMutation, useGetRecipesListQuery } from 'redux/api/recipe/recipe.api';
import IngredientsSelect from 'components/ingredientsSelect/IngredientsSelect';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Ingredient } from 'types';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
   const [recipeForm, setRecipeForm] = useState({
      title: '',
      description: '',
      ingredients: [],
      instructions: '',
   });
   const navigate = useNavigate();
   const fetchRecipes = useGetRecipesListQuery();
   const [uploadImage, { isLoading: isImageLoading, error: uploadError }] =
      useUploadImageMutation();
   const [preview, setPreview] = useState('');
   const [image, setImage] = useState();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<FetchBaseQueryError | SerializedError>();
   const [selectedIngrts, setSelectedIngrts] = useState<Ingredient[]>([]);
   const [createRecipe, { isLoading: isRecipeLoading, error: createRecipeError, isSuccess }] =
      useCreateRecipeMutation();

   useEffect(() => {
      setIsLoading(isRecipeLoading || isImageLoading);
   }, [uploadError, createRecipeError, isRecipeLoading, isImageLoading]);

   useEffect(() => {
      if (createRecipeError) {
         setError(createRecipeError);
      }
      if (uploadError) {
         setError(uploadError);
      }
   }, [createRecipeError, uploadError]);

   const handleChange = (event: { target: { name: any; value: any } }) => {
      const { name, value } = event.target;
      setRecipeForm((prevFormData) => ({ ...prevFormData, [name]: value }));
   };
   const handleSubmit = async (event: any) => {
      event.preventDefault();
      const formData = new FormData();
      if (image) {
         formData.append('file', image);
         const imageData: any = await uploadImage(formData);
         const recipe = {
            ...recipeForm,
            ingredients: selectedIngrts.map((el: any) => {
               return { _id: el._id, quantity: el.quantity, unit: el.unit };
            }),
            imageUrl: imageData?.data.url,
         };
         await createRecipe(recipe);
         await fetchRecipes.refetch();
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
                     <h1>Add Recipe</h1>
                  </header>
               </Row>
               <Row>
                  <Form onSubmit={handleSubmit}>
                     <br />
                     <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                           type="file"
                           size="lg"
                           name="image"
                           onChange={handleImageChange}
                        />
                     </Form.Group>
                     <div>
                        <img className="image" src={preview} />
                     </div>
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

export default AddRecipe;
