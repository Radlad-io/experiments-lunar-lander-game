// Global variables
let isDev = import.meta.env.DEV;
let debug = isDev;

// Imports
import "./style.css";
import * as THREE from "three";
import { scene } from "@components/MainScene.js";
import { cameraMove } from "@components/Camera.js";
import { composer } from "@util/Renderer.js";

// Utilities
import * as Sizes from "@util/Sizes.js";

// Init
window.focus(); //Capture keys right away

const light = new THREE.PointLight(0xffffff, 1, 200);
light.position.set(0, 75, 75);
scene.add(light);

const ambLight = new THREE.AmbientLight(0xffffff);
ambLight.intensity = 1; // soft white light
scene.add(ambLight);

// const spotLight = new THREE.SpotLight(0x222222);
// spotLight.position.set(0, 75, 50);
// spotLight.intensity = 10;
// spotLight.distance = 100;
// spotLight.angle = 3.125;
// spotLight.penumbra = 1.5;
// scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// Animation
import { tick } from "@util/Time.js";
tick();

// Event handelers
Sizes.handleResize();

cameraMove();

export { debug };
