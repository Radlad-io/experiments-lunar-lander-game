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
      front: new THREE.Vector3(0, 5, 16),
      orbit: false,
      fov: 85,
      rotationSpeed: 0.001,
      inTransit: false,
    };

    this.setInstace();
    this.setOrbitControls();
    this.setDebug();
  }

  getInTransit() {
    return this.params.inTransit;
  }

  setInTransit() {
    this.params.inTransit = !this.params.inTransit;
  }

  setInstace() {
    this.instance = new THREE.PerspectiveCamera(
      this.params.fov,
      this.sizes.width / this.sizes.height,
      1,
      200
    );
    this.instance.position.set(...this.params.front);
    this.rig = new THREE.Group();
    this.rotatorGeo = new THREE.BoxGeometry(5, 5, 16 * 2);
    this.rotatorMat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
      visible: false,
    });
    this.rotatorMesh = new THREE.Mesh(this.rotatorGeo, this.rotatorMat);
    this.rig.add(this.rotatorMesh);
    this.rig.add(this.instance);
    this.rig.position.set(0, 8, 0);
    this.scene.add(this.rig);
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

  rotateCamera() {
    this.state.inTransit.set(true);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Camera",
        expanded: true,
      });

      this.orbitDebug = this.debugFolder.addInput(
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

      this.fovControl = this.debugFolder.addInput(
        { fov: this.params.fov },
        "fov",
        {
          view: "cameraring",
          series: 1,
        }
      );
      this.fovControl.on("change", (e) => {
        this.instance.fov = e.value;
        this.instance.updateProjectionMatrix();
      });

      this.rotateControl = this.debugFolder.addButton({
        title: "right",
        label: "rotate",
      });

      this.rotateControl.on("click", (e) => {
        this.rotateCamera();
      });

      Object.keys(this.params).forEach((key, index) => {
        this[key] = this.debugFolder.addInput(this.params, key);
        this[key].on("change", (e) => {
          this.params[key] = e.value;
          console.log(`Set ${key} to:`, this.params[key]);
        });
      });
    }
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    if (this.params.orbit) {
      this.controls.update();
    }
    if (this.params.inTransit) {
      this.rig.rotateOnWorldAxis(
        new THREE.Vector3(0, -1, 0),
        this.params.rotationSpeed
      );
    }
  }
}
