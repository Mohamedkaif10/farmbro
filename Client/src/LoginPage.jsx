// src/LoginPage.js

import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [redirectToFarmerDetail, setRedirectToFarmerDetail] = useState(false);
  const onLogin = (token) => {
    // Your login logic here
    console.log('User logged in with token:', token);
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/login', { username, password });
      
      if (response.data && response.data.token) {
        const token = response.data.token;
        console.log('Token:', token);
        localStorage.setItem('token', token);
        onLogin(token);
        setRedirectToFarmerDetail(true);
      } else {
        console.error('Invalid response format:', response);
        setLoginError('Invalid server response');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Login request failed');
    }
  };

  if (redirectToFarmerDetail) {
    return <Navigate to="/farmer-detail" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
