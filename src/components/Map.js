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

//    Emission Material
const landingPadMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});

//    Text Material
const textMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
});

//    Map model
import map from "@components/models/Map.glb";
import { LandingPad } from "./LandingPad";
let Map;
const load = () => {
  gltfLoader.load(
    map,
    (gltf) => {
      if (isDev) {
        console.log("Successfully loaded: Map GTLF");
      }
      Map = gltf;
      Map.scene.traverse((child) => {
        console.log(child.name);
        // TODO: Material should change for OG graphics
        child.material = bakedMaterial;
      });

      //    Remap landing pad material to three material
      let landingPads = [];
      const landingPadMesh = Map.scene.children.find((child) => {
        if (child.name.includes("LandingPad")) {
          landingPads.push(child);
        }
      });
      landingPads.map((pad) => {
        pad.material = landingPadMaterial;
      });

      //    Remap landing pad text material to three material
      let landingPadText = [];
      const landingPadTextMesh = Map.scene.children.find((child) => {
        if (child.name.includes("Text")) {
          landingPadText.push(child);
        }
      });
      landingPadText.map((text) => {
        text.material = textMaterial;
      });

      Map.scene.children[0].position.set(0, -50, 0);
      Map.scene.children[1].position.set(0, -50, 0);
      Map.scene.children[2].position.set(0, -50, 0);
      Map.scene.children[3].position.set(0, -50, 0);
      Map.scene.children[4].position.set(0, -37.5, 0);
      Map.scene.children[5].position.set(0, -42, 0);
      Map.scene.children[6].position.set(0, -42, 0);
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
