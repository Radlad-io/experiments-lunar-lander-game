import * as THREE from "three";
import Experience from "@Experience/Experience.js";

export default class Stars {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.debug = this.experience.debug;
    this.params = {
      count: 500,
      size: 0.75,
      color: "#ff0000",
      amplitude: 100,
    };

    this.setMesh();
    this.setDebug();
  }

  setMaterial() {
    this.material = new THREE.PointsMaterial({
      size: this.params.size,
      color: new THREE.Color(this.params.color),
    });
  }

  setGeometry() {
    this.geometry = new THREE.BufferGeometry();
    this.posArray = new Float32Array(this.params.count * 3);

    for (let i = 0; i < this.params.count * 3; i++) {
      this.posArray[i] = (Math.random() - 0.5) * this.params.amplitude;
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.posArray, 3)
    );
  }

  setMesh() {
    this.setMaterial();
    this.setGeometry();

    this.mesh = new THREE.Points(this.geometry, this.material);
    this.mesh.name = "Star System";
    this.scene.add(this.mesh);
  }

  removeMesh() {
    this.scene.remove(this.mesh);
  }

  setDebug() {
    // Create debug UI folder for Physics params
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Star System",
        expanded: true,
      });
    }

    // Adds all params to debug UI
    Object.keys(this.params).forEach((key, index) => {
      this[key] = this.debugFolder.addInput(this.params, key);
      this[key].on("change", (e) => {
        this.params[key] = e.value;
        this.removeMesh();
        this.setMesh();
        console.log(`Set ${key} to:`, this.params[key]);
      });
    });
  }
}
