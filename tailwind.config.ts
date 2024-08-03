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
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
