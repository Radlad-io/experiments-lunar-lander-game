import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import EventEmitter from "@Utils/EventEmitter.js";

import Debug from "@Utils/Debug.js";
import Experience from "@Experience/Experience.js";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.experience = new Experience();
    this.debug = this.experience.debug;

    // Options
    this.sources = sources;
    // Setup
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.setManager();
    this.loaders = {};
    // TODO: Add DRACO to GLTF loader
    this.loaders.gltfLoader = new GLTFLoader(this.manager);
    this.loaders.textureLoader = new THREE.TextureLoader(this.manager);
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(this.manager);
  }

  setManager() {
    const debug = this.debug.active;
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = function (url, itemsLoaded, itemsTotal) {
      if (debug) {
        console.log("Started loading files");
      }
    };

    this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      if (debug) {
        console.log(`Items loaded: ${itemsLoaded}/${itemsTotal}`);
      }
    };

    this.manager.onLoad = function () {
      if (debug) {
        console.log("Loading complete!");
      }
    };
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "video") {
        this.video = document.createElement("video");
        this.video.src = source.path;
        this.video.muted = true;
        this.video.load();
        this.video.play();
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("loaded");
    }
  }
}
