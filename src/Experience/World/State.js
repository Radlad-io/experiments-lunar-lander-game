import Experience from "@Experience/Experience.js";

let instance = null;
export default class State {
  constructor() {
    // Create state as singleton
    if (instance) {
      return instance;
    }
    instance = this;

    this.experience = new Experience();
    this.interface = this.experience.interface;
    this.debug = this.experience.debug;
    this.params = {
      dev: import.meta.env.DEV || false,
      playing: false,
      cameraInTransit: true,
      contactThreshold: 1,
    };

    this.fuel;

    this.setState();
    this.setDebug();
  }

  setState() {
    this.loaded = {
      value: false,
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = value;
      },
    };
    this.muted = {
      value: false,
      get: () => {
        return this.value;
      },
      set: () => {
        this.value = !this.value;
      },
    };
    this.level = {
      value: 1,
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = value;
        return;
      },
    };
    this.highscore = {
      value: 0,
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = this.value + value;
        return;
      },
    };
    this.score = {
      value: 0,
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = this.value + value;
        return;
      },
    };
    this.time = {
      value: 12000, // 2 Mins I think...
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = this.value - value;
        return;
      },
    };

    this.fuel = {
      value: 0,
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = value;
        this.interface.hud.update.fuel(this.value);
      },
    };

    this.altitude = {
      value: 0,
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = value;
        return;
      },
    };
    this.horizontalSpeed = {
      value: 0,
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = value;
        return;
      },
    };
    this.verticalSpeed = {
      value: 0,
      get: () => {
        return this.value;
      },
      set: (value) => {
        this.value = value;
        return;
      },
    };
    this.view = {
      value: "front",
      get: () => {
        return this.value;
      },
      set: () => {
        this.value = this.value === "front" ? "side" : "front";
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
