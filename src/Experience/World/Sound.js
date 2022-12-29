import * as THREE from "three";
import Experience from "@Experience/Experience.js";

let instance = null;
export default class Sound {
  constructor() {
    // Create experience as singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.sounds = [];
    this.debug = this.experience.debug;
    this.params = {
      ambientVolume: 1,
      thrustVolume: 1,
      rotateVolume: 1,
      lowFuelVolume: 1,
    };

    this._setSounds();
    this._setDebug();
  }

  _setSounds() {
    this.ambientSound = new THREE.Audio(this.camera.audioListener);
    this.ambientSound.setVolume(this.params.ambientVolume);
    this.ambientSound.name = "ambient";
    this.ambientSound.loop = true;
    this.sounds.push(this.ambientSound);

    this.thrustSound = new THREE.Audio(this.camera.audioListener);
    this.ambientSound.setVolume(this.params.thrustVolume);
    this.thrustSound.name = "thrust";
    this.thrustSound.loop = true;
    this.sounds.push(this.thrustSound);

    this.rotateSound = new THREE.Audio(this.camera.audioListener);
    this.ambientSound.setVolume(this.params.rotateVolume);
    this.rotateSound.name = "rotate";
    this.sounds.push(this.rotateSound);

    this.lowFuelSound = new THREE.Audio(this.camera.audioListener);
    this.ambientSound.setVolume(this.params.lowFuelVolume);
    this.lowFuelSound.loop = true;
    this.lowFuelSound.name = "lowFuel";
    this.sounds.push(this.lowFuelSound);

    this.ambientSound.play();
  }

  playSound(sound) {
    if (this[sound].isPlaying) {
      return;
    }
    this[sound].play();
  }
  pauseSound(sound) {
    if (!this[sound].isPlaying) {
      return;
    }
    this[sound].pause();
  }

  _setVolume(sound, value) {
    sound.setVolume(value);
  }

  _setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Sound",
        expanded: false,
      });

      // Adds all params to debug UI
      Object.keys(this.params).forEach((key, index) => {
        this[key] = this.debugFolder.addInput(this.params, key);
        this[key].on("change", (e) => {
          this.params[key] = e.value;

          // TODO: refactor this into a swtich

          key === "ambientVolume"
            ? this._setVolume(this.ambientSound, e.value)
            : null;

          key === "thrustVolume"
            ? this._setVolume(this.thrustSound, e.value)
            : null;

          key === "rotateVolume"
            ? this._setVolume(this.rotateVolume, e.value)
            : null;

          key === "lowFuelVolume"
            ? this._setVolume(this.lowFuelVolume, e.value)
            : null;

          console.log(`Set ${key} to:`, this.params[key]);
        });
      });
    }
  }
}
