import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { useCreateIngredientMutation } from 'redux/api/ingredient/ingredient.api';

const IngredientModal = (props: any) => {
   const [createIngredient, { isSuccess }] = useCreateIngredientMutation();
   const [formData, setFormData] = useState({ title: '', description: '' });
   const handleChange = (event: { target: { name: any; value: any } }) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
   };
   const handleClose = () => props.setShow(false);
   const createNewIngredient = async () => {
      const ing: any = await createIngredient(formData);
      props.setIngredientsOptions((old: any) => {
         const formatedIngredient = { value: ing.data._id, label: ing.data.title };
         return [formatedIngredient, ...old];
      });
      setFormData({ title: '', description: '' })
   };

   useEffect(() => {
      if (isSuccess) {
         props.setShow(false);
      }
   }, [isSuccess]);

   return (
      <>
         <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Create new ingredient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Title</Form.Label>
                     <Form.Control
                        required
                        type="input"
                        autoFocus
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                     />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Description</Form.Label>
                     <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                     />
                  </Form.Group>
               </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
               <Button variant="morden" type="submit" onClick={createNewIngredient}>
                  Create
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default IngredientModal;
