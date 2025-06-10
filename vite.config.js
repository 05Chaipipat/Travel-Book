import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  extend: {
    color: {
      primary: "#05B6D3",
      secondary: "#EF863E",
    },
    backgroundImage: {
      "login-bg-img": "url('./src/assets/images/2.png)",
      "signup-bg-img": "url('./src/assets/images/3.png)",
    },
  },
});
