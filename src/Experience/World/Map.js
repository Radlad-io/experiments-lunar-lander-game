import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
import CannonUtils from "../Utils/CannonUtils";
import CannonDebugRenderer from "../Utils/CannonDebugRenderer.ts";

export default class Map {
  constructor(level) {
    this.level = level;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.resources = this.experience.resources;
    this.resource = this.resources.items.map01Model;
    this.params = {
      position: new THREE.Vector3(0, -5, 0),
      scale: new THREE.Vector3(0.5, 0.5, 0.5),
    };

    this.setModel();
    this.setPhysics();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.set(...this.params.position);
    // this.model.scale.set(...this.params.scale);
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
    this.world.physics.addBody(this.physicsBody);
  }
}
