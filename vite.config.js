import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [vue()],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'index.js',
                assetFileNames: 'index.css',
                chunkFileNames: "chunk.js",
            }
        }
    }
}));
