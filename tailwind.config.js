export default {
  content: [
    "./*.html",
    "./projects/**/*.html",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#84CC16",
          primaryDark: "#65A30D",
          primaryGlow: "rgba(132, 204, 22, 0.12)",
          dark: "#1E293B",
          card: "#1E293B",
          border: "rgba(255, 255, 255, 0.08)",
          textMuted: "#64748B",
          offwhite: "#F8FAFC"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
        serif: ["Georgia", "serif"]
      }
    }
  },
  plugins: []
};
