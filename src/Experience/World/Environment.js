import * as THREE from "three";
import Experience from "@Experience/Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Environment",
        expanded: true,
      });
    }

    this.setSunLight();
    this.setEnviornmentMap();
    this.initDebug();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3, 3, -2.25);
    this.scene.add(this.sunLight);
  }

  setEnviornmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;

    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterials = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };

    this.environmentMap.updateMaterials();
  }

  initDebug() {
    if (this.debug.active) {
      const sliders = {
        lightIntensity: this.debug.pane.addBlade({
          view: "slider",
          label: "Sun Intensity",
          min: 0,
          max: 10,
          value: this.sunLight.intensity,
        }),
        positionX: this.debug.pane.addBlade({
          view: "slider",
          label: "Position X",
          min: -5,
          max: 5,
          value: this.sunLight.position.x,
        }),
        positionY: this.debug.pane.addBlade({
          view: "slider",
          label: "Position Y",
          min: -5,
          max: 5,
          value: this.sunLight.position.y,
        }),
        envIntensity: this.debug.pane.addBlade({
          view: "slider",
          label: "Env Intensity",
          min: 0,
          max: 4,
          value: this.environmentMap.intensity,
        }),
      };

      sliders.lightIntensity.on("change", (e) => {
        this.sunLight.intensity = e.value;
      });
      sliders.positionX.on("change", (e) => {
        this.sunLight.position.x = e.value;
      });
      sliders.positionY.on("change", (e) => {
        this.sunLight.position.y = e.value;
      });
      sliders.envIntensity.on("change", (e) => {
        this.environmentMap.intensity = e.value;
        this.environmentMap.updateMaterials();
      });
    }
  }
}
