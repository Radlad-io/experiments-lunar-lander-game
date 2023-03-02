import * as CANNON from "cannon-es";
import { CannonDebugRenderer } from "@Utils/CannonUtils.js";
import Experience from "@Experience/Experience.js";

export default class Physics {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.state = this.experience.state;
    this.params = {
      physicsEnabled: false,
      visualizeBodies: false,
      gravity: new CANNON.Vec3(0, -1.62, 0), // Earth -9.82 m/s² & Moon -1.62 m/s²
      friction: 0.1,
      restitution: 0.9,
      maxSubSteps: 1,
    };

    this.setState();
    this.setWorldPhysics();
    this.setDebug();
  }

  setState() {
    // this.state.physicsEnabled.set(this.params.enablePhysics);
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

  updatePhysicsVis() {
    this.scene.children.forEach((child) => {
      if (child.material?.name === "Debug Material") {
        this.params.visualizeBodies
          ? (child.visible = true)
          : (child.visible = false);
      }
    });
    this.params.visualizeBodies = !this.params.visualizeBodies;
  }

  updateGravity(gravity) {
    this.world.gravity = gravity;
  }
  updateContactfriction(friction) {
    this.world.contactmaterials[0].friction = friction;
  }
  updateContactRestitution(restitution) {
    this.world.contactmaterials[0].restitution = restitution;
  }
  stepPhysics() {
    // Direction: Enum 1 / -1
    this.world.step(1 / 60, this.time.delta, this.params.maxSubSteps);
    // FIXME: This seems to break after contact
  }

  setDebug() {
    // Create debug UI folder for Physics params
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Physics",
        expanded: false,
      });
      // Adds all params to debug UI
      Object.keys(this.params).forEach((key, index) => {
        if (key === "enablePhysics") {
          return;
        }
        this[key] = this.debugFolder.addInput(this.params, key);
        this[key].on("change", (e) => {
          key === "visualizeBodies" ? this.updatePhysicsVis() : null;
          key === "gravity" ? this.updateGravity(e.value) : null;
          key === "friction" ? this.updateContactfriction(e.value) : null;
          key === "restitution" ? this.updateContactRestitution(e.value) : null;
          this.params[key] = e.value;
          console.log(`Set ${key} to:`, this.params[key]);
        });
      });

      // Buttons
      this.fowardPhysicsBtn = this.debugFolder.addButton({
        title: "Step Foward",
      });

      this.fowardPhysicsBtn.on("click", () => {
        this.stepPhysics();
      });
    }
  }

  update() {
    if (this.params.visualizeBodies && this.debug.active) {
      this.visualize.update();
    }
    if (this.params.physicsEnabled) {
      this.world.step(1 / 60, this.time.delta, this.params.maxSubSteps);
    }
  }
}
