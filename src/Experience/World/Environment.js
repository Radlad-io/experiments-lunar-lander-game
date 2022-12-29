import * as THREE from "three";
import Experience from "@Experience/Experience.js";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.params = {
      sunIntensity: 4,
      sunPositionX: 0,
      sunPositionY: 5,
      envIntensity: 0.4,
    };

    this.setSunLight();
    this.setEnviornmentMap();
    this.setDebug();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 4);
    this.sunLight.castShadow = true;
    this.sunLight.intensity = this.params.sunIntensity;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(
      this.params.sunPositionX,
      this.params.sunPositionY,
      -2.25
    );
    this.scene.add(this.sunLight);
  }

  setEnviornmentMap() {
    this.environmentMap = {};
    this.environmentMap.intensity = this.params.envIntensity;
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

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Environment",
        // FIXME: Still expanded. Is this a bug?
        expanded: false,
      });

      const sliders = {
        lightIntensity: this.debugFolder.addBlade({
          view: "slider",
          label: "Sun Intensity",
          min: 0,
          max: 10,
          value: this.sunLight.intensity,
        }),
        positionX: this.debugFolder.addBlade({
          view: "slider",
          label: "Position X",
          min: -5,
          max: 5,
          value: this.sunLight.position.x,
        }),
        positionY: this.debugFolder.addBlade({
          view: "slider",
          label: "Position Y",
          min: -5,
          max: 5,
          value: this.sunLight.position.y,
        }),
        envIntensity: this.debugFolder.addBlade({
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
