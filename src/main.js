import "./style.css";
import * as THREE from "three";
import { scene } from "@components/MainScene.js";
import { cameraMove } from "@components/Camera.js";
// import * as THREE from "three";
// import gsap from "gsap";

// Global variables
let isDev = import.meta.env.DEV;
export let debug = isDev;

// Utilities
import * as Sizes from "@util/Sizes.js";

// Init
window.focus(); //Capture keys right away

// Animation
import { tick } from "@util/Time.js";
tick();

const light = new THREE.PointLight(0xffffff, 10, 100);
light.position.set(0, 25, 25);
scene.add(light);

const ambLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambLight);

// const helper = new THREE.HemisphereLightHelper(light, 5);
// scene.add(helper);

// Event handelers
Sizes.handleResize();

cameraMove();
