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
        ink: '#111111',
        dark: '#333333',
        soft: '#F2F2F2',
        line: '#E7E7E3',
        lime: '#84CC16',
        muted: '#737373',
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
        display: ['Gellix', 'sans-serif'],
        sans: ['Gellix', 'sans-serif'],
        serif: ["Georgia", "serif"]
      },
      boxShadow: {
        soft: '0 28px 80px rgba(0,0,0,.08)',
        dark: '0 28px 80px rgba(0,0,0,.28)'
      }
    }
  },
  plugins: []
};
