///////////////////////////////////////
//                                   //
//    Camera: Instantiates camera    //
//                                   //
///////////////////////////////////////

import * as THREE from "three";
import { dev } from "@util/State.js";
import { scene } from "@components/MainScene.js";
import { view } from "@util/State.js";
import { rotate, cameraUp, cameraDown } from "@components/Sound.js";
import { Lander } from "@components/Lander.js";

import gsap from "gsap";
gsap.registerPlugin(CustomEase);

// TODO: There camera is currently set to look at the scene origin. Needs to update with the Lander.
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
camera.position.set(0, 0, 2000);
// camera.position.set(0, 25, 80);
camera.lookAt(scene.position);
scene.add(camera);

// TODO: Refactor this into Util/State
const cameraMoveSpeed = 0.25;

// TODO: Use state view instead
let isCameraFront = true;
// TODO: Hoist this state into State.js
let isCameraMoving = false;

const move = {
  initialCameraFlyIn: () => {
    gsap.to(camera.position, {
      duration: 5,
      ease: "power1.out",
      x: 0,
      z: 80,
    })
      .then(() => {
        isCameraMoving = false;
        if (dev.get()) {
          console.log("Debug output: Camera Position", camera.position);
        }
      });
  },
  rotate: () => {
    if (isCameraFront && !isCameraMoving) {
      isCameraMoving = true;
      rotate.play();
      gsap.to(camera.position, {
        duration: cameraMoveSpeed,
        ease: "circ.out",
        x: Lander.scene.position.x - 80,
      });
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: "none",
          z: Lander.scene.position.z,
        })
        .then(() => {
          isCameraMoving = false;
          isCameraFront = false;
          view.set("side");
          if (dev.get()) {
            console.log("Debug output: Camera position", camera.position);
          }
        });
    } else if (!isCameraFront && !isCameraMoving) {
      isCameraMoving = true;
      rotate.play();
      gsap.to(camera.position, {
        duration: cameraMoveSpeed,
        ease: "none",
        x: Lander.scene.position.x,
      });
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: "circ.out",
          z: Lander.scene.position.z + 80,
        })
        .then(() => {
          isCameraMoving = false;
          isCameraFront = true;
          view.set("front");
          if (dev.get()) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
    }
  },
};

export { camera, move };
