import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import './EditRecipe.scss';
import { useEffect, useState } from 'react';
import IngredientModal from 'components/ingredientModal/IngredientModal';
import { useGetIngredientsListQuery } from 'redux/api/ingredient/ingredient.api';
import Select, { MultiValue } from 'react-select';
import { Card } from 'react-bootstrap';
import { useFindIngredientsByIdsMutation } from 'redux/api/ingredient/ingredient.api';
import { Ingredient, IngredientForm } from 'types';

export interface IngredientsSelectProps {
   setSelectedIngrts: React.Dispatch<React.SetStateAction<Ingredient[]>>;
   selectedIngrts: Ingredient[];
   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
   setError: React.Dispatch<React.SetStateAction<any>>;
}

const IngredientsSelect = ({
   setSelectedIngrts,
   selectedIngrts,
   setIsLoading,
   setError,
}: IngredientsSelectProps) => {
   const { isLoading, error, data: allDataIngredients } = useGetIngredientsListQuery();

   const [ingredientsOptions, setIngredientsOptions] = useState([]);
   const [ingredients, setIngredients] = useState<IngredientForm[]>([]);
   const [show, setShow] = useState(false);

   const [findIngredientsByIds] = useFindIngredientsByIdsMutation();
   const [valueQ, setValueQ] = useState<any>([]);

   useEffect(() => {
      if (allDataIngredients) {
         if (selectedIngrts.length !== 0) {
            // eslint-disable-next-line no-inner-declarations
            async function fetchData() {
               const ingredientsData: any = await findIngredientsByIds(
                  selectedIngrts.map((el: Ingredient) => el._id),
               );
               if (!ingredientsData.error && ingredientsData.data.length !== 0) {
                  const foundedArr: IngredientForm[] = ingredientsData.data.map((ing: any) => {
                     const currentIng = selectedIngrts.find(
                        (el: { _id: any }) => el._id === ing._id,
                     );
                     if (currentIng) {
                        return {
                           _id: currentIng?._id,
                           title: ing?.title,
                           quantity: currentIng?.quantity,
                           unit: currentIng?.unit,
                        };
                     }
                  });
                  setIngredients(foundedArr);
                  setValueQ(
                     foundedArr.map((el: any) => {
                        return { value: el._id, label: el.title };
                     }),
                  );
                  setIngredientsOptions(
                     allDataIngredients.map((el: any) => {
                        return { value: el._id, label: el.title };
                     }),
                  );
               }
            }

            fetchData();
         } else {
            setIngredientsOptions(
               allDataIngredients.map((el: any) => {
                  return { value: el._id, label: el.title };
               }),
            );
         }
      }
   }, [allDataIngredients, selectedIngrts]);

   // useEffect(() => {
   // }, []);

   useEffect(() => {
      if (error) {
         setError(error);
      }
   }, [error, setError]);

   useEffect(() => {
      console.log(selectedIngrts);
   }, [selectedIngrts]);

   useEffect(() => {
      if (isLoading) {
         setIsLoading(isLoading);
      }
   }, [isLoading, setIsLoading]);

   const addNewIngredient = async (event: any) => {
      setShow(true);
      event.preventDefault();
   };

   const handleSelectChange = (selectedOptions: MultiValue<{ value: string; label: string }>) => {
      const newIng =
         selectedOptions.length > valueQ.length && selectedOptions[selectedOptions.length - 1];
      console.log(newIng);
      console.log(selectedIngrts);
      if (newIng) {
         setValueQ((current: any) => [newIng, ...current]);
         setIngredients((current: any) => {
            return [
               {
                  _id: newIng?.value,
                  title: newIng?.label,
                  quantity: '',
                  unit: 0,
               },
               ...current,
            ];
         });

         setSelectedIngrts((current: any) => {
            return [
               {
                  _id: newIng?.value,
                  quantity: '',
                  unit: 0,
               },
               ...current,
            ];
         });
      } else {
         setValueQ((current: any) =>
            current.filter((el: any) => selectedOptions.find((elem) => elem.value === el.value)),
         );
         setIngredients((current: any) =>
            current.filter((el: any) => selectedOptions.find((elem) => elem.value === el._id)),
         );

         setSelectedIngrts((current: any) =>
            current.filter((el: any) => selectedOptions.find((elem) => elem.value === el._id)),
         );
      }

      // setIngredients((current: any) => {

      //    return selectedOptions;
      // });
      // current.map((obj: any) => {
      //    const a = ingredientsData.data.find((ing: { _id: any }) => ing._id === obj.id);
      //    if (a) {
      //       console.log({ ...obj, ...a });
      //       return { ...obj, ...a };
      //    }
      //    return obj;
      // }

      // _id: string;
      // title: string;
      // quantity: number;
      // unit: string;
      // setSelectedIngrts({id: });
   };

   const handleIngChange = (event: { target: { name: any; value: any } }, ing: any) => {
      const { name, value } = event.target;

      setIngredients((current: any) =>
         current.map((obj: any) => {
            if (obj._id === ing._id) {
               return { ...obj, [name]: value };
            }
            return obj;
         }),
      );

      setSelectedIngrts((current: any) =>
         current.map((obj: any) => {
            if (obj._id === ing._id) {
               return { ...obj, [name]: value };
            }
            return obj;
         }),
      );
   };

   return (
      <>
         <IngredientModal
            show={show}
            setShow={setShow}
            setIngredientsOptions={setIngredientsOptions}
         />
         <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <Select
               isMulti
               onChange={handleSelectChange}
               name="ingredients"
               value={valueQ}
               // valu={ingredientsOptions.filter((el: any) =>
               //    selectedIngrts.find((ele: any) => ele._id === el.value),
               // )}
               options={ingredientsOptions}
            />
         </Form.Group>
         <Button variant="morden" onClick={addNewIngredient}>
            Add new ingredient
         </Button>
         <div className="ingInfo">
            {ingredients.length !== 0 &&
               ingredients.map((ing: any) => (
                  <Card key={ing._id} style={{ width: '18rem' }}>
                     <Card.Body>
                        <Card.Title>{ing.title}</Card.Title>
                        <Form.Group controlId="formBasicEmail">
                           <Form.Label>Unit</Form.Label>
                           <Form.Control
                              type="number"
                              name="unit"
                              value={ing?.unit}
                              onChange={(e) => handleIngChange(e, ing)}
                           />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                           <Form.Label>Quantity</Form.Label>
                           <Form.Control
                              type="input"
                              placeholder="Enter Quantity"
                              name="quantity"
                              value={ing?.quantity}
                              onChange={(e) => handleIngChange(e, ing)}
                           />
                        </Form.Group>
                     </Card.Body>
                  </Card>
               ))}
         </div>
      </>
   );
};

export default IngredientsSelect;
