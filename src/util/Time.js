////////////////////////////////////////
//                                    //
//    Time: Creates a global clock    //
//                                    //
////////////////////////////////////////

import * as THREE from "three";
import { playing, view, fuel, horizontalSpeed,verticalSpeed } from "@util/State.js";
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

setInterval(() => {
  verticalSpeed.set(landerBodyPhysics.velocity.y);
  if(view.get() === 'front'){
    horizontalSpeed.set(landerBodyPhysics.velocity.x)
  } else {
    horizontalSpeed.set(landerBodyPhysics.velocity.z)
  }
}, 100);

const tick = () => {
  // Adds stats HUD
  stats.begin();
  // Do stuff here

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  if (key._pressed.ArrowUp === true && fuel.get() > 0 && playing.get()) {
    landerPhysics.thrust();
    fuel.set();
    Sounds.thrust.play();
  } else {
    Sounds.thrust.pause();
  }

  if (
    key._pressed.ArrowLeft === true > 0 &&
    view.get() === "front" &&
    playing.get()
  ) {
    landerPhysics.left();
  }

  if (
    key._pressed.ArrowRight === true > 0 &&
    view.get() === "front" &&
    playing.get()
  ) {
    landerPhysics.right();
  }

  if (
    key._pressed.ArrowLeft === true > 0 &&
    view.get() === "side" &&
    playing.get()
  ) {
    landerPhysics.foward();
  }

  if (
    key._pressed.ArrowRight === true > 0 &&
    view.get() === "side" &&
    playing.get()
  ) {
    landerPhysics.backward();
  }

  if (playing.get()) {
    Lander.scene.position.copy(landerBodyPhysics.position);
    Lander.scene.quaternion.copy(landerBodyPhysics.quaternion);
    camera.lookAt(
      landerBodyPhysics.position.x,
      landerBodyPhysics.position.y,
      landerBodyPhysics.position.z
    );

    camera.position.y = landerBodyPhysics.position.y + 25;
    // Run the simulation independently of framerate every 1 / 60 ms
    world.fixedStep(1 / 60, deltaTime, 3);
  }

  composer.render(scene, camera);

  stats.end();
  window.requestAnimationFrame(tick);
};

export { tick };
