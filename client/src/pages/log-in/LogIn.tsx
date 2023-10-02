import { useEffect, useState } from 'react';
import './LogIn.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLoginUserMutation } from 'redux/api/auth/auth.api';
import { setCredentials } from 'redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataLoadingWrapper from 'components/dataLoadingWrapper/DataLoadingWrapper';

function LogIn() {
   const [formData, setFormData] = useState({ email: '', password: '' });
   const [validated, setValidated] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [loginUser, { isLoading, error, isSuccess, data: loginData }] = useLoginUserMutation();
   const handleChange = (event: { target: { name: any; value: any } }) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
   };

   const handleSubmit = async (event: {
      currentTarget: any;
      preventDefault: () => void;
      stopPropagation: () => void;
   }) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
         event.preventDefault();
         event.stopPropagation();
      }

      setValidated(true);

      if (form.checkValidity() === true) {
         event.preventDefault();
         await loginUser(formData);
      }
    
   };

   useEffect(() => {
      if (isSuccess) {
         dispatch(setCredentials(loginData));
         navigate('/profile');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isLoading]);

   return (
      <DataLoadingWrapper isLoading={isLoading} error={error}>
         <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <br />
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control
                  required
                  type="email"
                  value={formData.email}
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
               />
               <Form.Control.Feedback type="invalid">Please provide email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  required
                  type="password"
                  value={formData.password}
                  placeholder="Password"
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
      </DataLoadingWrapper>
   );
}

export default LogIn;
