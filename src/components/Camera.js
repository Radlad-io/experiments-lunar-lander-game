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
camera.position.set(0, 1, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);

const cameraMove = () => {
  let isCameraFront = true;
  let isCameraMoving = false;
  window.addEventListener("keydown", (e) => {
    if (
      e.isComposing ||
      (e.key === "Shift" && isCameraFront && !isCameraMoving)
    ) {
      isCameraMoving = true;
      gsap
        .to(camera.position, {
          duration: 0.5,
          ease: "circ.none",
          x: -2,
          z: 0,
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
        .to(camera.position, { duration: 0.5, ease: "circ.none", x: 0, z: 2 })
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
