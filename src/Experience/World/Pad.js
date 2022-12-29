import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
import { Text } from "troika-three-text";
// import font from "./fonts/IBMPlexMono-Bold.ttf";

export default class Pad {
  constructor(multiplier, position, params) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.multiplier = multiplier;
    this.position = position;
    this.params = {
      x2PadRadius: 8,
      x4PadRadius: 7,
      x6PadRadius: 6,
    };

    this._setPad();
    this._setPhysics();
  }

  _setPad() {
    this.landingPad = new THREE.Group();
    this.landingPadMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
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
      10,
      20
    );
    this.mesh = new THREE.Mesh(this.landingPadGeo, this.landingPadMaterial);
    this.mesh.position.set(this.position);
    this.scene.add(this.mesh);

    // this.mesh.receiveShadow = true;
    // this.landingPad.name = `Landing Pad ${multiplier}`;
    // this.landingPad.add(this.mesh);
    // this.scene.add(this.mesh);
  }

  _setPhysics() {
    // Adds Physics body to pad
    // this.landingPadPhysicsBody = new CANNON.Body({
    //   mass: 0,
    //   material: new CANNON.Material(),
    //   shape: new CANNON.Cylinder(this.radius, this.radius, 10, 20),
    // });
    // this.landingPadPhysicsBody.position.set(position);
    // this.landingPadPhysicsBody.id = multiplier;
    // this.physics.world.addBody(this.landingPadPhysicsBody);
  }
}
