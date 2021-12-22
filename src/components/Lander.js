//////////////////////////////////////////////
//                                          //
//    Lander: Instantiates lander object    //
//                                          //
//////////////////////////////////////////////

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { scene } from "@components/MainScene.js";
import { initialCameraFlyIn } from "@components/Camera.js";
import lander from "@components/models/Lander.gltf";

const gltfLoader = new GLTFLoader();

let Lander;
const load = () => {
  gltfLoader.load(
    lander,
    (gltf) => {
      console.log("Successfully loaded: Lander GTLF");
      Lander = gltf;
      Lander.scene.position.set(0, 15, 0);
      scene.add(Lander.scene);
      initialCameraFlyIn();
      return Lander;
    },
    (e) => {
      console.log(`Lander load progress: ${e.loaded} / ${e.total}`);
    },
    (e) => {
      console.log("Error loading: Lander GTLF", e);
    }
  );
};

load();

export { Lander };
