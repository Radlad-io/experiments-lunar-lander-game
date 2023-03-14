// import FOX from 'models/Fox/glTF/Fox.gltf'
import * as THREE from "three";

export default [
  // ENV
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },
  // LANDER
  {
    name: "landerModel",
    type: "gltfModel",
    path: "models/lander.gltf",
  },
  //  MAPS
  {
    name: "Map01",
    type: "gltfModel",
    path: "models/Map01.gltf",
    pads: [
      {
        multiplier: 2,
        // position: new THREE.Vector3(30, 7, 42),
        position: [30, 7, 42],
      },
      {
        multiplier: 4,
        // position: new THREE.Vector3(-36, 8, 20),
        position: [-36, 8, 20],
      },
      {
        multiplier: 6,
        // position: new THREE.Vector3(38, 7.5, -43),
        position: [38, 7.5, -43],
      },
    ],
  },
  {
    name: "Map02",
    type: "gltfModel",
    path: "models/Map02.gltf",
    pads: [
      {
        multiplier: 2,
        position: [38, 5.5, 30],
      },
      {
        multiplier: 4,
        position: [-40, 4, 30],
      },
      {
        multiplier: 6,
        position: [-33, 25, -42],
      },
    ],
  },
  {
    name: "Map03",
    type: "gltfModel",
    path: "models/Map03.gltf",
    pads: [
      {
        multiplier: 2,
        position: [-18, 6, 45],
      },
      {
        multiplier: 4,
        position: [12, 9, -12],
      },
      {
        multiplier: 6,
        position: [-45, 13, -30],
      },
    ],
  },
  {
    name: "Map04",
    type: "gltfModel",
    path: "models/Map04.gltf",
    pads: [
      {
        multiplier: 2,
        position: [-40, 8, 45],
      },
      {
        multiplier: 4,
        position: [10, 7, -22],
      },
      {
        multiplier: 6,
        position: [38, 18, 60],
      },
    ],
  },
  {
    name: "Map05",
    type: "gltfModel",
    path: "models/Map05.gltf",
    pads: [
      {
        multiplier: 2,
        position: [-50, 10, 50],
      },
      {
        multiplier: 4,
        position: [34, 25, 17],
      },
      {
        multiplier: 6,
        position: [20, 22, -60],
      },
    ],
  },
  // SOUNDS
  {
    name: "ambientSound",
    type: "audio",
    path: "sounds/ambient.mp3",
  },
  {
    name: "thrustSound",
    type: "audio",
    path: "sounds/thrust.mp3",
  },
  {
    name: "musicSound",
    type: "audio",
    path: "sounds/music.mp3",
  },
  {
    name: "rotateSound",
    type: "audio",
    path: "sounds/rotate.mp3",
  },
  {
    name: "lowFuelSound",
    type: "audio",
    path: "sounds/beep.mp3",
  },
];
