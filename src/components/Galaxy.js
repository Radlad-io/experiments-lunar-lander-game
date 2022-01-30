/////////////////////////////////////////////////
//                                             //
//    Galaxy: Instantiates particle system    //
//                                             //
/////////////////////////////////////////////////

import * as THREE from "three";

const galaxyGeometry = new THREE.BufferGeometry();
const starCount = 500;
const starMaterial = new THREE.PointsMaterial({
  size: 0.5,
  color: new THREE.Color(0x000000),
});

const posArray = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 750;
}

galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

const Galaxy = new THREE.Points(galaxyGeometry, starMaterial);

export { Galaxy };
