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
      Map.scene.position.set(0, -80, 0);
      Map.matrixAutoUpdate = false;
      scene.add(Map.scene);

      scene.add(LandingPad(6));

      const mapMesh = gltf.scene.children[0];
      const mapShape = CannonUtils.CreateTrimesh(mapMesh.geometry);
      const mapBody = new CANNON.Body({ mass: 0 });
      mapBody.position.y = -80;

      mapBody.addShape(mapShape);
      world.addBody(mapBody);

      // const positions = mapMesh.geometry.attributes.position.array;
      // const points = [];

      // for (let i = 0; i < positions.length; i += 3) {
      //   points.push(
      //     new THREE.Vector3(positions[i], positions[i + 1], positions[i + 3])
      //   );
      // }

      // const convexHull = new ConvexGeometry(points);
      // const mapShape = new CANNON.ConvexPolyhedron(convexHull);
      // const mapBody = new CANNON.Body({ mass: 0 });
      // mapBody.addShape(mapShape);
      // world.addBody(mapBody);

      // console.log(positions);
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
