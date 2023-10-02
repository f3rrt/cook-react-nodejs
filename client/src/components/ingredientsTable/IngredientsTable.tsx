import Table from 'react-bootstrap/Table';
import { useFindIngredientsByIdsMutation } from 'redux/api/ingredient/ingredient.api';
import { useEffect, useState } from 'react';

const IngredientsTable = ({ ing }: any) => {
   const [ingredients, setIngrediets] = useState<any>([]);
   const [findIngredientsByIds] = useFindIngredientsByIdsMutation(ing);

   useEffect(() => {
      async function fetchData() {
         const ingredients: any = await findIngredientsByIds(ing.map((el: any) => el._id));
         if (!ingredients.error && ingredients?.data) {
            setIngrediets(
               ingredients.data.map((el: any) => {
                  return { ...el, ...ing.find((eel: any) => eel._id === el._id) };
               }),
            );
         }
      }
      fetchData();
   }, [ing]);

   return (
      <>
         {ingredients.length > 0 && (
            <>
               <h5>Ingredients: </h5>
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                     </tr>
                  </thead>
                  <tbody>
                     {ingredients?.map((el: any, i: number) => (
                        <tr key={i}>
                           <td>{i + 1}</td> <td>{el.title}</td>
                           <td>{el.unit}</td>
                           <td>{el.quantity}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            </>
         )}
      </>
   );
};

export default IngredientsTable;
