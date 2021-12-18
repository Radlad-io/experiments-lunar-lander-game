////////////////////////////////////////
//                                    //
//    Time: Creates a global clock    //
//                                    //
////////////////////////////////////////

import * as Stats from "@util/Stats.js";
import { controls } from "@util/Controls.js";
import { renderer, composer } from "@util/Renderer.js";
import { scene } from "@components/MainScene.js";
import { camera } from "@components/Camera.js";

const tick = () => {
  // Adds stats HUD
  Stats.start();
  // Do stuff here

  // Renderer
  controls.update();
  composer.render(scene, camera);
  Stats.end();
  window.requestAnimationFrame(tick);
};

export { tick };
