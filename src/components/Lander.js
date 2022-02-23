//////////////////////////////////////////////
//                                          //
//    Lander: Instantiates lander object    //
//                                          //
//////////////////////////////////////////////

import { dev } from "@util/State.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "@components/MainScene.js";
import landerModel from "@components/models/Lander.gltf";
import { origin } from "@components/MainScene.js";

const isDev = dev.get();
const gltfLoader = new GLTFLoader();

let Lander;
const load = () => {
  gltfLoader.load(
    landerModel,
    (gltf) => {
      if (isDev) {
        console.log("Successfully loaded: Lander GTLF");
      }
      Lander = gltf;
      scene.add(Lander.scene);
      return Lander;
    },
    (xhr) => {
      if (isDev) {
        console.log(
          "Lander " + Math.floor((xhr.loaded / xhr.total) * 100) + "% loaded"
        );
      }
    },
    (e) => {
      console.log("Error loading: Lander GTLF", e);
    }
  );
};

load();

export { Lander, load };
