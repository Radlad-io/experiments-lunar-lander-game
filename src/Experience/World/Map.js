import * as THREE from "three";
import Experience from "@Experience/Experience.js";
import * as CANNON from "cannon-es";
import { CannonUtils } from "@Utils/CannonUtils";
import Pad from "@World/Pad.js";

export default class Map {
  constructor() {
    this.experience = new Experience();
    this.state = this.experience.state;
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.physics = this.world.physics;
    this.debug = this.experience.debug;
    this.resources = this.experience.resources;
    this.maps = [];
    this.map;
    this.params = {
      position: new THREE.Vector3(0, 0, 0),
      x2PadRadius: 8,
      x4PadRadius: 7,
      x6PadRadius: 6,
    };

    // Identifies Maps from resources
    this.resources.sources.map((source) => {
      if (source.pads) {
        this.maps.push(source);
      }
    });

    this.setModel();
    this.setDebug();
  }

  // TODO: Try to create a edge material instead of sobel
  // https://madebyevan.com/shaders/grid/
  setModel() {
    // Sets active map based on state.level
    this.map = this.maps[this.state.level.get()];
    this.model =
      this.resources.items[this.maps[this.state.level.get()].name].scene;
    this.model.position.set(...this.params.position);
    this.model.name = "Map";
    // TODO: Shadow's not working
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    this.scene.add(this.model);
    this.setLandingPads();
    this.setPhysics();
  }

  setLandingPads() {
    this.maps[this.state.level.get()].pads.map((pad) => {
      new Pad(pad.multiplier, pad.position);
    });
  }

  setPhysics() {
    this.physicsBodyGeometry = CannonUtils.CreateTrimesh(
      this.model.children[0].geometry
    );
    this.physicsBody = new CANNON.Body({ mass: 0 });
    this.physicsBody.position.set(...this.params.position);
    this.physicsBody.id = "Map";
    this.physicsBody.addShape(this.physicsBodyGeometry);
    this.physics.world.addBody(this.physicsBody);
  }

  destroy() {
    // Searches the scene for maps and pads then removes them
    this.needsRemoval = [];
    this.scene.children.map((child, index) => {
      if (child.name.includes("Map") || child.name.includes("Pad")) {
        this.needsRemoval.push(index);
      }
    });
    this.needsRemoval.reverse().map((index) => {
      // TODO: Should probably use .dispose to free up memory
      this.scene.remove(this.scene.children[index]);
    });

    // Searches the physics world for maps and pads then removes them
    this.physicsBodies = [];
    this.physics.world.bodies.map((body, index) => {
      if (body.id.includes("Map") || body.id.includes("Pad")) {
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
          { text: "Map 01", value: 0 },
          { text: "Map 02", value: 1 },
          { text: "Map 03", value: 2 },
          { text: "Map 04", value: 3 },
          { text: "Map 05", value: 4 },
        ],
        value: "0",
      });

      this.mapList.on("change", (e) => {
        this.destroy();
        this.state.level.set(e.value);
        this.setModel();
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
