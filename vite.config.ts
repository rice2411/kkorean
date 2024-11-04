import { viteStaticCopy } from "vite-plugin-static-copy";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const SERVERLESS_FUNCTION_API_URL = env.VITE_SERVERLESS_FUNCTION_API_URL;
  return {
    base: "/",
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          { src: "offline.html", dest: "" },
          { src: "google9d8532a0f9321004.html", dest: "" },
        ],
      }),
      VitePWA({
        devOptions: {
          enabled: true,
        },
        registerType: "autoUpdate",
        manifest: {
          name: "Kkorean",
          short_name: "KKorean",
          description: "Học tiếng Hàn cùng Kkorean",
          theme_color: "#facc15",
          icons: [
            {
              src: "/images/logo512.png",
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
    css: {
      modules: {
        generateScopedName: "[hash:base64:5]", // Tên lớp CSS được mã hóa
      },
    },
  };
});
