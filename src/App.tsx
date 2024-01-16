import './App.css';
import LoginForm from './components/Auth/LoginForm';
import { useContext, useState } from 'react';
import { UserContext } from './store/user-context';
import AppLayout from './components/AppLayout/AppLayout';

function App() {

  const userCtx = useContext(UserContext);
  const content = userCtx.isAuthenticated ? <AppLayout /> : <LoginForm />

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
