import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        sen: ["Sen", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      backgroundImage: {
        banner:
          "linear-gradient(to bottom, rgba(2,6,23,0.5), rgba(2,6,23,0.55)), url('https://lumen-advisory.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-11-at-17.37.32.jpeg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
