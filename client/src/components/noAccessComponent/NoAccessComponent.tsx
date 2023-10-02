import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import { useEffect, useState } from 'react';
// import { useCreateIngredientMutation } from 'redux/api/ingredient/ingredient.api';
import { useNavigate } from 'react-router-dom';
import NoAccessPage from 'assets/401.jpg';

const NoAccessComponent = () => {
   const navigate = useNavigate();
   return (
      <div className='no-access-page'>
         <h3>Sorry, You Are Not Allowed to Access This Page </h3>
         <img src={NoAccessPage} width="300" height="300"></img>
         <Button onClick={() => navigate('/log-in')} variant='morden'>Log In</Button>
      </div>
   );
};

export default NoAccessComponent;
