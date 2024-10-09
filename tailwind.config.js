module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        secondary: {
          DEFAULT: "#240b36",
          light: "#4A2C4A",
          dark: "#12071B",
        },
        warning: {
          DEFAULT: "#F2A359",
          light: "#FFB74D",
          dark: "#C67C3B",
        },
        success: {
          DEFAULT: "#4CAF50",
          light: "#A5D6A7",
          dark: "#388E3C",
        },
        danger: {
          DEFAULT: "#A4031F",
          light: "#FF6F61",
          dark: "#7E1E1A",
        },
      },
    },
  },
  plugins: [],
};
