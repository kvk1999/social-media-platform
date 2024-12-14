import { useState, useEffect } from 'react';

const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching notifications
  const fetchNotifications = () => {
    setLoading(true);

    // Example of sample notifications (you can replace these with your own data)
    const sampleNotifications = [
      { id: 1, message: "You have a new friend request", timestamp: new Date() },
      { id: 2, message: "Your post was liked", timestamp: new Date() },
      { id: 3, message: "Someone commented on your post", timestamp: new Date() },
    ];

    // Simulate delay (for example, an API call)
    setTimeout(() => {
      setNotifications(sampleNotifications);
      setLoading(false);
    }, 1000); // Simulating a 1 second delay
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications, loading, error };
};

export default useNotifications;
