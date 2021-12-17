/////////////////////////////////////
//                                 //
//    Scene: Instantiates scene    //
//                                 //
/////////////////////////////////////

import * as THREE from "three";
import * as Cube from "@components/models/Cube.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

scene.add(Cube.mesh);
Cube.mesh.position.set(0, 0, 0);

export { scene };
