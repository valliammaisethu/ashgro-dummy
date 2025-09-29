/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  base: "./", 
  test: {
    coverage: {
      include: [
        "src/shared/components/**",
        "src/views/**",
        "src/shared/utils/**",
      ],
      reportOnFailure: true,
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTests.ts"],
    css: false,
  },
  plugins: [react(), viteTsconfigPaths(), svgr({ include: "**/*.svg?react" })],
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
});
