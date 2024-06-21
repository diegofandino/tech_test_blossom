import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ApolloProvider } from '@apollo/client'
import client from './config/apollo-client.ts'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CharacterDetail from './components/pages/character-detail/CharacterDetail.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/character-detail/:id",
        element: <CharacterDetail />
      }
  ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ApolloProvider client={client}>
      <RouterProvider router={router} />
      </ApolloProvider>
  </React.StrictMode>,
)
