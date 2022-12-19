import Experience from "../Experience";

export default class Inputs {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.pressed = {};
    this.releaseTime = {};
    this.params = {
      max_key_delay: 100,
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
  }

  onKeyUp(e) {
    delete this.pressed[e.key];
    this.releaseTime[e.key] = new Date().getTime();
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
