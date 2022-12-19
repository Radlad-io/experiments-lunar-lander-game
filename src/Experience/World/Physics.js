import * as CANNON from "cannon-es";
import { CannonDebugRenderer } from "@Utils/CannonUtils.js";
import Experience from "@Experience/Experience.js";

export default class Physics {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.params = {
      enablePhysics: true,
      gravity: new CANNON.Vec3(0, -1.62, 0), // Earth -9.82 m/s² & Moon -1.62 m/s²
      friction: 0.1,
      restitution: 0.9,
      visualizeBodies: true,
    };

    this.setWorldPhysics();
    this.setDebug();
  }

  setWorldPhysics() {
    this.surfaceMaterial = new CANNON.Material("surface");
    this.landerMaterial = new CANNON.Material("lander");
    this.world = new CANNON.World({
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
    this.world.addContactMaterial(this.contactMaterial);
    if (this.debug.active) {
      this.visualize = new CannonDebugRenderer(this.scene, this.world);
    }
  }

  togglePhysicsVis() {
    this.scene.children.forEach((child) => {
      if (child.material?.name === "Debug Material") {
        this.params.visualizeBodies
          ? (child.visible = true)
          : (child.visible = false);
      }
    });
    this.params.visualizeBodies = !this.params.visualizeBodies;
  }

  setPhysicsGravity(value) {
    this.world.gravity = value;
  }

  setDebug() {
    // Create debug UI folder for Physics params
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Physics",
        expanded: true,
      });
      // Adds all params to debug UI
      Object.keys(this.params).forEach((key, index) => {
        this[key] = this.debugFolder.addInput(this.params, key);
        this[key].on("change", (e) => {
          key === "visualizeBodies" ? this.togglePhysicsVis() : null;
          this.params[key] = e.value;
          console.log(`Set ${key} to:`, this.params[key]);
        });
      });
    }
  }

  update() {
    if (this.params.enablePhysics) {
      if (this.params.visualizeBodies) {
        this.visualize.update();
      }
      this.world.step(1 / 60, this.time.delta, 2);
    }
  }
}
