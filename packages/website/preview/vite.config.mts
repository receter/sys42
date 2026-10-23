import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import docusaurusConfig from "../docusaurus.config";

// The preview frame of the live examples, built with `vite build preview`
// into static/, so Docusaurus serves it at /preview/ in dev and in the build.
export default defineConfig({
  // Absolute, because the page may be served at /preview or /preview/.
  base: `${docusaurusConfig.baseUrl}preview/`,
  plugins: [react()],
  resolve: {
    // @sys42/ui is linked from the workspace and must use the same React.
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: "../static/preview",
    emptyOutDir: true,
    // One bundle with React, react-live (and its compiler) and all of
    // @sys42/ui, loaded once and cached for every example on a page.
    chunkSizeWarningLimit: 1000,
  },
});
