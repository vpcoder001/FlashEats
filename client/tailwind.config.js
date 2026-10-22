export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Outfit'", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b", // Warm Amber
          600: "#d97706",
          700: "#b45309",
        },
        coral: {
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
        },
        dark: {
          950: "#070a0f", // Deep midnight obsidian
          900: "#0b0f17",
          850: "#0f1523",
          800: "#151d30",
          700: "#1e2942",
          600: "#2d3a58",
        }
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(245, 158, 11, 0.25)",
        "glow-sm": "0 0 15px -3px rgba(245, 158, 11, 0.2)",
        "glow-coral": "0 0 30px -5px rgba(244, 63, 94, 0.25)",
      }
    }
  },
  plugins: [],
};