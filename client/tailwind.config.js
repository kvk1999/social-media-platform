// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Ensure Tailwind scans your files for classes
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Custom primary color
        secondary: '#9333ea', // Custom secondary color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Use Inter font
      },
    },
  },
  plugins: [],
}
