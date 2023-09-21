import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';

import { recipeApi } from 'redux/api/recipe/recipe.api';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const SearchModal = (props: any) => {
   const [query, setQuery] = useState(props?.value);

   const [trigger, { data }] = recipeApi.endpoints.searchRecipe.useLazyQuery();
   //const [results, setResults] = useState([]);

   const handleChange = async (event: { target: { name: any; value: any } }) => {
      const newQuery = event.target.value;
      setQuery(newQuery);
      await trigger(newQuery);
      console.log(data);
   };

   const handleClose = () => props.setShow(false);

   useEffect(() => {
      setQuery(props.value);
   }, [props.value]);

   return (
      <>
         <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                     <Form.Label>Search</Form.Label>
                     <Form.Control
                        required
                        type="input"
                        autoFocus
                        name="search"
                        onChange={handleChange}
                        value={query}
                     />
                  </Form.Group>
               </Form>
               <ListGroup>
                  {data && data.length > 0
                     ? data.map((el: any) => (
                          <ListGroup.Item action variant="morden">

                             <Link to={`/recipe/${el._id}`} onClick={handleClose}>
                                <b>{el.title}</b>
                             </Link>
                             <div>{el.description}</div>
                          </ListGroup.Item>
                       ))
                     : 'No Results'}
               </ListGroup>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
};

export default SearchModal;
