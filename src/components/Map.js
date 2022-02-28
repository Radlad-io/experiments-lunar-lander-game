/////////////////////////////////
//                             //
//    Map: Instantiates map    //
//                             //
/////////////////////////////////

import { dev } from "@util/State.js";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import {
  world,
  landerBodyPhysics,
  landerPhysics,
} from "@components/Physics.js";

import CannonUtils from "@util/CannonUtil.ts";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";

import * as Levels from "@components/Levels.js";

import { scene } from "@components/MainScene.js";
import { LandingPad } from "@components/LandingPad.js";

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

//    Map models
import Map01 from "../assets/maps/Map01.gltf";
import Map02 from "../assets/maps/Map02.gltf";
import Map03 from "../assets/maps/Map03.gltf";

let Map;
const load = (level) => {
  gltfLoader.load(
    Levels.list[level].map,
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
      Map.scene.position.set(0, -80, 0);
      Map.matrixAutoUpdate = false;
      Map.scene.name = `Map.${level}`;
      scene.add(Map.scene);

      // Adding landing Pads to map
      Levels.list[level].pads.map((pad) => {
        console.log(pad);
        scene.add(LandingPad(pad[0], pad[1], pad[2], pad[3]));
      });

      const mapMesh = gltf.scene.children[0];
      const mapShape = CannonUtils.CreateTrimesh(mapMesh.geometry);
      const mapBody = new CANNON.Body({ mass: 0 });
      mapBody.position.y = -80;

      mapBody.addShape(mapShape);
      world.addBody(mapBody);

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

export { Map, load };
