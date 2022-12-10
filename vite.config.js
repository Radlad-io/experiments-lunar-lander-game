import path, { resolve } from "path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    outDir: resolve(__dirname, "./dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        tests: resolve(__dirname, "src/tests/index.html"),
        basic: resolve(__dirname, "src/tests/basic/index.html"),
        readout: resolve(__dirname, "src/tests/readout/index.html"),
        lander: resolve(__dirname, "src/tests/lander/index.html"),
        camera: resolve(__dirname, "src/tests/camera/index.html"),
        displacement: resolve(__dirname, "src/tests/displacement/index.html"),
        turning: resolve(__dirname, "src/tests/turning/index.html"),
        input: resolve(__dirname, "src/tests/input/index.html"),
        steering: resolve(__dirname, "src/tests/steering/index.html"),
        steeringAssists: resolve(
          __dirname,
          "src/tests/steeringAssists/index.html"
        ),
        scoreboard: resolve(__dirname, "src/tests/scoreboard/index.html"),
      },
    },
  },
  assetsInclude: ["**/*.gltf", "**/*.glb", "**/*.mp4", "**/*.json"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@src": path.resolve(__dirname, "./src"),
      "@Experience": path.resolve(__dirname, "./src/Experience"),
      "@Utils": path.resolve(__dirname, "./src/Experience/Utils"),
      "@World": path.resolve(__dirname, "./src/Experience/World"),
    },
  },
});
