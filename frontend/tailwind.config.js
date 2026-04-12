/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mwt-blue-dark': '#0B1E3A',
        'mwt-green-emerald': '#00B286',
        'mwt-turquoise': '#1DE394',
        'mwt-royal-blue': '#481EE3',
        'mwt-sky-blue': '#3083FE',
        'mwt-cyan': '#1EE3D7',
      }
    },
  },
  plugins: [],
}
