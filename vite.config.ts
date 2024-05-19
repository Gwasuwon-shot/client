import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

const isProduction = process.env.APP_ENV === "production";

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

    isProduction &&
      sentryVitePlugin({
        org: "tutice",
        project: "javascript-react",
        authToken: process.env.VITE_APP_SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: "./dist/**",
          filesToDeleteAfterUpload: "./dist/**/*.map",
        },
      }),
  ],

  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },

  build: {
    sourcemap: false,
  },
});
