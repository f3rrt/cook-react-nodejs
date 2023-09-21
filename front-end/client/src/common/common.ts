
import { RootState } from 'redux/index';

export const prepareAuthHeaders = (headers: Headers, getState: () => any) => {
   const token = (getState() as RootState).auth.refresh_token;
   if (token) {
      headers.set('authorization', `Bearer ${token}`);
      return headers;
   }
};

