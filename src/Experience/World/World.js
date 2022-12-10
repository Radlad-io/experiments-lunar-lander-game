import * as THREE from "three";
import Experience from "@Experience/Experience.js";

import Environment from "@World/Environment.js";
import Floor from "@World/Floor";
import Lander from "@World/Lander";
import Physics from "@World/Physics";
import Stars from "@World/Stars";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on("loaded", () => {
      this.floor = new Floor();
      this.lander = new Lander();
      this.enviorment = new Environment();
      this.stars = new Stars();
      this.physics = new Physics();
    });
  }

  update() {
    if (this.fox) {
      this.fox.update();
    }
  }
}
