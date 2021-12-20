///////////////////////////////////////
//                                   //
//    Camera: Instantiates camera    //
//                                   //
///////////////////////////////////////

import * as THREE from "three";
import { dev } from "@util/State.js";
import { scene } from "@components/MainScene.js";
import gsap from "gsap";
gsap.registerPlugin(CustomEase);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.set(0, 200, 200);
camera.lookAt(0, 0, 0);
scene.add(camera);

const cameraMoveSpeed = 0.5;
let isCameraFront = true;
let isCameraMoving = true;

const initialCameraFlyIn = () => {
  gsap
    .to(camera.position, {
      duration: 2,
      ease: "circ.easeIn",
      x: 0,
      z: 80,
      y: 15,
    })
    .then(() => {
      isCameraMoving = false;
      if (dev.get()) {
        console.log("Debug output: Camera Position", camera.position);
      }
    });
};

const cameraMove = () => {
  window.addEventListener("keydown", (e) => {
    if (
      e.isComposing ||
      (e.key === "Shift" && isCameraFront && !isCameraMoving)
    ) {
      isCameraMoving = true;
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: "circ.easeIn",
          x: -80,
          z: 0,
          y: 15,
        })
        .then(() => {
          isCameraMoving = false;
          if (dev.get()) {
            console.log("Debug output: Camera position", camera.position);
          }
        });

      isCameraFront = false;
    } else if (
      e.isComposing ||
      (e.key === "Shift" && !isCameraFront && !isCameraMoving)
    ) {
      isCameraMoving = true;
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: "circ.easeIn",
          x: 0,
          z: 80,
          y: 15,
        })
        .then(() => {
          isCameraMoving = false;
          if (dev.get()) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
      isCameraFront = true;
    }
  });
};

export { camera, cameraMove, initialCameraFlyIn };
