import { useEffect } from 'react';
import './LogOut.module.scss';
import { logout } from 'redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-bootstrap';

function LogOut() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(logout());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch]);

   return (
      <>
         <div> You are logged out </div>
         <div>
            <NavLink href="/home">Go to home</NavLink>
         </div>
      </>
   );
}

export default LogOut;
