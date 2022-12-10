// import { collisions } from "@util/State.js";
import * as CANNON from "cannon-es";
import Experience from "@Experience/Experience.js";
import gsap from "gsap";

export default class Physics {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.params = {
      gravity: new CANNON.Vec3(0, -1.62, 0),
      // Earth -9.82 m/s²
      // Moon -1.62 m/s²
      initialVelocity: new CANNON.Vec3(0, -5, 0),
      angularFactor: new CANNON.Vec3(1, 0, 1),
      angularDamping: 0.75,
      linearDamping: 0.015,
      allowSleep: true,
      sleepSpeedLimit: 2.0,
      landerThrust: 3.5,
      landerMass: 50,
      rotationFactor: 4,
    };

    this.setDebug();
  }

  setDebug() {
    // Create debug UI folder for Physics params
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Physics",
        expanded: false,
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
}
