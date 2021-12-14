///////////////////////////////////////
//                                   //
//    Camera: Instantiates camera    //
//                                   //
///////////////////////////////////////

import * as THREE from "three";
import { scene } from "@components/MainScene.js";

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.z = 3;
scene.add(camera);

export { camera };
