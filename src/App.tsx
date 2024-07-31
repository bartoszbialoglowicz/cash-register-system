import './App.css';
import AuthContainer from './components/Auth/AuthContainer';
import AppLayout from './components/AppLayout/AppLayout';
import { AlertProvider } from './store/alert-context';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/Router/ProtectedRoute';

function App() {

  const router = createBrowserRouter([
    {
      path: "auth",
      element: <AuthContainer />
    },
    {
      path: "/",
      element: <Navigate to="/app" />
    },
    {
      path: "app",
      element: <ProtectedRoute><AppLayout /></ProtectedRoute>
    }
  ]);

  return (
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  );
}

export default App;
