////////////////////////////////////////////
//                                        //
//    Levels: Stores level information    //
//                                        //
////////////////////////////////////////////

import { level } from "@util/State.js";
import * as Map from "@components/Map.js";

import Map01 from "../assets/maps/Map01.gltf";
import Map02 from "../assets/maps/Map02.gltf";
import Map03 from "../assets/maps/Map03.gltf";

const list = {
  1: {
    map: Map01,
    pads: [
      [2, -12, -77.5, -24],
      [4, 50, -78, 40],
      [6, 40, -61.75, -56],
    ],
  },
  2: {
    map: Map02,
    pads: [
      [2, -30, -78, 25],
      [4, 40, -76.5, 0],
      [6, 16, -76, -43],
    ],
  },
  3: {
    map: Map03,
    pads: [
      [2, -30, -78, 25],
      [4, 40, -76.5, 0],
      [6, 16, -76, -43],
    ],
  },
};

const advance = () => {
  level.increment();
  Map.remove();
  Map.load(level.get());
};

export { list, advance };
