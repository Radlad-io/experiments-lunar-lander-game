///////////////////////////////////////////
//                                       //
//    Renderer: Instantiates renderer    //
//                                       //
///////////////////////////////////////////

import * as THREE from "three";
import { scene } from "@components/MainScene.js";
import { camera } from "@components/Camera.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader.js";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader.js";

let composer;
let effectSobel;

const params = {
  enable: true,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// color to grayscale conversion

const effectGrayScale = new ShaderPass(LuminosityShader);
composer.addPass(effectGrayScale);

// you might want to use a gaussian blur filter before
// the next pass to improve the result of the Sobel operator

// Sobel operator

effectSobel = new ShaderPass(SobelOperatorShader);
effectSobel.uniforms["resolution"].value.x =
  window.innerWidth * window.devicePixelRatio;
effectSobel.uniforms["resolution"].value.y =
  window.innerHeight * window.devicePixelRatio;
composer.addPass(effectSobel);

export { renderer, composer };
