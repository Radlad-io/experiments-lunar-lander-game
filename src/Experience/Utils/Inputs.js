import Experience from "../Experience";
import Sound from "@World/Sound";

export default class Inputs {
  constructor() {
    this.experience = new Experience();
    this.interface = this.experience.interface;
    this.world = this.experience.world;
    this.state = this.experience.state;
    this.sound = this.experience.sound;
    this.debug = this.experience.debug;
    this.pressed = {};
    this.releaseTime = {};
    this.params = {
      max_key_delay: 50,
      logKeyPress: false,
    };

    document.addEventListener("keydown", (e) => this.onKeyDown(e));
    document.addEventListener("keyup", (e) => this.onKeyUp(e));

    this.setDebug();
  }

  onKeyDown(e) {
    var time = new Date().getTime();
    if (
      this.releaseTime[e.key] &&
      time < this.releaseTime[e.key] + this.params.max_key_delay
    ) {
      console.log("Mistimed keypress event detected");
      return false;
    }
    this.pressed[e.key] = true;

    switch (e.key) {
      case "p":
        this.state.playing.set();
        this.world.physics.params.physicsEnabled = this.state.playing.get();

        if (this.state.playing.get()) {
          this.updatePlayTimeInterval = setInterval(() => {
            this.interface.hud.update.time(this.state.time.getFormattedTime());
          }, 1000);
        }

        if (this.debug.active) {
          this.debug.pane.refresh();
        }
        break;
      case "Shift":
        this.experience.camera.rotateRig();
        this.experience.world.lander.resetForces(
          this.experience.camera.params.moveDuration
        );
        break;
      case "r":
        this.experience.world.lander.resetPosition();
        break;
    }

    if (this.debug.active && this.params.logKeyPress) {
      console.log(this.pressed);
    }
  }

  onKeyUp(e) {
    delete this.pressed[e.key];
    this.releaseTime[e.key] = new Date().getTime();
    if (this.debug.active && this.params.logKeyPress) {
      console.log(this.pressed);
    }
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.pane.addFolder({
        title: "Inputs",
        expanded: false,
      });

      // Adds all params to debug UI
      Object.keys(this.params).forEach((key, index) => {
        this[key] = this.debugFolder.addInput(this.params, key);
        this[key].on(
          "change",
          (e) => (
            (this.params[key] = e.value),
            console.log(`Set ${key} to:`, this.params[key])
          )
        );
      });
    }
  }
}
