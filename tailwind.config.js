/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ["JetBrains Mono", "ui-sans-serif", "system-ui"],
        spacegrotesk: ["Space Grotesk", "ui-sans-serif", "system-ui"],
      },
      keyframes: {
        popupModal: {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "100", transform: "scale(1)" },
        },
        fadeInUp:  {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        }
      },
      animation: {
        popupModal: "popupModal .2s linear",
        fadeInUp: "fadeInUp .5s ease-in-out"
      },
    },
  },
  plugins: [],
};