import * as THREE from "three";
import * as CANNON from "cannon-es";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
// import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { Text } from "troika-three-text";

const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5));
scene.background = new THREE.Color(0x000000);
const gui = new GUI();

// Physics
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -1.62, 0),
  // Earth -9.82 m/s²
  // Moon -1.62 m/s²
});

const radius = 5; // m
const sphereBody = new CANNON.Body({
  mass: 50, // kg
  shape: new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5)),
  material: new CANNON.Material(),
  velocity: new CANNON.Vec3(0, -10, 0),
});
sphereBody.position.set(0, 75, 0);

world.addBody(sphereBody);

sphereBody.addEventListener("collide", (event) => {
  console.log(event.contact.getImpactVelocityAlongNormal());
});

const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
  material: new CANNON.Material(),
});
10;
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
world.addBody(groundBody);

const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshNormalMaterial();
const sphereMesh = new THREE.Mesh(geometry, material);
sphereMesh.castShadow = true;
scene.add(sphereMesh);

const padGeometry = new THREE.CylinderBufferGeometry(10, 10, 0.1, 20);
const padMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
});
const padMesh = new THREE.Mesh(padGeometry, padMaterial);
padMesh.position.set(-100, 0, 0);
padMesh.receiveShadow = true;
scene.add(padMesh);

const pad2Geometry = new THREE.CylinderBufferGeometry(18, 18, 0.1, 20);
const pad2Material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
});
const pad2Mesh = new THREE.Mesh(pad2Geometry, pad2Material);
pad2Mesh.position.set(100, 0, 0);
pad2Mesh.receiveShadow = true;
scene.add(pad2Mesh);

const groundGeometry = new THREE.PlaneGeometry(400, 400);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.rotation.set(-Math.PI / 2, 0, 0);
groundMesh.receiveShadow = true;
scene.add(groundMesh);

const testGeometry = new THREE.BoxGeometry(5, 5, 5);
const testMaterial = new THREE.MeshNormalMaterial();
const testSphereMesh = new THREE.Mesh(testGeometry, testMaterial);
testSphereMesh.position.set(0,-10,0)
scene.add(testSphereMesh);

// Set properties to configure:
const altitudeText = new Text();
scene.add(altitudeText);
altitudeText.text = `ALTITUDE ${75}m`;
altitudeText.font = "./IBMPlexMono-Bold.ttf";
altitudeText.fontSize = 6;
altitudeText.position.y = 25;
altitudeText.position.z = -10;
altitudeText.position.x = -25;
altitudeText.color = 0xffffff;

const vertVelocityText = new Text();
scene.add(vertVelocityText);
vertVelocityText.font = "./IBMPlexMono-Bold.ttf";
vertVelocityText.fontSize = 6;
vertVelocityText.position.y = 18;
vertVelocityText.position.z = -10;
vertVelocityText.position.x = -25;
vertVelocityText.color = 0xffffff;

const horizVelocityText = new Text();
scene.add(horizVelocityText);
horizVelocityText.font = "./IBMPlexMono-Bold.ttf";
horizVelocityText.fontSize = 6;
horizVelocityText.position.y = 11;
horizVelocityText.position.z = -10;
horizVelocityText.position.x = -25;
horizVelocityText.color = 0xffffff;

const altitudeRayCaster = new THREE.Raycaster();
// const origin = sphereBody.position
const rayTo =  new THREE.Vector3(0, -1, 0)
rayTo.normalize()
altitudeRayCaster.set(sphereBody.position,rayTo);
let intersects, altitude

const updateAlititude = () => {
  altitudeRayCaster.set(sphereBody.position,rayTo);
  intersects = altitudeRayCaster.intersectObject(groundMesh)
  altitude = Math.floor(intersects[0].distance -1.5)
  altitudeText.text = `ALTITUDE ${altitude}m`;
}

const updateDroPosition = () => {
  altitudeText.position.x = sphereBody.position.x - 25;
  altitudeText.position.y = sphereBody.position.y + 25;
  vertVelocityText.position.x = sphereBody.position.x - 25;
  vertVelocityText.position.y = sphereBody.position.y + 18;
  horizVelocityText.position.x = sphereBody.position.x - 25;
  horizVelocityText.position.y = sphereBody.position.y + 11;
}

const updateVelocity = () => {
  vertVelocityText.text = `${sphereBody.velocity.y.toFixed(1) > 0 ? "↑": "↓"} ${Math.abs(sphereBody.velocity.y.toFixed(1))}m/s`;
  horizVelocityText.text = `${sphereBody.velocity.x.toFixed(1) > 0 ? "→" : "←"} ${Math.abs(sphereBody.velocity.x.toFixed(1))}m/s`;
}

setInterval(() => {
  updateAlititude()
  updateVelocity()
}, 100)



// Update the rendering:
let color, intensity, distance, angle, penumbra, decay;
color = 0xffffff;
intensity = 2;
distance = 200;
angle = Math.PI / 1.5;
penumbra = 0.5;
decay = 0.25;

const overHeadLight = new THREE.SpotLight(
  color,
  intensity,
  distance,
  angle,
  penumbra,
  decay
);
overHeadLight.position.set(0, 125, 0);
overHeadLight.target.position.set(
  overHeadLight.position.x,
  overHeadLight.position.y - 125,
  overHeadLight.position.z
);
overHeadLight.castShadow = true;
overHeadLight.shadow.mapSize.width = 2048;
overHeadLight.shadow.mapSize.height = 2048;

const helper = new THREE.CameraHelper(overHeadLight.shadow.camera);
scene.add(overHeadLight);

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

var gridXZ = new THREE.GridHelper(
  500,
  50,
  new THREE.Color(0xff0000),
  new THREE.Color(0xffffff)
);
gridXZ.position.set(0, 0);
gridXZ.rotation.set(0, 0, 0);
scene.add(gridXZ);

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

const droRotationZ = document.querySelector(".rotationZ");

let landerRotation = 0;
let pressedKeys = [];

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (pressedKeys.includes("ArrowUp")) {
        break;
      }
      pressedKeys.push("ArrowUp");
      break;
    case "ArrowLeft":
      if (pressedKeys.includes("ArrowLeft")) {
        break;
      }
      pressedKeys.push("ArrowLeft");
      break;
    case "ArrowRight":
      if (pressedKeys.includes("ArrowRight")) {
        break;
      }
      pressedKeys.push("ArrowRight");
      break;
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      pressedKeys.pop("up");
      break;
    case "ArrowLeft":
      pressedKeys.pop("ArrowLeft");
      break;
    case "ArrowRight":
      pressedKeys.pop("ArrowRight");
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  // console.log(sphereBody.velocity.y);

  if (pressedKeys.includes("ArrowUp")) {
    sphereBody.applyLocalImpulse(new CANNON.Vec3(0, 3.5, 0));
  }

  // TODO: I'm currently setting the quaternion rotations for steering
  //  A better method might be to apply rotational force
  if (pressedKeys.includes("ArrowLeft")) {
    landerRotation -= 0.075;
    sphereBody.quaternion.setFromEuler(0, 0, -landerRotation / 3);
    droRotationZ.innerHTML = landerRotation.toFixed(2);
  }

  if (pressedKeys.includes("ArrowRight")) {
    landerRotation += 0.075;
    sphereBody.quaternion.setFromEuler(0, 0, -landerRotation / 3);
    droRotationZ.innerHTML = landerRotation.toFixed(2);
  }

  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);

  updateDroPosition()

  // Run the simulation independently of framerate every 1 / 60 ms
  world.fixedStep();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
