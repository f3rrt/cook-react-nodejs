import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; // --> add this line

import Router from 'routes/Routers';
import { store } from 'redux';
import { CookiesProvider } from 'react-cookie';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}> 
      <CookiesProvider>
          <RouterProvider router={Router} />
        </CookiesProvider>
      </Provider>
   </React.StrictMode>,
);