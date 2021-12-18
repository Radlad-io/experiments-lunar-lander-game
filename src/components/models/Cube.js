////////////////////////////////////
//                                //
//    Cube: Create a Cube Mesh    //
//                                //
////////////////////////////////////

import * as THREE from "three";

const geometry = new THREE.BoxGeometry(8, 8, 8);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
const mesh = new THREE.Mesh(geometry, material);

export { mesh };
