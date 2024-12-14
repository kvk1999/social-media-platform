// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { registerUser } from '../services/authService'; // Assume you have an authService

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    const newUser = await registerUser({ email, password, name });
    if (newUser) {
      // Redirect to login or dashboard
      console.log('User registered:', newUser);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
