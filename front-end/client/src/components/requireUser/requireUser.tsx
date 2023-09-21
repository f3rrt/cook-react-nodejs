import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FullScreenLoader from 'components/pageLoading/PageLoading';

const RequireUser = () => {
   const [cookies] = useCookies(['logged_in']);
   const location = useLocation();
   const user = null;
   const loading = true;

   if (loading) {
      return <FullScreenLoader />;
   }

   return (cookies.logged_in || user) ? (
      <Outlet />
   ) : cookies.logged_in && user ? (
      <Navigate to="/page-not-found" state={{ from: location }} replace />
   ) : (
      <Navigate to="/log-in" state={{ from: location }} replace />
   );
};

export default RequireUser;
