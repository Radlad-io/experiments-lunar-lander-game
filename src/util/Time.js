////////////////////////////////////////
//                                    //
//    Time: Creates a global clock    //
//                                    //
////////////////////////////////////////

import * as THREE from "three";
import {
  playing,
  cameraMoving,
  view,
  fuel,
  altitude,
  horizontalSpeed,
  verticalSpeed,
  dev,
  level,
} from "@util/State.js";
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
import * as Map from "@components/Map.js";
import CannonDebugger from "cannon-es-debugger";

import * as Sounds from "@components/Sound.js";
import * as UI from "@components/UI.js";
import { Lander } from "@components/Lander.js";

const cannonDebugger = new CannonDebugger(scene, world);

const clock = new THREE.Clock();
let oldElapsedTime = 0;

//  TODO: Should be able to map through children and get the closest contact point
//  FIXME: Double check that it's not reporting negative values when on pads
let intersects;
const altitudeRayCaster = new THREE.Raycaster();
const rayTo = new THREE.Vector3(0, -1, 0);
rayTo.normalize();
// altitudeRayCaster.set(landerBodyPhysics.position, rayTo);

const updateAlititude = () => {
  altitudeRayCaster.set(landerBodyPhysics.position, rayTo);
  intersects = altitudeRayCaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    altitude.set(intersects[0].distance);
  }
};

setInterval(() => {
  verticalSpeed.set(landerBodyPhysics.velocity.y);
  if (view.get() === "front") {
    horizontalSpeed.set(landerBodyPhysics.velocity.x);
  } else {
    horizontalSpeed.set(landerBodyPhysics.velocity.z);
  }
  updateAlititude();
}, 100);

setInterval(() => {
  if (fuel.get() < 200) {
    Sounds.lowFuel.play();
    UI.initLowFuelIndicator.toggle();
  }
}, 2000);

Map.load(level.get());

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
    key._pressed.ArrowLeft === true &&
    view.get() === "front" &&
    playing.get()
  ) {
    landerPhysics.left();
  }

  if (
    key._pressed.ArrowRight === true &&
    view.get() === "front" &&
    playing.get()
  ) {
    landerPhysics.right();
  }

  if (
    key._pressed.ArrowLeft === true &&
    view.get() === "side" &&
    playing.get()
  ) {
    landerPhysics.foward();
  }

  if (
    key._pressed.ArrowRight === true &&
    view.get() === "side" &&
    playing.get()
  ) {
    landerPhysics.backward();
  }

  if (playing.get()) {
    // Run the simulation independently of framerate every 1 / 60 ms
    world.fixedStep(1 / 60, deltaTime, 2);

    Lander.scene.position.copy(landerBodyPhysics.position);
    Lander.scene.quaternion.copy(landerBodyPhysics.quaternion);
    camera.lookAt(
      landerBodyPhysics.position.x,
      landerBodyPhysics.position.y,
      landerBodyPhysics.position.z
    );

    camera.position.y = landerBodyPhysics.position.y + 25;

    if (view.get() === "front" && !cameraMoving.get()) {
      camera.position.x = landerBodyPhysics.position.x;
    }
    if (view.get() === "side" && !cameraMoving.get()) {
      camera.position.z = landerBodyPhysics.position.z;
    }

    // if (dev.get()) {
    //   cannonDebugger.update();
    // }
  }

  composer.render(scene, camera);

  stats.end();
  window.requestAnimationFrame(tick);
};

export { tick };
