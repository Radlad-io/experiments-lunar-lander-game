///////////////////////////////////////////
//                                       //
//    Controls: Instantiates controls    //
//                                       //
///////////////////////////////////////////

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { camera } from "@components/Camera.js";
import { renderer } from "@util/Renderer.js";
import { debug } from "@/main.js";

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.update();

export { controls };
