/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}", ], // <-- This is the problem!
  theme: {
    extend: {},
  },
  plugins: [],
}