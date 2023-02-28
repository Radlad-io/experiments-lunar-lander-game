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
    this.state = this.experience.state;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.sounds = [];
    this.debug = this.experience.debug;
    this.params = {
      muted: true,
      volume: {
        ambient: 1,
        music: 0.75,
        thrust: 1,
        rotate: 1,
        lowFuel: 1,
      },
    };

    this._setSounds();
    this._setDebug();
  }

  _setSounds() {
    this.ambientSound = new THREE.Audio(this.camera.audioListener);
    this.ambientSound.setVolume(this.params.volume.ambient);
    this.ambientSound.name = "ambient";
    this.ambientSound.loop = true;
    this.sounds.push(this.ambientSound);

    this.musicSound = new THREE.Audio(this.camera.audioListener);
    this.musicSound.setVolume(this.params.volume.music);
    this.musicSound.name = "ambient";
    this.musicSound.loop = true;
    this.sounds.push(this.musicSound);

    this.thrustSound = new THREE.Audio(this.camera.audioListener);
    this.thrustSound.setVolume(this.params.volume.thrust);
    this.thrustSound.name = "thrust";
    this.thrustSound.loop = true;
    this.sounds.push(this.thrustSound);

    this.rotateSound = new THREE.Audio(this.camera.audioListener);
    this.rotateSound.setVolume(this.params.volume.rotate);
    this.rotateSound.name = "rotate";
    this.sounds.push(this.rotateSound);

    this.lowFuelSound = new THREE.Audio(this.camera.audioListener);
    this.lowFuelSound.setVolume(this.params.volume.lowFuel);
    this.lowFuelSound.loop = true;
    this.lowFuelSound.name = "lowFuel";
    this.sounds.push(this.lowFuelSound);
  }

  playSound(sound) {
    if (this[sound].isPlaying || this.params.muted) {
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

  muteAll() {
    this.sounds.map((sound) => {
      console.log("firing");
      sound.setVolume(0);
    });
  }

  unmuteAll() {
    this.sounds.map((sound) => {
      sound.setVolume(this.params.volume[sound.name]);
    });
  }

  toggleMute() {
    if (this.state.muted.get()) {
      this.unmuteAll();
      this.state.muted.set();
    } else {
      this.muteAll();
      this.state.muted.set();
    }
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
      Object.keys(this.params.volume).forEach((key, index) => {
        this[key] = this.debugFolder.addInput(this.params.volume, key);
        this[key].on("change", (e) => {
          this.params[key] = e.value;

          // TODO: refactor this into a swtich

          key === "ambient"
            ? this._setVolume(this.ambientSound, e.value)
            : null;

          key === "thrust" ? this._setVolume(this.thrustSound, e.value) : null;

          key === "rotate" ? this._setVolume(this.rotateSound, e.value) : null;

          key === "lowFuel"
            ? this._setVolume(this.lowFuelSound, e.value)
            : null;

          console.log(`Set ${key} to:`, this.params.volume[key]);
        });
      });
    }
  }
}
