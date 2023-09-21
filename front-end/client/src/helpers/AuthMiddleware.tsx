import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import FullScreenLoader from 'components/page-loading/PageLoading';

type IAuthMiddleware = {
   children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
   const { user } = useAuth();
   const navigate = useNavigate();
   if (!user) {
      navigate('/home');
   }
   return children;
};

export default AuthMiddleware;
