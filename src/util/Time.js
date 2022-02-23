////////////////////////////////////////
//                                    //
//    Time: Creates a global clock    //
//                                    //
////////////////////////////////////////

import * as THREE from "three";
import { fuel, verticalSpeed } from "@util/State.js";
import { stats } from "@util/Stats.js";
import { key } from "@util/Controls.js";
import { renderer, composer } from "@util/Renderer.js";
import { scene } from "@components/MainScene.js";
import { camera } from "@components/Camera.js";
import {
  world,
  landerBodyPhysics,
  landerPhysics,
} from "@components/Physics.js";
import * as Sounds from "@components/Sound.js";

import { Lander } from "@components/Lander.js";

const clock = new THREE.Clock();
let oldElapsedTime = 0;

let init = false;
setTimeout(() => {
  init = true;
}, 1200);

setInterval(() => {
  verticalSpeed.set(landerBodyPhysics.velocity.y);
}, 100);

const tick = () => {
  // Adds stats HUD
  stats.begin();
  // Do stuff here

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  if (key._pressed.ArrowUp === true && fuel.get() > 0) {
    landerPhysics.thrust();
    fuel.set();
    Sounds.thrust.play();
  } else {
    Sounds.thrust.pause();
  }

  if (init) {
    Lander.scene.position.copy(landerBodyPhysics.position);
    camera.lookAt(
      landerBodyPhysics.position.x,
      landerBodyPhysics.position.y,
      landerBodyPhysics.position.z
    );
    camera.position.y = landerBodyPhysics.position.y + 25;
  }
  composer.render(scene, camera);

  // Run the simulation independently of framerate every 1 / 60 ms
  world.fixedStep(1 / 60, deltaTime, 3);

  stats.end();
  window.requestAnimationFrame(tick);
};

export { tick };
