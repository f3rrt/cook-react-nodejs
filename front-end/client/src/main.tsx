import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux'; // --> add this line

import Router from 'routes/Routers';
import store from 'store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <Provider store={store}> 
         <RouterProvider router={Router} />
      </Provider>
   </React.StrictMode>,
);