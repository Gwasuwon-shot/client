import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import { ProxyOptions } from "vite";

// 프록시 설정
const proxy: Record<string, string | ProxyOptions> = {
  "/api": {
    target: "https://openapi.naver.com",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
  server: {
    proxy: proxy,
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
