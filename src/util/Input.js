import * as Camera from "@components/Camera.js";

let key = {
  _pressed: {},
  _release_time: {},

  MAX_key_DELAY: 100,

  onkeydown: function (event) {
    var time = new Date().getTime();
    if (
      this._release_time[event.key] &&
      time < this._release_time[event.key] + this.MAX_key_DELAY
    ) {
      console.log("Mistimed keypress event detected");
      return false;
    }
    this._pressed[event.key] = true;
    if (key._pressed.Shift === true) {
      Camera.move.rotate();
    }
  },

  onkeyup: function (event) {
    delete this._pressed[event.key];
    console.log(key._pressed);
    this._release_time[event.key] = new Date().getTime();
  },
};

document.onkeydown = function (event) {
  return key.onkeydown(event);
};

document.onkeyup = function (event) {
  return key.onkeyup(event);
};

export { key };