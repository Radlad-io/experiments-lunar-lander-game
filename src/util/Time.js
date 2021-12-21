////////////////////////////////////////
//                                    //
//    Time: Creates a global clock    //
//                                    //
////////////////////////////////////////

import {stats} from "@util/Stats.js";
import { controls } from "@util/Controls.js";
import { renderer, composer } from "@util/Renderer.js";
import { scene } from "@components/MainScene.js";
import { camera } from "@components/Camera.js";

const tick = () => {
  // Adds stats HUD
  stats.begin();
  // Do stuff here

  // Renderer
  controls.update();
  composer.render(scene, camera);
  stats.end();
  window.requestAnimationFrame(tick);
};

export { tick };
