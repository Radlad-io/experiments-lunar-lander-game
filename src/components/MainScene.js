/////////////////////////////////////
//                                 //
//    Scene: Instantiates scene    //
//                                 //
/////////////////////////////////////

import * as THREE from "three";
import { initialCameraFlyIn } from "@components/Camera.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { lighting, landerLight } from "@components/Lighting.js";
import { Lander } from "@components/Lander.js";
import { Map } from "@components/Map.js";
import { galaxy } from "@components/Galaxy.js";
import { LandingPad } from "@components/LandingPad.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
scene.add(lighting, landerLight.target);

const pad1 = LandingPad(4, 12, 12, 12, 12);
pad1.position.set(-35, -50, 20);
scene.add(pad1);

scene.add(galaxy);

export { scene };
