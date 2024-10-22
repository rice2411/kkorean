import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const SERVERLESS_FUNCTION_API_URL = env.VITE_SERVERLESS_FUNCTION_API_URL;

  const isDevelopment = mode !== "production";

  return {
    plugins: [
      react(),
      VitePWA({
        devOptions: {
          enabled: isDevelopment, // Chỉ bật dev PWA trong chế độ phát triển
        },
        registerType: "autoUpdate",
        manifest: {
          name: "Kkorean PWA",
          short_name: "Kkorean",
          description: "Học tiếng Hàn cùng Kkorean",
          theme_color: "#eab308",
          icons: [
            {
              src: "/svg/logo.svg",
              sizes: "192x192",
              type: "image/svg+xml",
            },
            {
              src: "/svg/logo.svg",
              sizes: "512x512",
              type: "image/svg+xml",
            },
          ],
        },
        workbox: {
          importScripts: ["/sw.js"],
          runtimeCaching: [
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
              handler: "CacheFirst", // Ưu tiên từ cache nếu có
              options: {
                cacheName: "image-cache",
                expiration: {
                  maxEntries: 10, // Giữ tối đa 10 hình ảnh
                  maxAgeSeconds: 30 * 24 * 60 * 60, // Cache trong 30 ngày
                },
              },
            },
            {
              urlPattern: /\.(?:css|js)$/,
              handler: "StaleWhileRevalidate", // Lấy từ cache và kiểm tra bản mới trên mạng
              options: {
                cacheName: "static-resources",
              },
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
    build: {
      minify: "terser", // Dùng Terser để giảm kích thước file
      terserOptions: {
        compress: {
          drop_console: !isDevelopment, // Bỏ console.log trong production
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    server: {
      cors: {
        origin: SERVERLESS_FUNCTION_API_URL, // Bật CORS chỉ với miền cần thiết
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
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
