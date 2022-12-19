import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
import { CannonUtils } from "../Utils/CannonUtils";

export default class Map {
  constructor(level) {
    this.level = level;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.physics = this.world.physics;
    this.debug = this.experience.debug;
    this.resources = this.experience.resources;
    this.resource = this.resources.items.map01Model;
    this.params = {
      position: new THREE.Vector3(0, -20, 0),
    };

    this.setModel();
    this.setPhysics();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.set(...this.params.position);
    this.model.name = "Map";
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  setPhysics() {
    this.physicsBodyGeometry = CannonUtils.CreateTrimesh(
      this.model.children[0].geometry
    );
    this.physicsBody = new CANNON.Body({ mass: 0 });
    this.physicsBody.position.set(...this.params.position);
    this.physicsBody.id = "ground";
    this.physicsBody.addShape(this.physicsBodyGeometry);
    this.physics.world.addBody(this.physicsBody);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Lander",
        expanded: false,
      });

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
  }
}
