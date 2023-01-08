import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
import { Text } from "troika-three-text";
// import font from "./fonts/IBMPlexMono-Bold.ttf";

export default class Pad {
  constructor(multiplier, position, params) {
    this.experience = new Experience();
    this.world = this.experience.world;
    this.physics = this.world.physics;
    this.scene = this.experience.scene;
    this.multiplier = multiplier;
    this.position = position;
    this.params = {
      x2PadRadius: 8,
      x4PadRadius: 6.5,
      x6PadRadius: 5,
    };

    this._setPad();
    this._setPhysics();
  }

  _setPad() {
    this.landingPad = new THREE.Group();
    this.landingPadMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1,
    });
    this.radius =
      this.multiplier === 2
        ? this.params.x2PadRadius
        : this.multiplier === 4
        ? this.params.x4PadRadius
        : this.params.x6PadRadius;

    this.landingPadGeo = new THREE.CylinderGeometry(
      this.radius,
      this.radius,
      5,
      20
    );

    this.mesh = new THREE.Mesh(this.landingPadGeo, this.landingPadMaterial);
    this.mesh.position.set(...this.position);
    this.mesh.receiveShadow = true;
    this.landingPad.name = `Landing Pad ${this.multiplier}`;
    this.landingPad.add(this.mesh);
    this.scene.add(this.mesh);
  }

  _setPhysics() {
    // Adds Physics body to pad
    this.physicsBody = new CANNON.Body({
      mass: 0,
      material: new CANNON.Material(),
      shape: new CANNON.Cylinder(this.radius, this.radius, 5, 20),
    });
    this.physicsBody.position.set(...this.position);
    this.physicsBody.id = this.multiplier;
    this.physics.world.addBody(this.physicsBody);
  }

}
