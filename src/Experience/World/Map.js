import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
import { CannonUtils } from "@Utils/CannonUtils";
import Pad from "@World/Pad.js";

export default class Map {
  constructor(level) {
    this.level = level;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.physics = this.world.physics;
    this.debug = this.experience.debug;
    this.resources = this.experience.resources;
    this.maps = [];
    this.landingPads = [];
    this.params = {
      level: 1,
      position: new THREE.Vector3(0, 0, 0),
      default: this.resources.items.Map01,
      x2PadRadius: 8,
      x4PadRadius: 7,
      x6PadRadius: 6,
    };

    this.setModel();
    this.setDebug();
  }

  setModel(level) {
    this.level = level;
    this.level === undefined ? (this.level = this.params.default) : null;
    this.model = this.level.scene;
    this.model.position.set(...this.params.position);
    this.model.name = "Map";
    this.scene.add(this.model);
    this.setPhysics();

    // TODO: Shadow's not working
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.resources.sources.map((source) => {
      if (source.pads) {
        this.maps.push(source);
      }
    });

    // this.maps[0].pads.map((pad) => {
    //   console.log("Firing");
    //   new Pad({
    //     multiplier: pad.multiplier,
    //     position: pad.position,
    //     params: this.params,
    //   });
    // });
  }

  setPhysics() {
    this.physicsBodyGeometry = CannonUtils.CreateTrimesh(
      this.model.children[0].geometry
    );
    this.physicsBody = new CANNON.Body({ mass: 0 });
    this.physicsBody.position.set(...this.params.position);
    this.physicsBody.id = "ground";
    this.physicsBody.addShape(this.physicsBodyGeometry);
    this.physics.world.addBody(this.physicsBody);
  }

  setLandingPad(multiplier, position) {
    // Create Pad
    this.landingPad = new THREE.Group();
    this.landingPadMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 0.2,
    });
    this.radius =
      multiplier === 2
        ? this.params.x2PadRadius
        : multiplier === 4
        ? this.params.x4PadRadius
        : this.params.x6PadRadius;

    this.landingPadGeo = new THREE.CylinderGeometry(
      this.radius,
      this.radius,
      10,
      20
    );
    this.mesh = new THREE.Mesh(this.landingPadGeo, this.landingPadMaterial);
    // this.mesh.receiveShadow = true;
    // this.mesh.position.set(position);
    // this.landingPad.name = `Landing Pad ${multiplier}`;
    // this.landingPad.add(this.mesh);
    this.scene.add(this.mesh);

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

  destroy() {
    this.needsRemoval = [];
    this.scene.children.map((child, index) => {
      // TODO: Pulled this out, || child.name.includes("Landing")
      //  need to revisit when landing pads are in
      if (child.name.includes("Map")) {
        this.needsRemoval.push(index);
      }
    });
    this.needsRemoval.reverse().map((index) => {
      // TODO: Need to dispose geometry from memory
      this.scene.remove(this.scene.children[index]);
    });

    this.physicsBodies = [];
    this.physics.world.bodies.map((body, index) => {
      if (body.id === "ground") {
        this.physicsBodies.push(index);
      }
    });
    this.physicsBodies.reverse().map((index) => {
      this.physics.world.removeBody(this.physics.world.bodies[index]);
    });
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Map",
        expanded: true,
      });

      // Adds all params to debug UI
      Object.keys(this.params).forEach((key, index) => {
        if (key === "default") {
          return;
        }
        this[key] = this.debugFolder.addInput(this.params, key);
        this[key].on(
          "change",
          (e) => (
            (this.params[key] = e.value),
            console.log(`Set ${key} to:`, this.params[key])
          )
        );
      });

      this.mapList = this.debugFolder.addBlade({
        view: "list",
        lable: "maps",
        options: [
          { text: "Map 01", value: "Map01" },
          { text: "Map 02", value: "Map02" },
          { text: "Map 03", value: "Map03" },
        ],
        value: "Map01",
      });

      this.mapList.on("change", (e) => {
        this.destroy();
        this.setModel(this.resources.items[e.value]);
      });

      this.removeMapBtn = this.debugFolder.addButton({
        title: "Remove Map",
        lable: "Remove Map",
      });

      this.removeMapBtn.on("click", () => {
        this.destroy();
      });
    }
  }
}
