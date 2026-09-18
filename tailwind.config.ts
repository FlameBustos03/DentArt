import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lime: {
          400: "#32CD32",
          500: "#2ECC71",
          600: "#27AE60",
          700: "#219150",
          // Accessible text/icon lime on white and mist (≥4.5:1). Do not use 400–700 for small text on light surfaces.
          800: "#1B7A45",
          text: "#1B7A45",
        },
        ink: {
          800: "#111111",
          900: "#000000",
        },
        mist: {
          DEFAULT: "#F9F9F9",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "var(--radius-card)",
        control: "var(--radius-control)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.08)",
        lift: "var(--shadow-lift)",
        card: "var(--shadow-sm)",
        lime: "0 8px 24px rgba(46, 204, 113, 0.32)",
      },
      transitionDuration: {
        fast: "180ms",
        panel: "160ms",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0, 0, 0.2, 1)",
      },
      backgroundImage: {
        "ink-veil":
          "linear-gradient(135deg, rgba(0, 0, 0, 0.88) 0%, rgba(17, 17, 17, 0.72) 60%, rgba(0, 0, 0, 0.55) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
