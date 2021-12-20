import * as THREE from "three";
// Global variables
import { dev, graphics } from "@util/State.js";

// Imports
import "./style.css";
import { cameraMove } from "@components/Camera.js";
import { scene } from "@components/MainScene.js";

// Utilities
import * as Sizes from "@util/Sizes.js";

// Init
window.focus(); //Capture keys right away

// Animation
import { tick } from "@util/Time.js";
tick();

// Event handelers
Sizes.handleResize();

import { setSobel } from "@util/Renderer.js";
const graphicsToggle = document.querySelector(".graphics-toggle");
graphicsToggle.addEventListener("click", () => {
  graphics.toggle();
  let current = graphics.get();
  scene.background =
    current === false ? new THREE.Color(0x000000) : new THREE.Color(0xffffff);
  setSobel(current);
});

cameraMove();
