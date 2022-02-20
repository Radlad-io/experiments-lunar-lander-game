/////////////////////////////////
//                             //
//    Map: Instantiates map    //
//                             //
/////////////////////////////////

import { dev } from "@util/State.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "@components/MainScene.js";

//    Enviorment variables
const isDev = dev.get();

//    Loaders
const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

//    Baked material
import bakedMapTexture from "@components/models/map-baked.jpg";
const bakedTexture = textureLoader.load(bakedMapTexture);
bakedTexture.flipY = false;
bakedTexture.encoding = THREE.sRGBEncoding;
const bakedMaterial = new THREE.MeshBasicMaterial({
  map: bakedTexture,
});

//    Map model
import map from "@components/models/Map.glb";
let Map;
const load = () => {
  gltfLoader.load(
    map,
    (gltf) => {
      if (isDev) {
        console.log("Successfully loaded: Map GTLF");
      }
      // FIXME: Map texture not loading right
      // TODO: Material should change for OG graphics
      Map = gltf;
      // Map.scene.traverse((child) => {
      //   console.log(child.name);
      //   child.material = bakedMaterial;
      // });
      Map.scene.children[0].position.set(0, -50, 0);
      scene.add(Map.scene);
      return Map;
    },
    (xhr) => {
      if (isDev) {
        console.log(
          "Map " + Math.floor((xhr.loaded / xhr.total) * 100) + "% loaded"
        );
      }
    },
    (e) => {
      console.log("Error loading: Map GTLF", e);
    }
  );
};
load();

export { Map };
