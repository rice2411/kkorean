import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const SERVERLESS_FUNCTION_API_URL = env.VITE_SERVERLESS_FUNCTION_API_URL;

    return {
        plugins: [
            react(),
            VitePWA({
                devOptions: {
                    enabled: true,
                },
                registerType: "autoUpdate",
                manifest: {
                    name: "Kkorean PWA",
                    short_name: "Kkorean",
                    description: "Học tiến hàn cùng Kkorean",
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
                    globPatterns: ["offline.html"], // Chỉ cache offline.html
                    runtimeCaching: [
                        {
                            urlPattern: /offline\.html/, // Chỉ cache offline.html
                            handler: "CacheFirst",
                            options: {
                                cacheName: "offline-cache",
                                expiration: {
                                    maxEntries: 1,
                                    maxAgeSeconds: 30 * 24 * 60 * 60, // Cache trong 30 ngày
                                },
                            },
                        },
                        {
                            urlPattern: /.*/, // Bỏ qua tất cả các yêu cầu khác
                            handler: "NetworkOnly", // Không cache bất kỳ yêu cầu nào khác
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
