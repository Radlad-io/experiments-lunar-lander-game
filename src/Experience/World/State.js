import Experience from "@Experience/Experience.js";

export default class State {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.params = {
      dev: import.meta.env.DEV || false,
      level: 1,
      highscore: 0, // TODO: Init from local store
      score: 0,
      time: 12000, // 2 Mins I think...
      fuel: 1000,
      startingAltitude: 100,
      horizontalSpeed: 0,
      verticalSpeed: 0,
      view: "front",
      fuelBurnRate: 0.2,
      playing: false,
      cameraInTransit: true,
      contactThreshold: 1,
    };

    this.setDebug();

    this.dev = {
      value: this.params.dev,
      get getDev() {
        return this.value;
      },
      set setDev(value) {
        this.value = value;
      },
    };
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "State",
        expanded: true,
      });

      this.debugFolder.addMonitor(this.params, "fuel", {
        multiline: true,
        lineCount: 6,
      });
      this.debugFolder.addMonitor(this.params, "time", {
        multiline: true,
        lineCount: 6,
      });

      // Adds all params to debug UI
      // Object.keys(this.params).forEach((key, index) => {
      //   this[key] = this.debugFolder.addInput(this.params, key);
      //   this[key].on(
      //     "change",
      //     (e) => (
      //       (this.params[key] = e.value),
      //       console.log(`Set ${key} to:`, this.params[key])
      //     )
      //   );
      // });
    }
  }
}
