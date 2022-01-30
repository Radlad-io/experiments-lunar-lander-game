/////////////////////////////////////
//                                 //
//    Scene: Instantiates scene    //
//                                 //
/////////////////////////////////////

import * as THREE from "three";
import { Lighting } from "@components/Lighting.js";
import { Lander } from "@components/Lander.js";
import { Map } from "@components/Map.js";
import { Galaxy } from "@components/Galaxy.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.add(Galaxy, Lighting);
console.log(scene);

export { scene };
