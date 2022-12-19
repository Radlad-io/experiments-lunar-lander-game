import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "@Experience/Experience.js";
import gsap from "gsap";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    this.params = {
      position: "front",
      front: new THREE.Vector3(0, 5, 16),
      orbit: false,
      fov: 85,
      near: 1,
      far: 150,
      moveDuration: 1,
      rotationSpeed: 0.001,
      visualizeRig: false,
      inTransit: false,
      followCoefficient: 0.035,
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
      this.params.near,
      this.params.far
    );
    this.instance.position.set(0, 5, 16);
    this.rig = new THREE.Group();
    this.rigMat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
      visible: this.params.visualizeRig,
    });

    this.rotatorGeo = new THREE.BoxGeometry(5, 5, 5);
    this.rotatorMesh = new THREE.Mesh(this.rotatorGeo, this.rigMat);

    this.jibPoints = [
      new THREE.Vector3(0, 2.5, 0),
      new THREE.Vector3(0, 2.5, 16),
    ];
    this.jibGeo = new THREE.BufferGeometry().setFromPoints(this.jibPoints);
    this.jibLine = new THREE.Line(this.jibGeo, this.rigMat);

    this.rig.add(this.rotatorMesh);
    this.rig.add(this.jibLine);
    this.rig.add(this.instance);
    this.rig.position.set(0, 2.5, 0);
    this.scene.add(this.rig);
  }

  rotateRig() {
    // TODO: intransit needs to ne in a global state component
    if (this.params.inTransit) {
      return;
    }
    this.params.inTransit = true;
    gsap
      .to(this.rig.rotation, {
        duration: this.params.moveDuration,
        ease: CustomEase.create("custom", "M0,0 C0.104,0.204 0.03,1 1,1 "),
        y: this.params.position === "front" ? -Math.PI / 2 : 0,
      })
      .then(() => {
        this.params.position === "front"
          ? (this.params.position = "side")
          : (this.params.position = "front");
        this.params.inTransit = false;
      });
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = false;
    this.controls.enabled = this.params.orbit;
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

  setNear(value) {
    this.instance.near = value;
    this.params.near = value;
    this.instance.updateProjectionMatrix();
  }

  setFar(value) {
    this.instance.far = value;
    this.params.far = value;
    this.instance.updateProjectionMatrix();
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Camera",
        expanded: false,
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
        title: "toggle",
        label: "rotate",
      });

      this.rotateControl.on("click", (e) => {
        this.rotateRig();
      });

      Object.keys(this.params).forEach((key, index) => {
        if (
          key === "fov" ||
          key === "position" ||
          key === "orbit" ||
          key === "front"
        ) {
          return;
        }
        this[key] = this.debugFolder.addInput(this.params, key);
        this[key].on("change", (e) => {
          this.params[key] = e.value;
          key === "visualizeRig"
            ? (this.rigMat.visible = this.params.visualizeRig)
            : null;

          key === "near" ? this.setNear(e.value) : null;
          key === "far" ? this.setNear(e.value) : null;
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
  }
}