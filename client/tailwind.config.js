/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Tells Tailwind where to look for class names
  ],
  theme: {
    extend: {}, // You can customize theme here
  },
  plugins: [], // You can add Tailwind plugins
}
