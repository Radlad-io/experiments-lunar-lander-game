// import FOX from 'models/Fox/glTF/Fox.gltf'

export default [
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
  {
    name: "landerModel",
    type: "gltfModel",
    path: "models/lander.gltf",
  },
  {
    name: "Map01",
    type: "gltfModel",
    path: "models/Map01.gltf",
    pads: [
      {
        multiplier: 2,
        position: [0, 2, 0],
      },
      {
        multiplier: 4,
        position: [0, 2, 0],
      },
      {
        multiplier: 6,
        position: [0, 2, 0],
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
        position: [-30, 0, 25],
      },
      {
        multiplier: 4,
        position: [40, 0, 0],
      },
      {
        multiplier: 6,
        position: [16, 0, -43],
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
        position: [-30, 0, 25],
      },
      {
        multiplier: 4,
        position: [40, 0, 0],
      },
      {
        multiplier: 6,
        position: [16, 0, -43],
      },
    ],
  },
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
