import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const SERVERLESS_FUNCTION_API_URL = env.VITE_SERVERLESS_FUNCTION_API_URL;
  return {
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate", // Tự động cập nhật service worker khi có phiên bản mới
        includeAssets: ["/svg/logo.svg"],
        manifest: {
          name: "React Vite PWA App",
          short_name: "PWA App",
          description: "A simple PWA with React and Vite",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/svg/logo.svg",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/svg/logo.svg",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: SERVERLESS_FUNCTION_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
  };
});
