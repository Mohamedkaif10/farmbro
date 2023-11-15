// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        username,
        password,
      });

      const token = response.data.token;
      console.log('Token:', token);
      localStorage.setItem('token', token);
      // Handle storing the token, e.g., in localStorage or a state management library
      history('/page');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      // Handle login failure, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
