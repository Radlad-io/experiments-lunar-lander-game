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
        physics: resolve(__dirname, "src/tests/physics/gravity/index.html"),
      },
    },
  },
  root: "./src",
  publicDir: "./public",
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp4"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@util": path.resolve(__dirname, "./src/util"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
