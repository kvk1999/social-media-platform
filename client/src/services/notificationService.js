// Mock data for notifications
const mockNotifications = [
  { id: 1, message: 'You have a new friend request.', isRead: false },
  { id: 2, message: 'Your post got 10 new likes.', isRead: false },
];

// Fetch mock notifications
export const fetchNotifications = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNotifications), 500); // Simulate network delay
  });
};

// Simulate marking a notification as read
export const markNotificationAsRead = async (notificationId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedNotifications = mockNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      );
      resolve(updatedNotifications);
    }, 500); // Simulate network delay
  });
};
