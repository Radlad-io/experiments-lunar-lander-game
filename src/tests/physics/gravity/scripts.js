import * as THREE from "three";
import * as CANNON from 'cannon-es'

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));
scene.background = new THREE.Color(0x000000);
const gui = new GUI();

// Physics
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -1.62, 0), 
  // Earth -9.82 m/s²
  // Moon -1.62 m/s²
})

const radius = 5 // m
const sphereBody = new CANNON.Body({
  mass: 50, // kg
  shape: new CANNON.Box( new CANNON.Vec3(2.5, 2.5, 2.5)),
  material: new CANNON.Material(),
  velocity: new CANNON.Vec3(0,-10,0)
})
sphereBody.position.set(0, 75, 0)

world.addBody(sphereBody)

sphereBody.addEventListener('collide', (event) => {
  console.log('The sphere has collided', event)
})

const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
  material: new CANNON.Material()
})
10
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
world.addBody(groundBody)

const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshNormalMaterial()
const sphereMesh = new THREE.Mesh(geometry, material)
scene.add(sphereMesh)

const padGeometry = new THREE.CylinderBufferGeometry(10,10,.1,20)
const padMaterial = new THREE.MeshBasicMaterial({color: 0xffffff})
const padMesh = new THREE.Mesh(padGeometry, padMaterial)
padMesh.position.set(-100,0,0)
scene.add(padMesh)

const pad2Geometry = new THREE.CylinderBufferGeometry(18,18,.1,20)
const pad2Material = new THREE.MeshBasicMaterial({color: 0xffffff})
const pad2Mesh = new THREE.Mesh(pad2Geometry, pad2Material)
pad2Mesh.position.set(100,0,0)
scene.add(pad2Mesh)

const groundGeometry = new THREE.PlaneGeometry(400, 400)
const groundMaterial = new THREE.MeshBasicMaterial({color: 0xaaaaaa})
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
groundMesh.rotation.set( -Math.PI / 2,0,0)
scene.add(groundMesh)

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

const droRotationX = document.querySelector(".rotationX")
const droRotationY = document.querySelector(".rotationY")
const droTouchdown = document.querySelector(".touchdown")

const maxRotate = 4
let landerRotation = 0
let pressedKeys = []

document.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowUp':
      if(pressedKeys.includes('ArrowUp')){
        break
      }
      pressedKeys.push('ArrowUp')
      break
    case 'ArrowLeft':
      if(pressedKeys.includes('ArrowLeft')){
        break
      }
      pressedKeys.push('ArrowLeft')
      break
    case 'ArrowRight':
      if(pressedKeys.includes('ArrowRight')){
        break
      }
      pressedKeys.push('ArrowRight')
      break
  }
})

document.addEventListener('keyup', (event) => {
  switch(event.key) {
    case 'ArrowUp':
      pressedKeys.pop('up')
      break
    case 'ArrowLeft':
      pressedKeys.pop('ArrowLeft')
      break
    case 'ArrowRight':
      pressedKeys.pop('ArrowRight')
      break
  }
})


function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  if(pressedKeys.includes('ArrowUp')){
    sphereBody.applyLocalImpulse(new CANNON.Vec3(0,3.5,0))
  }

  if(pressedKeys.includes('ArrowLeft')){
      if(landerRotation >= -maxRotate){
        landerRotation -= .05
        sphereBody.quaternion.setFromEuler(0, 0, -landerRotation / 3);
        droRotationX.innerHTML = landerRotation.toFixed(2)
      }
  }

  if(pressedKeys.includes('ArrowRight')){
         if(landerRotation <= maxRotate){
          landerRotation += .05
          sphereBody.quaternion.setFromEuler(0, 0, -landerRotation / 3);
          droRotationX.innerHTML = landerRotation.toFixed(2)
        }
  }


  sphereMesh.position.copy(sphereBody.position)
  sphereMesh.quaternion.copy(sphereBody.quaternion)

  // Run the simulation independently of framerate every 1 / 60 ms
  world.fixedStep()


  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
