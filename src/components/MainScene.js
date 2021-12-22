/////////////////////////////////////
//                                 //
//    Scene: Instantiates scene    //
//                                 //
/////////////////////////////////////

import * as THREE from "three";
import { initialCameraFlyIn } from "@components/Camera.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { lighting, landerLight } from "@components/Lighting.js";
import { Lander } from "@components/Lander.js";
import { galaxy } from "@components/Galaxy.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.add(lighting, landerLight.target);

const geometry = new THREE.CylinderGeometry(12, 12, 12, 12);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(-35, -50, 20);
scene.add(mesh);

import map from "@components/models/Map.gltf";
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  map,
  (gltf) => {
    console.log("Successfully loaded: Map GTLF");
    gltf.scene.children[0].position.set(0, -50, 0);
    scene.add(gltf.scene.children[0]);
  },
  (e) => {
    console.log(`Map load progress: ${e.loaded} / ${e.total}`);
  },
  () => {
    console.log("Error loading: Map GTLF");
  }
);

scene.add(galaxy);

export { scene };
