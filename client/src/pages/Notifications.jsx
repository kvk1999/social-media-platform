import React, { useState, useEffect } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/notifications');
      const data = await response.json();
      setNotifications(data); // Set the notifications to state
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications(); // Fetch notifications when component mounts
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <p>{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
