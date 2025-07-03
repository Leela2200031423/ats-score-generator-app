// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gradient-start": "#00B5D8",
        "gradient-end": "#805AD5",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
