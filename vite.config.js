import path, { resolve } from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    outDir: resolve(__dirname, "./dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        tests: resolve(__dirname, "src/tests/index.html"),
        steering: resolve(__dirname, "src/tests/steering/index.html"),
        readout: resolve(__dirname, "src/tests/readout/index.html"),
        lander: resolve(__dirname, "src/tests/lander/index.html"),
      },
    },
  },
  root: "./src",
  publicDir: "./public",
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp4", "**/*.json"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@util": path.resolve(__dirname, "./src/util"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
