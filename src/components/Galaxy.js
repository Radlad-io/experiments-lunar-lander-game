/////////////////////////////////////////////////
//                                             //
//    Galaxy: Instantiates particle system    //
//                                             //
/////////////////////////////////////////////////

import * as THREE from "three";
import { graphics } from "@util/State.js";

const galaxyGeometry = new THREE.BufferGeometry();
const starCount = 500;
const starMaterial = new THREE.PointsMaterial({
  size: graphics.get() ? 0.5 : 1.25,
  color: graphics.get() ? new THREE.Color(0x000000) : new THREE.Color(0xffffff),
});

// TODO: Create a minimum distance from center point
const posArray = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 750;
}

galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

const Galaxy = new THREE.Points(galaxyGeometry, starMaterial);
Galaxy.name = "Galaxy";
export { Galaxy };
