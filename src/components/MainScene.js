/////////////////////////////////////
//                                 //
//    Scene: Instantiates scene    //
//                                 //
/////////////////////////////////////

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mesh } from "@components/models/Cube.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

import map from "@components/models/lander-game.gltf";
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  map,
  (gltf) => {
    console.log("Success");
    gltf.scene.children[0].position.set(0, 0, 0);
    // var object = gltf.scene;
    // object.traverse((node) => {
    //   if (!node.isMesh) return;
    //   node.material.wireframe = true;
    // });
    scene.add(gltf.scene.children[0]);
  },
  () => {
    console.log("Progress");
  },
  () => {
    console.log("Error");
  }
);
mesh.position.set(15, 5, 30);
scene.add(mesh);

export { scene };
