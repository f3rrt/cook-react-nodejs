import { useEffect, useState } from 'react';
import './Registration.scss';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from 'redux/api/auth/auth.api';
import DataLoadingWrapper from 'components/dataLoadingWrapper/DataLoadingWrapper';

function Registration() {
   const [validated, setValidated] = useState(false);
   const [formData, setFormData] = useState({ email: '', name: '', password: '' });
   const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterUserMutation();
   const navigate = useNavigate();
   const handleChange = (event: { target: { name: any; value: any } }) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
   };
   const handleSubmit = async (event: any) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.preventDefault();
         event.stopPropagation();
      }
      setValidated(true);
      event.preventDefault();
      registerUser(formData);
   };

   useEffect(() => {
      if (isError) {
         navigate('/home');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLoading]);

   return (
      <DataLoadingWrapper isLoading={isLoading} error={error}>
         {isSuccess ? (
            <Alert variant="success">
               You successfully registered! {' '}
               <Alert.Link href="#">Log In</Alert.Link>
            </Alert>
         ) : (
            <>
               <h1>Registration </h1>
               <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicName">
                     <Form.Label>Name</Form.Label>
                     <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                     />
                     <Form.Control.Feedback type="invalid">
                        Please provide your name.
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control
                        value={formData.email}
                        placeholder="Enter email"
                        name="email"
                        onChange={handleChange}
                     />
                     <Form.Control.Feedback type="invalid">
                        Please provide your email.
                     </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                     />
                     <Form.Control.Feedback type="invalid">
                        Please provide password.
                     </Form.Control.Feedback>
                  </Form.Group>
                  <Button variant="morden" type="submit">
                     Submit
                  </Button>
               </Form>
            </>
         )}
      </DataLoadingWrapper>
   );
}

export default Registration;
