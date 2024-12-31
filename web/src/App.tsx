import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './components/layouts/DefaultLayout';
import WelcomePage from './components/pages/WelcomePage';
import AddContactPage from './components/pages/AddContactPage';
import ContactPage from './components/pages/ContactPage';
import EditContactPage from './components/pages/EditContactPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: "/contacts/new",
        element: <AddContactPage />,
      },
      {
        path: "/contacts",
        element: <ContactPage />,
      },
      {
        path: "/contacts/edit/:id",
        element: <EditContactPage />,
      },
    ]
  }
]);

const App: React.FC = () => {

  return (
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  )
};

export default App;