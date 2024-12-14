// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { loginUser } from '../services/authService'; // Assume you have an authService

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const user = await loginUser({ email, password });
    if (user) {
      // Redirect to home page or dashboard
      console.log('User logged in:', user);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
