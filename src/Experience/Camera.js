import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "@Experience/Experience.js";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;
    this.state = this.experience.state;
    this.interface = this.experience.interface;
    this.params = {
      visualizeRig: false,
      position: "front",
      front: new THREE.Vector3(0, 5, 16),
      orbit: false,
      fov: 85,
      near: 1,
      far: 650,
      moveDuration: 0.75,
      rotationSpeed: 0.001,
      followCoefficient: 0.055,
      flyInFov: 110,
      flyInRotation: -Math.PI / 2.5,
      flyInDelay: 3,
    };

    this.setInstace();
    this._setAudioListener();
    this.setOrbitControls();
    this.setDebug();
  }

  setInstace() {
    this.instance = new THREE.PerspectiveCamera(
      this.params.flyInFov,
      this.sizes.width / this.sizes.height,
      this.params.near,
      this.params.far
    );
    this.instance.position.set(0, 5, 26);
    this.rig = new THREE.Group();
    this.rigMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
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
    this.rig.rotation.x = this.params.flyInRotation;

    this.scene.add(this.rig);
  }

  _setAudioListener() {
    this.audioListener = new THREE.AudioListener();
    this.instance.add(this.audioListener);
  }

  rotateRig() {
    // TODO: intransit needs to ne in a global state component
    if (this.state.cameraInTransit.get()) {
      return;
    }
    this.sound = this.experience.sound;
    this.sound.playSound("rotateSound");
    this.state.view.set();
    this.state.cameraInTransit.set();
    this.interface.hud.update.view(this.state.view.get());
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
        this.state.cameraInTransit.set();
      });
  }

  flyIn() {
    this.state.updateCameraProjection.set();
    gsap.fromTo(
      this.rig.rotation,
      {
        x: this.params.flyInRotation,
      },
      {
        delay: this.params.flyInDelay,
        duration: 3,
        ease: CustomEase.create("custom", "M0,0 C0.104,0.204 0.03,1 1,1 "),
        x: 0,
      }
    );
    gsap
      .fromTo(
        this.instance,
        {
          fov: this.params.flyInFov,
        },
        {
          delay: this.params.flyInDelay,
          duration: 3,
          ease: "easeIn",
          fov: this.params.fov,
        }
      )
      .then(() => {
        this.state.updateCameraProjection.set();
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

  setNear(value) {
    this.instance.near = value;
    this.params.near = value;
    this.instance.updateProjectionMatrix();
  }

  // FIXME: Break the entire scene
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
    if (this.state.updateCameraProjection.get()) {
      this.instance.updateProjectionMatrix();
    }
  }
}
