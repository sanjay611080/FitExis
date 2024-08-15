import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(-10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        fadeBounce: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "50%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
      },
      animation: {
        wave: "wave 2s infinite ease-in-out",
        fadeBounce: "fadeBounce 2s infinite ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
