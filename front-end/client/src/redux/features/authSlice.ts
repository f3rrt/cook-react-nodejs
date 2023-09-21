import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/index';
// initialize userToken from local storage
const tokens: any = localStorage.getItem('tokens') ? localStorage.getItem('tokens') : null;

const user: any = localStorage.getItem('user') ? localStorage.getItem('user') : null;

interface AuthState {
   loading: boolean;
   access_token: any;
   refresh_token: any;
   user: any;
   error: null | string;
   success: boolean;
}

const initialState: AuthState = {
   loading: false,
   access_token: JSON.parse(tokens)?.access_token,
   refresh_token: JSON.parse(tokens)?.refresh_token,
   user: JSON.parse(user),
   error: null,
   success: false,
};


const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         localStorage.removeItem('tokens'); 
         localStorage.removeItem('user');// delete token from storage
         state.loading = false;
         state.user = null;
         state.refresh_token = null;
         state.access_token = null;
         state.error = null;
      },
      setCredentials: (state, { payload }) => {
         localStorage.setItem(
            'tokens',
            JSON.stringify({
               access_token: payload.tokens.access_token,
               refresh_token: payload.tokens.refresh_token,
            }),
         );

         localStorage.setItem(
            'user',
            JSON.stringify({
               email: payload.email,
               name: payload.name,
            }),
         );
         state.access_token = payload.tokens.access_token;
         state.refresh_token = payload.tokens.refresh_token;
         state.user = {
            email: payload.email,
            name: payload.name,
         };
      },
   },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
