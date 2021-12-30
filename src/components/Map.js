/////////////////////////////////
//                             //
//    Map: Instantiates map    //
//                             //
/////////////////////////////////

import { dev } from "@util/State.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "@components/MainScene.js";
import { initialCameraFlyIn } from "@components/Camera.js";
import map from "@components/models/Map.gltf";
import { LandingPad } from "@components/LandingPad.js";

const isDev = dev.get();
const gltfLoader = new GLTFLoader();

let Map;
const load = () => {
  gltfLoader.load(
    map,
    (gltf) => {
      if (isDev) {
        console.log("Successfully loaded: Map GTLF");
      }
      Map = gltf;
      Map.scene.children[0].position.set(0, -50, 0);
      scene.add(Map.scene);
      // const LandingPad1 = LandingPad(1, 12, 12, 12, 12);
      // LandingPad1.position.set(-35, -50, 20);
      // const LandingPad2 = LandingPad(2, 8, 8, 12, 12);
      // LandingPad2.position.set(30, -50, 27);
      // const LandingPad3 = LandingPad(4, 5, 5, 12, 12);
      // LandingPad3.position.set(20, -50, -15);
      // scene.add(LandingPad1, LandingPad2, LandingPad3);
      initialCameraFlyIn();
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
