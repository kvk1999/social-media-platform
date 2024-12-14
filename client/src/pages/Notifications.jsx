// src/pages/NotificationsPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchNotifications, markNotificationAsRead } from '../services/notificationService';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      const fetchedNotifications = await fetchNotifications();
      setNotifications(fetchedNotifications);
    };
    getNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    const updatedNotification = await markNotificationAsRead(notificationId);
    setNotifications(notifications.map((notification) =>
      notification.id === notificationId ? updatedNotification : notification
    ));
  };

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <div key={notification.id}>
          <p>{notification.message}</p>
          {!notification.read && <button onClick={() => handleMarkAsRead(notification.id)}>Mark as Read</button>}
        </div>
      ))}
    </div>
  );
};

export default Notifications;
