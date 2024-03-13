import { Navigate, createBrowserRouter } from 'react-router-dom'

import DashboardPage from './components/DashboardPage'
import DefaultLayout from './layouts/DefaultLayout'
import GuestLayout from './layouts/GuestLayout'
import LoginPage from './components/LoginPage'
import NotFoundPage from './components/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/',
        element: <Navigate to='/dashboard' />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
