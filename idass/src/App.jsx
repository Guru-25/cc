// App.jsx
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

const App = () => {
  const { isLoading, isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      {!isAuthenticated ? (
        <div className="login-section">
          <h1>Welcome</h1>
          <br />
          <button onClick={() => loginWithRedirect()}>Sign In</button>
        </div>
      ) : (
        <div className="profile-section">
          <img src={user.picture} alt={user.name} className="avatar"/>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default App;