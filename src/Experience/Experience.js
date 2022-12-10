import * as THREE from "three";

import Sizes from "@Utils/Sizes.js";
import Time from "@Utils/Time.js";
import Camera from "@Experience/Camera.js";
import Renderer from "@Experience/Renderer";
import World from "@World/World.js";
import Resources from "@Utils/Resources.js";
import Debug from "@Utils/Debug.js";

import Sources from "@Experience/sources.js";

//  Instancing is for singletons
let instance = null;
export default class Experience {
  constructor(canvas) {
    // Create experience as singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.experience = this;

    // Options
    this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(Sources);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    // this.vr = new VR();

    this.sizes.on("resize", () => {
      // Arrow function maintains context
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });

    this.camera.controls.dispose();
    this.renderer.instance.dispose();

    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
