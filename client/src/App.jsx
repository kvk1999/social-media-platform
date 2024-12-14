import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login"; // Ensure this is the correct import for Login
import HomePage from "./pages/HomePage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // If token exists, user is authenticated
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* If user is not authenticated, redirect to login */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
        
        {/* If user is authenticated, they can access home */}
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        
        {/* Default route redirects to login if no path is matched */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
