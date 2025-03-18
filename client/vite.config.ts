import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { replit } from "@replit/vite-plugin-runtime-error-modal";
import { shadcnTheme } from "@replit/vite-plugin-shadcn-theme-json";
import { cartographer } from "@replit/vite-plugin-cartographer";
import path from "path";

export default defineConfig({
  plugins: [react(), replit(), shadcnTheme(), cartographer()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
});
