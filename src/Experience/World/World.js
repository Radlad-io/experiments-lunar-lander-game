import * as THREE from "three";
import * as CANNON from "cannon-es";
import { CannonUtils, CannonDebugRenderer } from "../Utils/CannonUtils.js";

import Experience from "@Experience/Experience.js";
import Physics from "@World/Physics.js";
import Environment from "@World/Environment.js";
import Map from "@World/Map";
import Lander from "@World/Lander";
import Stars from "@World/Stars";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.physics = new Physics();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.params = {};
    this.resources.on("loaded", () => {
      this.map = new Map();
      this.lander = new Lander();
      this.enviorment = new Environment();
      this.stars = new Stars();
    });
    this.setDebug();
  }

  setDebug() {
    // Create debug UI folder for Physics params
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "World",
        expanded: false,
      });

      // Adds all params to debug UI
      Object.keys(this.params).forEach((key, index) => {
        this[key] = this.debugFolder.addInput(this.params, key);
        this[key].on("change", (e) => {
          this.params[key] = e.value;
          console.log(`Set ${key} to:`, this.params[key]);
        });
      });
    }
  }

  update() {
    if (this.lander && this.map) {
      this.lander.update();
      this.physics.update();
    }
  }
}
