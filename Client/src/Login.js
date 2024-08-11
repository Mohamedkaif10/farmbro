// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
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
     
      history('/page');
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
     
    }
  };

  return (
    <div className='above'>
    <div className='boddy'>
      <h2>Login</h2>
      <form>
        <div className='user'>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='pass'>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='login' type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default Login;
