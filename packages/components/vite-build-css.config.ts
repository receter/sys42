import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    copyPublicDir: false,
    lib: {
      entry: ["lib/default-custom-properties.css"],
      formats: ["es"],
    },
    cssCodeSplit: true,
  },
});
