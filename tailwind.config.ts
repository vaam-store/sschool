import { type Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {},
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        "adorsys-stock": {
          "primary": "#2F2CF9",
          "secondary": "#8498F4",
          "accent": "#8498F4",
          "neutral": "#101C25",
          "base-100": "#F8F9F9",
          "info": "#8498F4",
          "success": "#90D033",
          "warning": "#FFCB1D",
          "error": "#E16A6A",
          "dark-80": "#28333B",
          "dark-50": "#878D92",
          "dark-20": "#F8F9F9"
        }
      }
    ]
  },
} satisfies Config;
