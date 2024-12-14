import axios from "../utils/api";

export const fetchNotifications = () => axios.get("/notifications");

export const markAsRead = (notificationId) =>
  axios.put(`/notifications/${notificationId}/read`);

export const deleteNotification = (notificationId) =>
  axios.delete(`/notifications/${notificationId}`);
