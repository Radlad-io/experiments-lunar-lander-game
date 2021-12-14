import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import "./lib/rStats/rStats";
import { GUI } from "dat.gui";

// Components
import * as Time from "@util/Time.js";

// Capture keys right away
let isDev = import.meta.env.DEV;
export let showControls = isDev;

// Init
window.focus();

let gui;
if (isDev) {
  gui = new GUI();
  var rS = new rStats({
    values: {
      frame: { caption: "Total frame time (ms)", over: 16 },
      raf: { caption: "Time since last rAF (ms)" },
      fps: { caption: "Framerate (FPS)", below: 30 },
      action1: { caption: "Render action #1 (ms)" },
      render: { caption: "WebGL Render (ms)" },
    },
    groups: [
      { caption: "Framerate", values: ["fps", "raf"] },
      { caption: "Frame Budget", values: ["frame", "action1", "render"] },
    ],
    fractions: [{ base: "frame", steps: ["action1", "render"] }],
  });
}

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();

var object1 = {
  isDev: false,
  type2_string: "string",
  type3_number: 0,
  type4_function: function () {
    alert("This is a function.");
  },
};
var enviormentFolder = gui.addFolder("Enviorment");
enviormentFolder.add(object1, "isDev").onChange(() => {
  isDev = !isDev;
});

// Animation
const tick = () => {
  // Adds stats HUD
  if (isDev) {
    rS("frame").start();
    rS("rAF").tick();
    rS("FPS").frame();
  }

  // Do stuff here

  // Renderer
  controls.update();
  renderer.render(scene, camera);
  if (isDev) {
    rS("frame").end();
    rS().update();
  }
  window.requestAnimationFrame(tick);
};

tick();

// Events
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  tick();
}
