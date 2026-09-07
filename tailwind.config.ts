import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#061018",
          900: "#0B1C2C",
          800: "#12263A",
          700: "#1B3550",
          600: "#2A4A6A",
          500: "#3D6488",
        },
        gold: {
          200: "#F0E4C4",
          300: "#E8D5A3",
          400: "#D4B87A",
          500: "#C4A46A",
          600: "#A88A4F",
          700: "#8A7040",
        },
        ivory: {
          50: "#FDFCFA",
          100: "#F7F3EB",
          200: "#EFE8DC",
          300: "#E4D9C8",
          400: "#D4C6B0",
        },
        stone: {
          400: "#B8AFA3",
          500: "#8A8278",
          600: "#6B645C",
          700: "#4A453F",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(6, 16, 24, 0.12)",
        lift: "0 18px 40px rgba(11, 28, 44, 0.14)",
        gold: "0 8px 24px rgba(196, 164, 106, 0.28)",
      },
      backgroundImage: {
        "navy-veil":
          "linear-gradient(135deg, rgba(11, 28, 44, 0.88) 0%, rgba(6, 16, 24, 0.72) 60%, rgba(11, 28, 44, 0.55) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
