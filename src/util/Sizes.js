///////////////////////////////////////////////////
//                                               //
//    Resize: Handles viewport resizing event    //
//                                               //
///////////////////////////////////////////////////

import { camera } from "@components/Camera.js";
import { renderer } from "@util/Renderer.js";

function handleResize() {
  window.addEventListener("resize", onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export { handleResize };
