import * as THREE from "three";

import Sizes from "@Utils/Sizes.js";
import Time from "@Utils/Time.js";
import Inputs from "@Utils/Inputs.js";
import Camera from "@Experience/Camera.js";
import Renderer from "@Experience/Renderer";
import World from "@World/World.js";
import Resources from "@Utils/Resources.js";
import Debug from "@Utils/Debug.js";

import Sources from "@Experience/sources.js";
import State from "@World/State.js";
import Store from "@Utils/Store.js";
import Sound from "@World/Sound.js";
import Interface from "@Experience/Interface.js";

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
    this.interface = new Interface();
    this.state = new State();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.sound = new Sound();
    this.resources = new Resources(Sources);
    this.renderer = new Renderer();
    this.world = new World();
    this.inputs = new Inputs();
    this.store = new Store();

    this.sizes.on("resize", () => {
      // Arrow function maintains context
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });

    // Fires start in lue of intro UI
    if (this.debug.active) {
      this.resources.on("loaded", () => {
        this.start();
      });
    }
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

  start() {
    this.sound.playSound("ambientSound");
    this.sound.playSound("musicSound");
    this.interface.intro.remove();

    // TODO: Store mute pref in localStorage
    // Update HUD
    this.highscore = this.store.getFromLocalStorage("highscore");
    this.state.highscore.set(this.highscore);
    this.interface.hud.update.highscore(this.highscore);
    this.interface.hud.update.fuel(this.state.fuel.get());
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
  }
}
