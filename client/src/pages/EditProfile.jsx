import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // for routing
import { getUserById, updateUser } from '../services/userService';  // your API functions

const EditProfile = () => {
  const { userId } = useParams();  // Get the userId from the URL params
  const navigate = useNavigate();  // For redirecting after form submission

  const [user, setUser] = useState({
    name: '',
    email: '',
    // Add other fields as needed
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await updateUser(userId, user);
      alert('Profile updated successfully');
      navigate(`/profile/${userId}`);  // Redirect to the profile page after successful update
    } catch (err) {
      setError('Failed to update profile');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other fields if needed */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
