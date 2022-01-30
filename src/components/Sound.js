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
import rotateFile from "./sounds/rotate.mp3";
import cameraDownFile from "./sounds/camera-down.mp3";
import cameraUpFile from "./sounds/camera-up.mp3";

// create a global audio source
const sound = new THREE.Audio(listener);

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();

//
const soundLoader = (file, sound, loop, volume) => {
  audioLoader.load(file, function (buffer) {
    sound.sound.setBuffer(buffer);
    sound.sound.setLoop(loop);
    sound.sound.setVolume(volume);
  });
};

// Volume mix
const mix = {
  ambience: 2.5,
  thrust: 2.5,
  rotate: 0.5,
  cameraUp: 0.75,
  cameraDown: 0.75,
};

// TODO: Should just be a mute fuction with status & set functions
// TODO: Create and export a mute function. Leverage via UI instead of play / pause.

const status = {
  get: () => {
    return muted;
  },
  set: () => {
    muted = !muted;
  },
};

let muted = false;
const mute = {
  status: () => {
    return muted;
  },
  toggle: () => {
    // if (muted) {
    //   ambience.sound.muted = false;
    // } else {
    //   ambience.sound.muted = true;
    // }
    ambience.sound.muted = true;
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
soundLoader(ambienceFile, ambience, true, mix.ambience);

const thrust = {
  sound: new THREE.Audio(listener),
  play: () => {
    thrust.sound.play();
  },
  pause: () => {
    thrust.sound.pause();
  },
  isPlaying: () => {
    return thrust.sound.isPlaying;
  },
};
soundLoader(thrustFile, thrust, true, mix.thrust);

const rotate = {
  sound: new THREE.Audio(listener),
  play: () => {
    rotate.sound.play();
  },
  pause: () => {
    rotate.sound.pause();
  },
};
soundLoader(rotateFile, rotate, false, mix.rotate);

const cameraUp = {
  sound: new THREE.Audio(listener),
  play: () => {
    cameraUp.sound.play();
  },
  pause: () => {
    cameraUp.sound.pause();
  },
};
soundLoader(cameraUpFile, cameraUp, false, mix.cameraUp);

const cameraDown = {
  sound: new THREE.Audio(listener),
  play: () => {
    cameraDown.sound.play();
  },
  pause: () => {
    cameraDown.sound.pause();
  },
};
soundLoader(cameraDownFile, cameraDown, false, mix.cameraDown);

export { mute, ambience, thrust, status, rotate, cameraUp, cameraDown };
