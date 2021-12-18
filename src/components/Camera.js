///////////////////////////////////////
//                                   //
//    Camera: Instantiates camera    //
//                                   //
///////////////////////////////////////

import * as THREE from "three";
import { debug } from "@/main.js";
import { scene } from "@components/MainScene.js";
import gsap from "gsap";
gsap.registerPlugin(CustomEase);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.set(0, 15, 50);
camera.lookAt(0, 0, 0);
scene.add(camera);

const cameraMoveSpeed = 0.5;
let isCameraFront = true;
let isCameraMoving = false;
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
          x: -50,
          z: 0,
          y: 15,
        })
        .then(() => {
          isCameraMoving = false;
          if (debug) {
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
          z: 50,
          y: 15,
        })
        .then(() => {
          isCameraMoving = false;
          if (debug) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
      isCameraFront = true;
    }
  });
};

export { camera, cameraMove };
