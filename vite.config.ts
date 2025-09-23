/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from "vite-plugin-svgr";
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["src/setupTests.ts"],
    },
    plugins: [react(), viteTsconfigPaths(), svgr()],
    build: {
        outDir: 'build',
    },
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src'),
        }
    }
})