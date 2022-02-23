///////////////////////////////////////////
//                                       //
//    Renderer: Instantiates renderer    //
//                                       //
///////////////////////////////////////////

import * as THREE from "three";

import { graphics } from "@util/State.js";
import { scene } from "@components/MainScene.js";
import { camera } from "@components/Camera.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";

let composer;
let effectSobel;

const params = {
  enable: true,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  powerPreference: "high-performance",
  // antialias: true,
  // NOTE: Antialias isn't supposed to work with postprocessing
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;

composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

effectSobel = new ShaderPass(SobelOperatorShader);
effectSobel.uniforms["resolution"].value.x =
  window.innerWidth * window.devicePixelRatio;
effectSobel.uniforms["resolution"].value.y =
  window.innerHeight * window.devicePixelRatio;

if (graphics.get()) {
  composer.addPass(effectSobel);
}

//  B&W Line padd
const setSobel = (isOn) => {
  if (isOn) {
    composer.addPass(effectSobel);
  } else {
    composer.removePass(effectSobel);
  }
};

//  Anti Aliasing Pass
const aaPass = new SMAAPass(
  window.innerWidth * renderer.getPixelRatio(),
  window.innerHeight * renderer.getPixelRatio()
);
composer.addPass(aaPass);

export { renderer, composer, setSobel };
