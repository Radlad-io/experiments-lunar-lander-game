import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
// import * as World from "@Experience/World/World.js";
// import CannonDebugRenderer from "../Utils/Cannon.ts";

export default class Lander {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.resources = this.experience.resources;
    this.resource = this.resources.items.landerModel;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.params = {
      postion: new CANNON.Vec3(0, 2, 0),
      velocity: new CANNON.Vec3(0, -5, 0),
      angularFactor: new CANNON.Vec3(1, 0, 1),
      angularDamping: 0.75,
      linearDamping: 0.015,
      allowSleep: true,
      sleepSpeedLimit: 2.0,
      thrust: 3.5,
      mass: 50,
      rotationFactor: 4,
    };

    this.setModel();
    // this.setAnimation();
    this.setPhysics();
    this.setDebug();
  }

  setModel() {
    this.model = this.resource.scene;
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
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
      mass: this.params.landerMass, // kg
      material: this.world.landerMaterial,
      velocity: this.params.velocity,
      angularFactor: this.params.angularFactor,
      angularDamping: this.params.angularDamping,
      linearDamping: this.params.linearDamping,
      allowSleep: this.params.allowSleep,
      sleepSpeedLimit: this.params.sleepSpeedLimit,
    });

    // Lander parts (Top, Middle, Feet)
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
    this.physicsBody.position = this.params.postion;
    this.world.physics.addBody(this.physicsBody);
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

      // const animations = {
      //   playIdle: () => {
      //     this.animation.play("idle", 1);
      //   },
      //   playWalking: () => {
      //     this.animation.play("walking", 1);
      //   },
      //   playRunning: () => {
      //     this.animation.play("running", 1);
      //   },
      // };
      // const params = {
      //   animation: "idle",
      // };
      // const clips = ["idle", "walk", "run"];
      // this.debug.pane
      //   .addInput(params, "animation", {
      //     view: "radiogrid",
      //     groupName: "clips",
      //     size: [3, 1],
      //     cells: (x, y) => ({
      //       title: `${clips[y * 3 + x]}`,
      //       value: clips[y * 3 + x],
      //     }),
      //     label: "animations",
      //   })
      //   .on("change", (e) => {
      //     if (e.value === "idle") {
      //       animations.playIdle();
      //     }
      //     if (e.value === "walk") {
      //       animations.playWalking();
      //     }
      //     if (e.value === "run") {
      //       animations.playRunning();
      //     }
      //   });
    }
  }

  update() {
    this.model.position.copy(this.physicsBody.position);
    // this.animation.mixer.update(this.time.delta / 1000);
    // this.model.position.copy(this.physicsBody.position);
    // this.mesh.scene.quaternion.copy(landerBodyPhysics.quaternion);
  }
}
