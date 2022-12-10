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
    name: "dirtColorTexture",
    type: "texture",
    path: "textures/dirt/color.jpg",
  },
  {
    name: "dirtNormalTexture",
    type: "texture",
    path: "textures/dirt/normal.jpg",
  },
  {
    name: "landerModel",
    type: "gltfModel",
    path: "models/lander.gltf",
  },
  {
    name: "map01Model",
    type: "gltfModel",
    path: "models/Map01.gltf",
  },
  // {
  //   name: "360Video",
  //   type: "video",
  //   path: "./videos/360_Video.mp4",
  // },
];
