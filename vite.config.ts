import { viteStaticCopy } from "vite-plugin-static-copy";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
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
          { src: "offline.html", dest: "" }, // Sao chép tệp offline.html vào thư mục dist
        ],
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
