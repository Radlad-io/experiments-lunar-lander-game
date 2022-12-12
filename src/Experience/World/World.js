import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
import CannonUtils from "../Utils/CannonUtils";
import CannonDebugRenderer from "../Utils/CannonDebugRenderer.ts";

import Environment from "@World/Environment.js";
import Map from "@World/Map";
import Lander from "@World/Lander";
import Stars from "@World/Stars";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.params = {
      enablePhysics: true,
      gravity: new CANNON.Vec3(0, -1.62, 0),
      // Earth -9.82 m/s²
      // Moon -1.62 m/s²
      friction: 0.1,
      restitution: 0.9,
      visualizePhysics: true,
    };

    this.setWorldPhysics();
    this.resources.on("loaded", () => {
      this.map = new Map();
      this.lander = new Lander();
      this.enviorment = new Environment();
      this.stars = new Stars();
    });

    this.setDebug();
  }

  setWorldPhysics() {
    this.surfaceMaterial = new CANNON.Material("surface");
    this.landerMaterial = new CANNON.Material("lander");
    this.physics = new CANNON.World({
      gravity: this.params.gravity,
      material: this.surfaceMaterial,
    });
    this.contactMaterial = new CANNON.ContactMaterial(
      this.surfaceMaterial,
      this.landerMaterial,
      {
        friction: this.params.friction,
        restitution: this.params.restitution,
      }
    );
    this.physics.addContactMaterial(this.contactMaterial);
    this.params.visualizePhysics ? this.addPhysicsVisualizer() : null;
  }

  // FIXME: add and remove methods don't really work
  addPhysicsVisualizer() {
    this.params.visualizePhysics = true;
    this.visualize = new CannonDebugRenderer(this.scene, this.physics);
  }

  removePhysicsVisualizer() {
    this.params.visualizePhysics = false;
    this.visualize.remove();
  }

  setDebug() {
    // Create debug UI folder for Physics params
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "World",
        expanded: true,
      });
    }

    // Adds all params to debug UI
    Object.keys(this.params).forEach((key, index) => {
      this[key] = this.debugFolder.addInput(this.params, key);
      this[key].on(
        "change",
        (e) => (
          (this.params[key] = e.value),
          console.log(`Set ${key} to:`, this.params[key])
        )
      );
    });
  }

  update() {
    this.physics.fixedStep(1 / 60, this.time.delta, 2);
    if (this.lander && this.map) {
      if (this.params.visualizePhysics) {
        this.visualize.update();
      }
      this.lander.update();
    }
  }
}
