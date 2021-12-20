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
scene.background = new THREE.Color(0xffffff);
scene.add(lighting, landerLight.target);

gsap.to(landerLight.target.position, {
  duration: 12,
  ease: "bounce.out",
  x: 50,
});

import map from "@components/models/Map.gltf";
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  map,
  (gltf) => {
    console.log("Successfully loaded: Map GTLF");
    gltf.scene.children[0].position.set(0, 0, 0);
    scene.add(gltf.scene.children[0]);
  },
  () => {
    console.log("Progress");
  },
  () => {
    console.log("Error loading: Map GTLF");
  }
);

let Lander;
import lander from "@components/models/Lander.gltf";
gltfLoader.load(
  lander,
  (gltf) => {
    console.log("Successfully loaded: Lander GTLF");
    Lander = gltf;
    gltf.scene.position.set(0, 45, 0);
    scene.add(gltf.scene);
    initialCameraFlyIn();
    gsap.to(gltf.scene.position, {
      duration: 12,
      ease: "bounce.out",
      x: 50,
    });
    return Lander;
  },
  () => {
    console.log("Progress");
  },
  () => {
    console.log("Error loading: Lander GTLF");
  }
);

export { scene, Lander };
