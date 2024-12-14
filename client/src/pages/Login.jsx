import React, { useState, useNavigate } from 'react';
import axios from 'axios'; // Import axios for making requests
import { loginUser } from '../services/authService'; // Import the login function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = { email, password };
      const response = await loginUser(userData); // Call the login function
      console.log('User logged in:', response);
      // Optionally, you can redirect the user to a different page after login
    } catch (err) {
      setError('Failed to log in');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
