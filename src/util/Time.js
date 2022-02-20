////////////////////////////////////////
//                                    //
//    Time: Creates a global clock    //
//                                    //
////////////////////////////////////////

import * as THREE from "three";
import { stats } from "@util/Stats.js";
import { controls } from "@util/Controls.js";
import { renderer, composer } from "@util/Renderer.js";
import { scene } from "@components/MainScene.js";
import { camera } from "@components/Camera.js";
import { world, landerBodyPhysics } from "@components/Physics.js";

import { Lander } from "@components/Lander.js";

const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  // Adds stats HUD
  stats.begin();
  // Do stuff here

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // Renderer
  controls.update();
  composer.render(scene, camera);

  // console.log(landerBodyPhysics.position);
  // scene.children[4].position.copy(landerBodyPhysics.position);

  // Run the simulation independently of framerate every 1 / 60 ms
  world.fixedStep(1 / 60, deltaTime, 2);

  stats.end();
  window.requestAnimationFrame(tick);
};

export { tick };
