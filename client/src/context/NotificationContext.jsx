import React, { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching notifications from an API
  useEffect(() => {
    const fetchNotifications = () => {
      // Simulate fetching notifications from a mock API (mock data)
      const mockNotifications = [
        { id: 1, message: 'You have a new friend request' },
        { id: 2, message: 'Someone liked your post' },
        { id: 3, message: 'You have a new comment on your post' },
      ];
      setNotifications(mockNotifications);
    };
    fetchNotifications();
  }, []);

  const addNotification = (notification) => {
    setNotifications([notification, ...notifications]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
