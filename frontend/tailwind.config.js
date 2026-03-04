import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
      fadeUp: {
        from: { opacity: '0', transform: 'translateY(12px)' },
        to:   { opacity: '1', transform: 'translateY(0)' },
      },
    }
    },
  },
  plugins: [daisyui],
}