import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Register user
  async function registerUser(formdata, navigate, fetchPosts) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", formdata);
      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      localStorage.setItem("authToken", data.token); // Store token
      navigate("/");
      setLoading(false);
      fetchPosts();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  // Login user
  async function loginUser(email, password, navigate, fetchPosts) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });

      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      localStorage.setItem("authToken", data.token); // Store token
      navigate("/");
      setLoading(false);
      fetchPosts();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  // Fetch user data
  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");

      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  // Logout user
  async function logoutUser(navigate) {
    try {
      const { data } = await axios.get("/api/auth/logout");

      if (data.message) {
        toast.success(data.message);
        setUser([]);
        setIsAuth(false);
        localStorage.removeItem("authToken"); // Clear token
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Follow user
  async function followUser(id, fetchUser) {
    try {
      const { data } = await axios.post("/api/user/follow/" + id);

      toast.success(data.message);
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Update profile pic
  async function updateProfilePic(id, formdata, setFile) {
    try {
      const { data } = await axios.put("/api/user/" + id, formdata);
      toast.success(data.message);
      fetchUser();
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Update profile name
  async function updateProfileName(id, name, setShowInput) {
    try {
      const { data } = await axios.put("/api/user/" + id, { name });
      toast.success(data.message);
      fetchUser();
      setShowInput(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Fetch user on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUser(); // Automatically fetch user if a token exists
    } else {
      setLoading(false); // If no token, just stop loading
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        isAuth,
        setIsAuth,
        user,
        setUser,
        loading,
        logoutUser,
        registerUser,
        followUser,
        updateProfilePic,
        updateProfileName,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
