import * as THREE from "three";
import * as CANNON from 'cannon-es'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import { Vec3 } from "cannon-es";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));
scene.background = new THREE.Color(0x000000);
const gui = new GUI();

// Physics
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
})

const radius = 5 // m
const sphereBody = new CANNON.Body({
  mass: 10, // kg
  shape: new CANNON.Sphere(radius),
  material: new CANNON.Material()
})
sphereBody.position.set(0, 50, 0) // m
world.addBody(sphereBody)

sphereBody.addEventListener('collide', (event) => {
  console.log('The sphere has collided', event)
})

const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
  material: new CANNON.Material()
})

groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
world.addBody(groundBody)

const geometry = new THREE.SphereGeometry(radius)
const material = new THREE.MeshNormalMaterial()
const sphereMesh = new THREE.Mesh(geometry, material)
scene.add(sphereMesh)

const groundGeometry = new THREE.BoxGeometry(50,50,50)
const groundMaterial = new THREE.MeshNormalMaterial()
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
groundMesh.position.set(0,-25,0)
scene.add(groundMesh)

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -1.5,
  cameraWidth / 1.5,
  cameraHeight / 1.5,
  cameraHeight / -1.5,
  0,
  1000
);

var gridXZ = new THREE.GridHelper(
  100,
  10,
  new THREE.Color(0xff0000),
  new THREE.Color(0xffffff)
);
gridXZ.position.set(0, 0);
gridXZ.rotation.set(0, 0, 0);
scene.add(gridXZ);

// camera.up.set(0, 0, 1);
// camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
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
camera.position.set(300, 300, 300);
controls.update();

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

    // Run the simulation independently of framerate every 1 / 60 ms
    world.fixedStep()

    sphereMesh.position.copy(sphereBody.position)
    sphereMesh.quaternion.copy(sphereBody.quaternion)

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();

document.addEventListener('keydown', (event) => {
  const maxSteerVal = 0.5
  const maxForce = .0001
  const brakeForce = 1000000

  switch (event.key) {
    case 'ArrowUp':
      sphereBody.applyImpulse(new CANNON.Vec3(0,25,0))
      break
  }
})

