import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
import gsap from "gsap";

export default class Lander {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.physics = this.world.physics;
    this.sound = this.experience.sound;
    this.resources = this.experience.resources;
    this.resource = this.resources.items.landerModel;
    this.time = this.experience.time;
    this.inputs = this.experience.inputs;
    this.debug = this.experience.debug;
    this.state = this.experience.state;
    this.interface = this.experience.interface;
    this.params = {
      position: new CANNON.Vec3(0, 60, 0),
      velocity: new CANNON.Vec3(0, 0, 0),
      angularFactor: new CANNON.Vec3(1, 0, 1),
      fuelConsumptionRate: 0.75,
      angularDamping: 0.75,
      linearDamping: 0.015,
      allowSleep: true,
      sleepSpeedLimit: 2.0,
      thrust: 250,
      mass: 2445, // Actual lander mass 2445kg
      steeringFactor: 15,
      fuel: 2376, // Actual lander mass 2376 kg of propellant
    };

    this.sobelMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1,
    });

    this.sobelThrustMaterial = new THREE.MeshLambertMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 5,
    });

    this.setInitialState();
    this.setModel();
    // this.setAnimation();
    this.setPhysics();
    this.setDebug();
  }

  setInitialState() {
    this.state.fuel.set(this.params.fuel);
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.position.set(this.params.position);
    this.model.name = "Lander";
    this.model.material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
    });
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
    this.setMaterial();
  }

  setMaterial() {
    if (this.experience.renderer.params.sobel) {
      this.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name === "ThrustNew") {
            child.material = this.sobelThrustMaterial;
          } else {
            child.material = this.sobelMaterial;
          }
        }
      });
    }
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    this.animation.actions = {};
    this.animation.actions.idle = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    this.animation.actions.walking = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );
    this.animation.actions.running = this.animation.mixer.clipAction(
      this.resource.animations[2]
    );
    this.animation.actions.current = this.animation.actions.idle;
    this.animation.actions.current.play();

    this.animation.play = (name, duration) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;

      if (newAction === oldAction) {
        return;
      }

      newAction.reset();
      newAction.play();
      newAction.crossFadeFrom(oldAction, duration);

      this.animation.actions.current = newAction;
    };
  }

  setPhysics() {
    this.physicsBody = new CANNON.Body({
      mass: this.params.mass, // kg
      material: this.world.landerMaterial,
      velocity: this.params.velocity,
      angularFactor: this.params.angularFactor,
      angularDamping: this.params.angularDamping,
      linearDamping: this.params.linearDamping,
      allowSleep: this.params.allowSleep,
      sleepSpeedLimit: this.params.sleepSpeedLimit,
    });

    // Lander parts (Top, Feet)
    this.physicsBody.addShape(
      new CANNON.Sphere(0.9),
      new CANNON.Vec3(0, 2.25, 0)
    );
    this.physicsBody.addShape(
      new CANNON.Sphere(0.15),
      new CANNON.Vec3(-0.9, 0.75, -0.9)
    );
    this.physicsBody.addShape(
      new CANNON.Sphere(0.15),
      new CANNON.Vec3(-0.9, 0.75, 0.9)
    );
    this.physicsBody.addShape(
      new CANNON.Sphere(0.15),
      new CANNON.Vec3(0.9, 0.75, -0.9)
    );
    this.physicsBody.addShape(
      new CANNON.Sphere(0.15),
      new CANNON.Vec3(0.9, 0.75, 0.9)
    );

    this.physicsBody.id = "lander";
    this.physicsBody.position = this.params.position;
    this.physics.world.addBody(this.physicsBody);

    this.intersects;
    this.altitudeRayCaster = new THREE.Raycaster();
    this.rayTo = new THREE.Vector3(0, -1, 0);

    setInterval(() => {
      this.state.verticalSpeed.set(this.physicsBody.velocity.y);
      this.interface.hud.update.vertical(this.state.verticalSpeed.get());
      if (this.state.view.get() === "front") {
        this.state.horizontalSpeed.set(this.physicsBody.velocity.x);
        this.interface.hud.update.horizontal(this.state.horizontalSpeed.get());
      } else {
        this.state.horizontalSpeed.set(this.physicsBody.velocity.z);
        this.interface.hud.update.horizontal(this.state.horizontalSpeed.get());
      }
      this._updateAlititude();
    }, 100);
  }

  _updateAlititude() {
    this.altitudeRayCaster.set(this.physicsBody.position, this.rayTo);
    this.intersects = this.altitudeRayCaster.intersectObjects(
      this.scene.children
    );
    if (this.intersects.length > 0) {
      this.state.altitude.set(this.intersects[0].distance);
      this.interface.hud.update.altitude(this.state.altitude.get());
    }
  }

  resetPosition() {
    this.physicsBody.position = new CANNON.Vec3(0, 60, 0);
    this.resetForces(0.1);
  }

  resetForces(duration) {
    gsap.to(this.physicsBody.quaternion, {
      duration: duration,
      ease: "none",
      x: 0,
      y: 0,
      z: 0,
    });
    gsap.to(this.physicsBody.angularVelocity, {
      duration: duration,
      ease: "none",
      x: 0,
      y: 0,
      z: 0,
    });
    gsap.to(this.physicsBody.velocity, {
      duration: duration,
      ease: "none",
      x: this.physicsBody.velocity.x / 2,
      z: this.physicsBody.velocity.x / 2,
    });
    gsap.to(this.physicsBody.force, {
      duration: duration,
      ease: "none",
      x: 0,
      z: 0,
      z: 0,
    });
  }

  _applyThrust() {
    if (this.state.fuel.get() > 0) {
      this.physicsBody.applyLocalImpulse(
        new CANNON.Vec3(0, this.params.thrust, 0)
      );
      this.state.fuel.set(
        this.state.fuel.get() - this.params.fuelConsumptionRate
      );
      this.interface.hud.update.fuel(this.state.fuel.get());
    }
  }

  _rotateFoward() {
    this.physicsBody.applyLocalImpulse(
      new CANNON.Vec3(0, 0, 1 * this.params.steeringFactor),
      new CANNON.Vec3(0, -5, 0)
    );
    this.physicsBody.applyLocalImpulse(
      new CANNON.Vec3(0, 0, -1 * this.params.steeringFactor),
      new CANNON.Vec3(0, 5, 0)
    );
    return;
  }

  _rotateBackward() {
    this.physicsBody.applyLocalImpulse(
      new CANNON.Vec3(0, 0, -1 * this.params.steeringFactor),
      new CANNON.Vec3(0, -5, 0)
    );
    this.physicsBody.applyLocalImpulse(
      new CANNON.Vec3(0, 0, 1 * this.params.steeringFactor),
      new CANNON.Vec3(0, 5, 0)
    );
    return;
  }

  _rotateRight() {
    this.physicsBody.applyLocalImpulse(
      new CANNON.Vec3(-1 * this.params.steeringFactor, 0, 0),
      new CANNON.Vec3(0, -5, 0)
    );
    this.physicsBody.applyLocalImpulse(
      new CANNON.Vec3(1 * this.params.steeringFactor, 0, 0),
      new CANNON.Vec3(0, 5, 0)
    );
    return;
  }

  _rotateLeft() {
    this.physicsBody.applyLocalImpulse(
      new CANNON.Vec3(1 * this.params.steeringFactor, 0, 0),
      new CANNON.Vec3(0, -5, 0)
    );
    this.physicsBody.applyLocalImpulse(
      new CANNON.Vec3(-1 * this.params.steeringFactor, 0, 0),
      new CANNON.Vec3(0, 5, 0)
    );
    return;
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

      this.resetPositionBtn = this.debugFolder.addButton({
        title: "Reset Lander Position",
      });
      this.resetPositionBtn.on("click", () => {
        this.resetPosition();
      });

      this.thrustBtn = this.debugFolder.addButton({
        title: "Thrust",
      });
      this.thrustBtn.on("click", () => {
        this.applyThrust();
      });
    }
  }

  update() {
    this.model.position.copy(this.physicsBody.position);
    this.model.quaternion.copy(this.physicsBody.quaternion);

    this.camera.rig.position.lerp(
      new THREE.Vector3(
        this.model.position.x,
        this.model.position.y + 2,
        this.model.position.z
      ),
      this.camera.params.followCoefficient - Math.pow(0.001, this.time.elapsed)
    );

    if (this.physics.params.physicsEnabled) {
      if (this.inputs.pressed.ArrowUp === true) {
        this._applyThrust();
        this.sound.playSound("thrustSound");
      } else this.sound.pauseSound("thrustSound");

      if (
        this.inputs.pressed.ArrowRight === true &&
        this.state.view.value === "front"
      ) {
        this._rotateRight();
      }
      if (
        this.inputs.pressed.ArrowLeft === true &&
        this.state.view.value === "front"
      ) {
        this._rotateLeft();
      }
      if (
        this.inputs.pressed.ArrowRight === true &&
        this.state.view.value === "side"
      ) {
        this._rotateBackward();
      }
      if (
        this.inputs.pressed.ArrowLeft === true &&
        this.state.view.value === "side"
      ) {
        this._rotateFoward();
      }
    }
  }
}
