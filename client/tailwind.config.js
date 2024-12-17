/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gap: {
        "max-1vw-12px": "max(1vw, 12px)"
      },
    },
  },
  plugins: [],
}
