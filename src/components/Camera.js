///////////////////////////////////////
//                                   //
//    Camera: Instantiates camera    //
//                                   //
///////////////////////////////////////

import * as THREE from "three";
import { dev } from "@util/State.js";
import { scene } from "@components/MainScene.js";
import { view } from "@util/State.js";
import gsap from "gsap";
gsap.registerPlugin(CustomEase);

// TODO: There camera is currently set to look at the scene origin. Needs to update with the Lander.
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  10,
  1000
);
camera.position.set(0, 2000, 1500);
scene.add(camera);

const cameraMoveSpeed = 0.4;
let isCameraFront = true;
let isCameraTop = false;
let isCameraMoving = true;

const initialCameraFlyIn = () => {
  gsap.to(camera.position, {
    duration: 5,
    ease: "power1.out",
    x: 0,
    z: 80,
  });
  gsap
    .to(camera.position, {
      duration: 5,
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
      (e.key === "Shift" && isCameraFront && !isCameraMoving && !isCameraTop)
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
          isCameraFront = false;
          view.set("side");
          if (dev.get()) {
            console.log("Debug output: Camera position", camera.position);
          }
        });
    } else if (
      e.isComposing ||
      (e.key === "Shift" && !isCameraFront && !isCameraMoving && !isCameraTop)
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
          isCameraFront = true;
          view.set("front");
          if (dev.get()) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
    } else if (
      e.isComposing ||
      (e.key === "Control" && !isCameraMoving && !isCameraTop && isCameraFront)
    ) {
      isCameraMoving = true;
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.304,0.068 0.368,0.222 0.5,0.5 0.638,0.792 0.822,1 1,1 "
          ),
          x: 0,
          y: 100,
          z: 0.1,
        })
        .then(() => {
          isCameraMoving = false;
          isCameraTop = true;
          view.set("top");
          if (dev.get()) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
    } else if (
      e.isComposing ||
      (e.key === "Control" && !isCameraMoving && isCameraTop && isCameraFront)
    ) {
      isCameraMoving = true;
      isCameraTop = false;
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.304,0.068 0.368,0.222 0.5,0.5 0.638,0.792 0.822,1 1,1 "
          ),
          x: 0,
          z: 80,
          y: 25,
        })
        .then(() => {
          isCameraMoving = false;
          isCameraTop = false;
          view.set(isCameraFront ? "front" : "side");
          if (dev.get()) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
    } else if (
      e.isComposing ||
      (e.key === "Control" && !isCameraMoving && !isCameraTop && !isCameraFront)
    ) {
      isCameraMoving = true;
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.304,0.068 0.368,0.222 0.5,0.5 0.638,0.792 0.822,1 1,1 "
          ),
          x: -0.1,
          z: 0,
          y: 100,
        })
        .then(() => {
          isCameraMoving = false;
          isCameraTop = true;
          view.set("top");
          if (dev.get()) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
    } else if (
      e.isComposing ||
      (e.key === "Control" && !isCameraMoving && isCameraTop && !isCameraFront)
    ) {
      isCameraMoving = true;
      gsap
        .to(camera.position, {
          duration: cameraMoveSpeed,
          ease: CustomEase.create(
            "custom",
            "M0,0 C0.304,0.068 0.368,0.222 0.5,0.5 0.638,0.792 0.822,1 1,1 "
          ),
          x: -80,
          z: 0,
          y: 25,
        })
        .then(() => {
          isCameraMoving = false;
          isCameraTop = false;
          view.set(isCameraFront ? "front" : "side");
          if (dev.get()) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
    }
  });
};

export { camera, cameraMove, initialCameraFlyIn };
