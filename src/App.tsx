import './App.css';
import AuthContainer from './components/Auth/AuthContainer';
import { useContext, useState } from 'react';
import { UserContext } from './store/user-context';
import AppLayout from './components/AppLayout/AppLayout';

function App() {

  const userCtx = useContext(UserContext);
  const content = userCtx.isAuthenticated ? <AppLayout /> : <AuthContainer />

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
