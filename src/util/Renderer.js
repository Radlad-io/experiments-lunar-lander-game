///////////////////////////////////////////
//                                       //
//    Renderer: Instantiates renderer    //
//                                       //
///////////////////////////////////////////

import * as THREE from "three";

import { dev, graphics } from "@util/State.js";
import { scene } from "@components/MainScene.js";
import { camera } from "@components/Camera.js";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader.js";

import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";

let composer;
let effectSobel;

const params = {
  enable: true,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

const setSobel = (isOn) => {
  if (isOn) {
    composer.addPass(effectSobel);
  } else {
    composer.removePass(effectSobel);
  }
};

let composer1, composer2, fxaaPass, container;
container = document.querySelector("canvas.webgl");
fxaaPass = new ShaderPass(FXAAShader);
const copyPass = new ShaderPass(CopyShader);

composer1 = new EffectComposer(renderer);
composer1.addPass(renderPass);
composer1.addPass(copyPass);

const pixelRatio = renderer.getPixelRatio();

fxaaPass.material.uniforms["resolution"].value.x =
  1 / (container.offsetWidth * pixelRatio);
fxaaPass.material.uniforms["resolution"].value.y =
  1 / (container.offsetHeight * pixelRatio);

composer2 = new EffectComposer(renderer);
composer2.addPass(renderPass);
composer2.addPass(fxaaPass);

export { renderer, composer, setSobel };
