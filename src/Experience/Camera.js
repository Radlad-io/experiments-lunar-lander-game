import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "@Experience/Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    this.params = {
      orbit: false,
      fov: 50,
    };

    this.setInstace();
    this.setOrbitControls();
    this.setDebug();
  }

  setInstace() {
    this.instance = new THREE.PerspectiveCamera(
      this.params.fov,
      this.sizes.width / this.sizes.height,
      4,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    if (this.params.orbit) {
      this.enableOrbitControls();
    } else {
      this.disableOrbitControls();
    }
  }

  enableOrbitControls() {
    this.controls.enabled = true;
  }
  disableOrbitControls() {
    this.controls.enabled = false;
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Camera",
        expanded: true,
      });

      this.controller = this.debug.pane.addInput(
        { key: 0, fov: this.params.fov },
        "key",
        {
          view: "cameraring",
          series: 1,
          // Scale unit
          unit: {
            // Pixels for the unit
            pixels: 50,
            // Number of ticks for the unit
            ticks: 10,
            // Amount of a value for the unit
            value: 0.2,
          },
          // You can use `min`, `max`, `step` same as a number input
          min: 1,
          step: 0.02,
        }
      );

      this.orbitDebug = this.debug.pane.addInput(
        { Orbit: this.params.orbit },
        "Orbit"
      );
      this.orbitDebug.on("change", (e) => {
        if (e.value) {
          this.enableOrbitControls();
        } else {
          this.disableOrbitControls();
        }
      });
    }
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
