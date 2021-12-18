import path, { resolve } from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    outDir: path.join(__dirname, "./dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/index.html"),
      },
    },
  },
  root: "./src",
  publicDir: "./public",
  assetsInclude: ["**/*.gltf"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@util": path.resolve(__dirname, "./src/util"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
});
