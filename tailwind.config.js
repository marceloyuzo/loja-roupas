/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'image': '620px',
        'container': '300px'
      },
      maxWidth: {
        'image': '620px'
      },
      screens: {
        'custom': '1120px',
        'response-920': '920px',
        'response-650': '650px',
        'response-1080': '1080px',
      }
    },
  },
  plugins: [],
}

