import { Navigate, createBrowserRouter } from 'react-router-dom'

import DashboardPage from './components/DashboardPage'
import DefaultLayout from './layouts/DefaultLayout'
import GuestLayout from './layouts/GuestLayout'
import LoginPage from './components/LoginPage'
import NotFoundPage from './components/NotFoundPage'
import ProjectsIndexPage from './components/ProjectsIndexPage'
import RegisterPage from './components/RegisterPage'
import ProjectsFormPage from './components/ProjectsFormPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/',
        element: <Navigate to='/login' />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
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
      {
        path: '/projects',
        element: <ProjectsIndexPage />,
      },
      {
        path: '/projects/create',
        element: <ProjectsFormPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
