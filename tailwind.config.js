/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#E6EAE7',
        accent: '#B8FFC6', // Phosphor
        dim: '#4E7A57',    // Phosphor, low
      },
      fontFamily: {
        sans: ['"IBM Plex Sans KR"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        display: ['"IBM Plex Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
