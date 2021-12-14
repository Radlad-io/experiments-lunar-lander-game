///////////////////////////////////////////
//                                       //
//    Renderer: Instantiates renderer    //
//                                       //
///////////////////////////////////////////

import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

export { renderer };
