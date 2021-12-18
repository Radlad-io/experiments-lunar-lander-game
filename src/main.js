// Global variables
let isDev = import.meta.env.DEV;
let debug = isDev;

// Imports
import "./style.css";
import * as THREE from "three";
import { scene } from "@components/MainScene.js";
import { cameraMove } from "@components/Camera.js";

// Utilities
import * as Sizes from "@util/Sizes.js";

// Init
window.focus(); //Capture keys right away

const light = new THREE.PointLight(0xffffff, 10, 200);
light.position.set(0, 75, -75);
scene.add(light);

const ambLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambLight);

// Animation
import { tick } from "@util/Time.js";
tick();

// Event handelers
Sizes.handleResize();

cameraMove();

export { debug };
