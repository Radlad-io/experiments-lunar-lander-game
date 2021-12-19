/////////////////////////////////////
//                                 //
//    Scene: Instantiates scene    //
//                                 //
/////////////////////////////////////

import * as THREE from "three";
import { initialCameraFlyIn } from "@components/Camera.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import {
  lighting,
  landerLight,
  landerLightHelper,
} from "@components/Lighting.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
scene.add(lighting, landerLight.target);

gsap.to(landerLight.target.position, {
  duration: 12,
  ease: "bounce.out",
  x: 50,
});

import map from "@components/models/lander-game-map2.gltf";
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  map,
  (gltf) => {
    console.log("Success");
    gltf.scene.children[0].position.set(0, 0, 0);
    scene.add(gltf.scene.children[0]);
    initialCameraFlyIn();
  },
  () => {
    console.log("Progress");
  },
  () => {
    console.log("Error");
  }
);

export { scene };
