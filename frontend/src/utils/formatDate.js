// No external imports are needed as we are using native JavaScript Date methods.

/**
 * Formats a given date string into a more readable date and time format.
 *
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} Formatted date and time (e.g., "December 12, 2024, 3:45 PM").
 */
export const formatDateAndTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Formats a given date string into a short date format.
 *
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} Formatted date (e.g., "12/12/2024").
 */
export const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

/**
 * Formats a given date string into a time-only format.
 *
 * @param {string} dateString - The ISO date string to format.
 * @returns {string} Formatted time (e.g., "3:45 PM").
 */
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return date.toLocaleTimeString('en-US', options);
};

// Exporting all functions for usage in other parts of the project.
export default {
  formatDateAndTime,
  formatShortDate,
  formatTime,
};
