import * as THREE from "three";
import Experience from "@Experience/Experience.js";

// Postprocessing
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.debug = this.experience.debug;
    this.params = {
      sobel: false,
      AA: false,
    };
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      powerPreference: "high-performance",
    });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#000000");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.composer = new EffectComposer(this.instance);
    this.renderPass = new RenderPass(this.scene, this.camera.instance);
    this.composer.addPass(this.renderPass);
    this.setSobelPass();
    this.setAAPass();
    this.setDebug();
  }

  setSobelPass() {
    this.sobelPass = new ShaderPass(SobelOperatorShader);
    this.sobelPass.uniforms["resolution"].value.x =
      window.innerWidth * window.devicePixelRatio;
    this.sobelPass.uniforms["resolution"].value.y =
      window.innerHeight * window.devicePixelRatio;
    if (this.params.sobel) {
      this.composer.addPass(this.sobelPass);
    }
  }

  toggleSobelPass() {
    if (this.params.sobel) {
      this.composer.removePass(this.sobelPass);
    } else {
      this.composer.addPass(this.sobelPass);
    }
    this.params.sobel = !this.params.sobel;
  }

  setAAPass() {
    this.aaPass = new SMAAPass(
      window.innerWidth * this.instance.getPixelRatio(),
      window.innerHeight * this.instance.getPixelRatio()
    );
    if (this.params.AA) {
      this.composer.addPass(this.aaPass);
    }
  }

  toggleAAPass() {
    if (this.params.AA) {
      this.composer.removePass(this.aaPass);
    } else {
      this.composer.addPass(this.aaPass);
    }
    this.params.AA = !this.params.AA;
  }

  setDebug() {
    // Create debug UI folder for Physics params
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Renderer",
        expanded: false,
      });
      this.keys = [];
      Object.keys(this.params).forEach((key, index) => {
        this.keys.push(key);
      });

      this.debugFolder
        .addBlade({
          view: "buttongrid",
          size: [2, 1],
          cells: (x, y) => ({
            title: [this.keys][y][x],
          }),
          label: "Render Passes",
        })
        .on("click", (e) => {
          if (e.index[0] === 0 && e.index[1] === 0) {
            this.toggleSobelPass();
          }
          if (e.index[0] === 1 && e.index[1] === 0) {
            this.toggleAAPass();
          }
        });
    }
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  update() {
    if (this.debug.active) {
      this.debug.profiler.measure("update", () => {
        this.composer.render();
      });
    } else {
      this.composer.render();
    }
  }
}
