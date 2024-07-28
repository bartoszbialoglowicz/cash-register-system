import './App.css';
import AuthContainer from './components/Auth/AuthContainer';
import { useContext, useState } from 'react';
import { UserContext } from './store/user-context';
import AppLayout from './components/AppLayout/AppLayout';
import { AlertProvider } from './store/alert-context';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/Router/ProtectedRoute';

function App() {

  const userCtx = useContext(UserContext);
  const router = createBrowserRouter([
    {
      path: "auth",
      element: <AuthContainer />
    },
    {
      path: "/",
      element: <ProtectedRoute isAuthenticated={userCtx.isAuthenticated}><AppLayout /></ProtectedRoute>
    },
    {
      path: "*",
      element: <Navigate to={userCtx.isAuthenticated ? "/" : "auth"} />
    }
  ])

  return (
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  );
}

export default App;
