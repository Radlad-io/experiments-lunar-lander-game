///////////////////////////////////////
//                                   //
//    Camera: Instantiates camera    //
//                                   //
///////////////////////////////////////

import * as THREE from "three";
import { dev, cameraMoving } from "@util/State.js";
import { scene } from "@components/MainScene.js";
import { view, level } from "@util/State.js";
import { rotate, cameraUp, cameraDown } from "@components/Sound.js";
import { Lander } from "@components/Lander.js";

import gsap from "gsap";
gsap.registerPlugin(CustomEase);

// TODO: There camera is currently set to look at the scene origin. Needs to update with the Lander.
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  5,
  1000
);
camera.position.set(0, 0, 2000);
camera.lookAt(scene.position);
camera.name = "Camera";
scene.add(camera);

// TODO: Hoist this state into State.js
const cameraMoveSpeed = 0.25;

// TODO: Use state view instead
let isCameraFront = true;
// TODO: Hoist this state into State.js
let isCameraMoving = false;

const move = {
  initialCameraFlyIn: () => {
    gsap
      .fromTo(camera.position, {
        x: 0,
        y: 0,
        z: level.get() == 1 ? 2000 : 1000,
      },{
        duration: 5,
        ease: "power1.out",
        x: 0,
        z: 80,
      })
      .then(() => {
        isCameraMoving = false;
        cameraMoving.toggle();
        if (dev.get()) {
          console.log("Debug output: Camera Position", camera.position);
        }
      });
  },
  rotate: () => {
    cameraMoving.toggle();
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
          cameraMoving.toggle();
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
          cameraMoving.toggle();
          view.set("front");
          if (dev.get()) {
            console.log("Debug output: Camera Position", camera.position);
          }
        });
    }
  },
};

export { camera, move };
