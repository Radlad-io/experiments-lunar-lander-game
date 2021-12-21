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
  35,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
camera.position.set(0, 400, 0);
scene.add(camera);

const cameraMoveSpeed = 0.65;
let isCameraFront = true;
let isCameraMoving = true;

const initialCameraFlyIn = () => {
  gsap.to(camera.position, {
    duration: 2,
    ease: "back.out(1.7)",
    x: 0,
    z: 80,
  });
  gsap
    .to(camera.position, {
      duration: 2,
      ease: "power1.out",
      y: 25,
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
      gsap.to(camera.position, {
        duration: cameraMoveSpeed,
        ease: "circ.out",
        x: -80,
      });
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: "none",
          z: 0,
          y: 25,
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
      gsap.to(camera.position, {
        duration: cameraMoveSpeed,
        ease: "none",
        x: 0,
      });
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: "circ.out",
          z: 80,
          y: 25,
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
