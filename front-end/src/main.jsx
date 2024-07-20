import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Add_user from './components/Add-user.jsx';
import Error_page from './components/Error-page.jsx';
import Edit_user from './components/Edit-user.jsx';
import Home from './components/Home.jsx';
import Sobre from './components/Sobre.jsx';

// cria as rotas
const router = createBrowserRouter([
  {
    path: "/",

    element: <App />,

    errorElement: <Error_page />,

    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/edit-user/:uid",
        element: <Edit_user />
      },
      {
        path: "/add-user",
        element: <Add_user />
      },
      {
        path: "/sobre",
        element: <Sobre />
      }
    ]
  }
])

// carrega as rotas criadas
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
