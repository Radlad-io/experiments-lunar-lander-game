//////////////////////////////////////////////////////////////
//                                                          //
//    Sounds: Creates API for playing and puasing sounds    //
//                                                          //
//////////////////////////////////////////////////////////////

import * as THREE from "three";
import { camera } from "@components/Camera.js";

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add(listener);

// Import sound files
import ambienceFile from "./sounds/ambience.mp3";
import thrustFile from "./sounds/thrust.mp3";

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();

let muted = false;
const status = {
  get: () => {
    return muted;
  },
  set: () => {
    muted = !muted;
  },
};

const ambience = {
  sound: new THREE.Audio(listener),
  play: () => {
    ambience.sound.play();
  },
  pause: () => {
    ambience.sound.pause();
  },
};
audioLoader.load(ambienceFile, function (buffer) {
  ambience.sound.setBuffer(buffer);
  ambience.sound.setLoop(true);
  ambience.sound.setVolume(1);
});

const thrust = {
  sound: new THREE.Audio(listener),
  play: () => {
    thrust.sound.play();
  },
  pause: () => {
    thrust.sound.pause();
  },
};
audioLoader.load(thrustFile, function (buffer) {
  ambience.sound.setBuffer(buffer);
  ambience.sound.setLoop(true);
  ambience.sound.setVolume(1);
});

export { ambience, status };
