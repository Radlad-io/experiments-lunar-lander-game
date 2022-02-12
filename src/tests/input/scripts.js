import * as THREE from "three";
import * as CANNON from "cannon-es";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import { Text } from "troika-three-text";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const gui = new GUI();

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -1.25,
  cameraWidth / 1.25,
  cameraHeight / 1.25,
  cameraHeight / -1.25,
  0,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const stats = Stats();
document.body.appendChild(stats.dom);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(450, 300, 450);
controls.update();

let Key = {
  _pressed: {},
  _release_time: {},

  MAX_KEY_DELAY: 100,

  onKeydown: function (event) {
    var time = new Date().getTime();
    if (
      this._release_time[event.key] &&
      time < this._release_time[event.key] + this.MAX_KEY_DELAY
    ) {
      console.log("Mistimed keypress event detected");
      return false;
    }
    this._pressed[event.key] = true;
  },

  onKeyup: function (event) {
    delete this._pressed[event.key];
    this._release_time[event.key] = new Date().getTime();
  },
};

document.onkeydown = function (event) {
  return Key.onKeydown(event);
};
document.onkeyup = function (event) {
  return Key.onKeyup(event);
};

import font from "./IBMPlexMono-Bold.ttf";

// Set properties to configure:
const pressedText1 = new Text();
scene.add(pressedText1);
pressedText1.text = `Arrow Up`;
pressedText1.font = font;
pressedText1.fontSize = 6;
pressedText1.position.z = 50;
pressedText1.position.y = 25;
pressedText1.rotation.y = Math.PI / 4;
pressedText1.color = 0xffffff;

const pressedText2 = new Text();
scene.add(pressedText2);
pressedText2.text = `Arrow Left`;
pressedText2.font = font;
pressedText2.fontSize = 6;
pressedText2.position.z = 50;
pressedText2.position.y = 15;
pressedText2.rotation.y = Math.PI / 4;
pressedText2.color = 0xffffff;

const pressedText3 = new Text();
scene.add(pressedText3);
pressedText3.text = `Arrow Right`;
pressedText3.font = font;
pressedText3.fontSize = 6;
pressedText3.position.z = 50;
pressedText3.position.y = 5;
pressedText3.rotation.y = Math.PI / 4;
pressedText3.color = 0xffffff;

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  if (Object.keys(Key._pressed).includes("ArrowUp")) {
    pressedText1.color = 0xff0000;
  } else {
    pressedText1.color = 0xffffff;
  }

  if (Object.keys(Key._pressed).includes("ArrowLeft")) {
    pressedText2.color = 0xff0000;
  } else {
    pressedText2.color = 0xffffff;
  }

  if (Object.keys(Key._pressed).includes("ArrowRight")) {
    pressedText3.color = 0xff0000;
  } else {
    pressedText3.color = 0xffffff;
  }

  render();
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
