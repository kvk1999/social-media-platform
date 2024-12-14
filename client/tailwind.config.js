/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',  // Make sure Tailwind CSS scans all files for class names
  ],
  theme: {
    extend: {
      colors: {
        // Define custom colors if needed
        primary: '#1e40af',  // Example custom primary color
        secondary: '#9333ea', // Example custom secondary color
      },
      fontFamily: {
        // Add custom fonts if required
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      // Add custom spacing, border-radius, etc. if needed
      spacing: {
        18: '4.5rem',
        36: '9rem',
      },
    },
  },
  plugins: [
    // You can add Tailwind plugins if needed, like forms, typography, etc.
  ],
}
