import { createBrowserRouter } from 'react-router'
import Layout from '@client/components/core/Layout'
import HomePage from '@client/pages/HomePage'
import LoginPage from '@client/pages/LoginPage'

// Configuration du router
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "login",
        element: <LoginPage />
      }
    ]
  }
])
