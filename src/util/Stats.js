/////////////////////////////////////////////////
//                                             //
//    Stats: Adds stats monitor to viewport    //
//                                             //
/////////////////////////////////////////////////

import { dev } from "@util/State.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
if (dev.get()) {
  document.body.appendChild(stats.dom);
}
