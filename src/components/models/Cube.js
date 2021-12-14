////////////////////////////////////
//                                //
//    Cube: Create a Cube Mesh    //
//                                //
////////////////////////////////////

import * as THREE from "three";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);

export { mesh };
