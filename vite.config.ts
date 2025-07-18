import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: "ortoni-report",
    rollupOptions: {
      input: "./src/index.tsx",
      output: {
        entryFileNames: "ortoni-report.js",
      },
    },
  },
});
