import Experience from "@Experience/Experience.js";

let instance = null;
export default class State {
  constructor() {
    // Create state as singleton
    // if (instance) {
    //   return instance;
    // }
    // instance = this;

    this.experience = new Experience();
    this.interface = this.experience.interface;
    this.debug = this.experience.debug;
    this.params = {
      dev: import.meta.env.DEV || false,
    };
    this.setState();
    this.setDebug();
  }

  setState() {
    this.loaded = {
      value: false,
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
      },
    };
    this.playing = {
      value: false,
      get() {
        return this.value;
      },
      set() {
        this.value = !this.value;
      },
    };
    this.muted = {
      value: false,
      get() {
        return this.value;
      },
      set() {
        this.value = !this.value;
      },
    };
    this.level = {
      value: 4,
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
        return;
      },
    };
    this.highscore = {
      value: 0,
      get() {
        return this.value;
      },
      set(value) {
        this.value = this.value + value;
        return;
      },
    };
    this.score = {
      value: 0,
      get() {
        return this.value;
      },
      set(value) {
        this.value = this.value + value;
        return;
      },
    };
    this.time = {
      value: 120000, // 2 Mins I think...
      get() {
        return this.value;
      },
      getFormattedTime() {
        function pad(n, z) {
          z = z || 2;
          return ("00" + n).slice(-z);
        }

        this.s = this.value;
        this.ms = this.s % 1000;
        this.s = (this.s - this.ms) / 1000;
        this.secs = this.s % 60;
        this.s = (this.s - this.secs) / 60;
        this.mins = this.s % 60;

        return pad(this.mins) + ":" + pad(this.secs);
      },
      set(value) {
        this.value = this.value - value;
        return;
      },
    };

    this.fuel = {
      value: 0,
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
      },
    };

    this.altitude = {
      value: 0,
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
        return;
      },
    };
    this.horizontalSpeed = {
      value: 0,
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
        return;
      },
    };
    this.verticalSpeed = {
      value: 0,
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
        return;
      },
    };
    this.view = {
      value: "front",
      get() {
        return this.value;
      },
      set() {
        this.value = this.value === "front" ? "side" : "front";
        return;
      },
    };
    this.cameraInTransit = {
      value: false,
      get() {
        return this.value;
      },
      set() {
        this.value = !this.value;
        return;
      },
    };
    this.updateCameraProjection = {
      value: false,
      get() {
        return this.value;
      },
      set() {
        this.value = !this.value;
        return;
      },
    };
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "State",
        expanded: false,
      });
    }
  }
}
