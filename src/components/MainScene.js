/////////////////////////////////////
//                                 //
//    Scene: Instantiates scene    //
//                                 //
/////////////////////////////////////

import * as THREE from "three";
import { graphics } from "@util/State.js";
import { Lighting } from "@components/Lighting.js";
import { Lander } from "@components/Lander.js";
import { Map } from "@components/Map.js";
import { Galaxy } from "@components/Galaxy.js";

const scene = new THREE.Scene();
scene.background = graphics.get()
  ? new THREE.Color(0xffffff)
  : new THREE.Color(0x000000);
scene.add(Galaxy, Lighting);

// const originGeo = new THREE.SphereBufferGeometry(1.5, 16, 8);
// const originMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
// const origin = new THREE.Mesh(originGeo, originMat);
// scene.add(Lander);

export { scene };
