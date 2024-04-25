/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
],
  theme: {
    extend: {
      colors: {
        water: '#blue', // Cambia el color según prefieras
        ship: '#gray',  // Cambia el color según prefieras
        hited: '#red',  // Cambia el color según prefieras
        missed: '#white'  // Cambia el color según prefieras
      }
    },
  },
  plugins: [],
}

