import * as THREE from "three";
import * as CANNON from "cannon-es";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
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

const landerRenderBody = new THREE.Group();
const landerMaterial = new THREE.MeshNormalMaterial();

const radius = 5; // m
const landerBodyPhysics = new CANNON.Body({
  mass: 50, // kg
  material: new CANNON.Material(),
  velocity: new CANNON.Vec3(0, -10, 0),
  angularFactor: new CANNON.Vec3(0, 0, 1),
  angularDamping: 0.25,
});
landerBodyPhysics.position.set(0, 75, 0);

// TODO: Lander rotates from center and it should rotate form the sphere's center
// Top Part
landerBodyPhysics.addShape(new CANNON.Sphere(3.5), new CANNON.Vec3(0, 3.5, 0));
// Middle part
landerBodyPhysics.addShape(new CANNON.Box(new CANNON.Vec3(2.5, 1.5, 2.5)));
// Feet
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(-3, -2.5, -3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(-3, -2.5, 3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(3, -2.5, -3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(3, -2.5, 3));

world.addBody(landerBodyPhysics);

const geometry = new THREE.BoxGeometry(5, 3, 5);
const sphereMesh = new THREE.Mesh(geometry, landerMaterial);
sphereMesh.castShadow = true;
landerRenderBody.add(sphereMesh);

const landerTopGeometry = new THREE.SphereGeometry(3.5, 16, 8);
const landerTopMesh = new THREE.Mesh(landerTopGeometry, landerMaterial);
landerTopMesh.castShadow = true;
landerTopMesh.position.set(0, 3.5, 0);
landerRenderBody.add(landerTopMesh);

const landerFirstFootGeometry = new THREE.SphereGeometry(1, 8, 8);
const landerFistFootMesh = new THREE.Mesh(landerFirstFootGeometry, landerMaterial);
landerFistFootMesh.castShadow = true;
landerFistFootMesh.position.set(-3, -2.5, -3);
landerRenderBody.add(landerFistFootMesh);
const landerSecondFootGeometry = new THREE.SphereGeometry(1, 8, 8);
const landerSecondFootMesh = new THREE.Mesh(landerSecondFootGeometry, landerMaterial);
landerSecondFootMesh.castShadow = true;
landerSecondFootMesh.position.set(-3, -2.5, 3);
landerRenderBody.add(landerSecondFootMesh);
const landerThirdFootGeometry = new THREE.SphereGeometry(1, 8, 8);
const landerThirdFootMesh = new THREE.Mesh(landerThirdFootGeometry, landerMaterial);
landerThirdFootMesh.castShadow = true;
landerThirdFootMesh.position.set(3, -2.5, -3);
landerRenderBody.add(landerThirdFootMesh);
const landerFourthFootGeometry = new THREE.SphereGeometry(1, 8, 8);
const landerFourthFootMesh = new THREE.Mesh(landerFourthFootGeometry, landerMaterial);
landerFourthFootMesh.castShadow = true;
landerFourthFootMesh.position.set(3, -2.5,  3);
landerRenderBody.add(landerFourthFootMesh);

scene.add(landerRenderBody);

const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
  material: new CANNON.Material(),
});
10;
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
world.addBody(groundBody);

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
testSphereMesh.position.set(0, -10, 0);
scene.add(testSphereMesh);

landerBodyPhysics.addEventListener("collide", (event) => {
  console.log(event.contact.getImpactVelocityAlongNormal());
});

import font from "./IBMPlexMono-Bold.ttf";

// Set properties to configure:
const altitudeText = new Text();
scene.add(altitudeText);
altitudeText.text = `ALTITUDE ${75}m`;
altitudeText.font = font;
altitudeText.fontSize = 6;
altitudeText.position.y = 25;
altitudeText.position.z = -10;
altitudeText.position.x = -25;
altitudeText.color = 0xffffff;

const vertVelocityText = new Text();
scene.add(vertVelocityText);
vertVelocityText.font = font;
vertVelocityText.fontSize = 6;
vertVelocityText.position.y = 18;
vertVelocityText.position.z = -10;
vertVelocityText.position.x = -25;
vertVelocityText.color = 0xffffff;

const horizVelocityText = new Text();
scene.add(horizVelocityText);
horizVelocityText.font = font;
horizVelocityText.fontSize = 6;
horizVelocityText.position.y = 11;
horizVelocityText.position.z = -10;
horizVelocityText.position.x = -25;
horizVelocityText.color = 0xffffff;

const altitudeRayCaster = new THREE.Raycaster();
// const origin = landerBodyPhysics.position
const rayTo = new THREE.Vector3(0, -1, 0);
rayTo.normalize();
altitudeRayCaster.set(landerBodyPhysics.position, rayTo);
let intersects, altitude;

const updateAlititude = () => {
  altitudeRayCaster.set(landerBodyPhysics.position, rayTo);
  intersects = altitudeRayCaster.intersectObject(groundMesh);
  altitude = Math.floor(intersects[0].distance - 1.5);
  altitudeText.text = `ALTITUDE ${altitude}m`;
};

const updateDroPosition = () => {
  altitudeText.position.x = landerBodyPhysics.position.x - 25;
  altitudeText.position.y = landerBodyPhysics.position.y + 25;
  vertVelocityText.position.x = landerBodyPhysics.position.x - 25;
  vertVelocityText.position.y = landerBodyPhysics.position.y + 18;
  horizVelocityText.position.x = landerBodyPhysics.position.x - 25;
  horizVelocityText.position.y = landerBodyPhysics.position.y + 11;
};

const updateVelocity = () => {
  vertVelocityText.text = `${
    landerBodyPhysics.velocity.y.toFixed(1) > 0 ? "↑" : "↓"
  } ${Math.abs(landerBodyPhysics.velocity.y.toFixed(1))}m/s`;
  horizVelocityText.text = `${
    landerBodyPhysics.velocity.x.toFixed(1) > 0 ? "→" : "←"
  } ${Math.abs(landerBodyPhysics.velocity.x.toFixed(1))}m/s`;
};

setInterval(() => {
  updateAlititude();
  updateVelocity();
}, 100);

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
  cameraWidth / -3,
  cameraWidth / 3,
  cameraHeight / 3,
  cameraHeight / -3,
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

// FIXME: Thruster gets stuck on
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

  // console.log(landerBodyPhysics.velocity.y);

  if (pressedKeys.includes("ArrowUp")) {
    landerBodyPhysics.applyLocalImpulse(new CANNON.Vec3(0, 3.5, 0));
  }

  // TODO: I'm currently setting the quaternion rotations for steering
  //  A better method might be to apply rotational force
  if (pressedKeys.includes("ArrowLeft")) {
    landerRotation -= 0.075;
    landerBodyPhysics.quaternion.setFromEuler(0, 0, -landerRotation / 3);
    droRotationZ.innerHTML = landerRotation.toFixed(2);
  }

  if (pressedKeys.includes("ArrowRight")) {
    landerRotation += 0.075;
    landerBodyPhysics.quaternion.setFromEuler(0, 0, -landerRotation / 3);
    droRotationZ.innerHTML = landerRotation.toFixed(2);
  }

  landerRenderBody.position.copy(landerBodyPhysics.position);
  landerRenderBody.quaternion.copy(landerBodyPhysics.quaternion);

  camera.lookAt(landerRenderBody.position)
  camera.position.y = landerRenderBody.position.y + 400

  updateDroPosition();

  // Run the simulation independently of framerate every 1 / 60 ms
  world.fixedStep();

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
