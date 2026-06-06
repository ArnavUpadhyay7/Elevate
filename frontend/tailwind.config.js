import daisyui from "daisyui"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        barlow: ["Barlow Condensed", "Arial Narrow", "sans-serif"],
      },
      colors: {
        elevate: {
          bg: "var(--elv-bg)",
          panel: "var(--elv-bg-elevated)",
          muted: "var(--elv-bg-muted)",
          red: "var(--elv-red)",
          "red-hover": "var(--elv-red-hover)",
        },
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scanSweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(320%)' },
        },
        dotPulse: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
      },
      animation: {
        scanSweep: "scanSweep 1.6s linear infinite",
        dotPulse: "dotPulse 1.2s ease-in-out infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        elevate: {
          primary: "#A01E2E",
          secondary: "#111722",
          accent: "#C3293B",
          neutral: "#0D1118",
          "base-100": "#080A0E",
          "base-200": "#0D1118",
          "base-300": "#141B26",
          "base-content": "#E8EEF5",
        },
      },
    ],
  },
  plugins: [daisyui],
}
