const init = {
  devState: import.meta.env.DEV || false,
  bwGraphics: true,
  highscore: 0,
  score: 550,
  time: 1200, // 2 Mins I think...
  fuel: 900,
  altitude: 100,
  horizontalSpeed: 0,
  verticalSpeed: 0,
  view: "front",
};

let devState = init.devState;
const dev = {
  get: () => {
    return devState;
  },
};

let graphicsState = init.bwGraphics;
const graphics = {
  get: () => {
    return graphicsState;
  },
  toggle: () => {
    graphicsState = !graphicsState;
    return graphicsState;
  },
};

//    score
let scoreValue = init.score;
const scoreDisplay = document.querySelector(".hud-score span");
const score = {
  get: () => {
    return scoreValue;
  },
  set: (score) => {
    scoreValue = score;
    scoreDisplay.innerHTML = scoreValue;
    return scoreValue;
  },
};

//    playtime
let playtimeValue = init.playtime;
const playtimeDisplay = document.querySelector(".hud-time span");
const playtime = {
  get: () => {
    return playtimeValue;
  },
  set: (time) => {
    playtimeValue = time;
    playtimeDisplay.innerHTML = playtimeValue;
    return playtimeValue;
  },
};

//    fuel
let fuelValue = init.fuel;
const fuelDisplay = document.querySelector(".hud-fuel span");
const fuel = {
  get: () => {
    return fuelValue;
  },
  set: (fuel) => {
    fuelValue = fuel;
    fuelDisplay.innerHTML = fuelValue;
    return fuelValue;
  },
};
fuel.set(fuelValue);

//    altitude
let altitudeValue = init.altitude;
const altitudeDisplay = document.querySelector(".hud-altitude span");
const altitude = {
  get: () => {
    return altitudeValue;
  },
  set: (altitude) => {
    altitudeValue = altitude;
    altitudeDisplay.innerHTML = altitudeValue;
    return altitudeValue;
  },
};

//    horizontal speed
let horizontalSpeedValue = init.horizontalSpeed;
const horizontalSpeedDisplay = document.querySelector(".hud-horizontal span");
const horizontalSpeed = {
  get: () => {
    return horizontalSpeedValue;
  },
  set: (horizontalSpeed) => {
    horizontalSpeedValue = horizontalSpeed;
    horizontalSpeedDisplay.innerHTML =
      horizontalSpeedValue < 0
        ? Math.abs(horizontalSpeedValue) + " ←"
        : horizontalSpeedValue > 0
        ? horizontalSpeedValue + " →"
        : horizontalSpeedValue;
    return horizontalSpeedValue;
  },
};

//    vertical speed
let verticalSpeedValue = init.verticalSpeed;
const verticalSpeedDisplay = document.querySelector(".hud-vertical span");
const verticalSpeed = {
  get: () => {
    return verticalSpeedValue;
  },
  set: (verticalSpeed) => {
    verticalSpeedValue = verticalSpeed;
    verticalSpeedDisplay.innerHTML =
      verticalSpeedValue < 0
        ? Math.abs(verticalSpeedValue) + " ↓"
        : verticalSpeedValue > 0
        ? verticalSpeedValue + " ↑"
        : verticalSpeedValue;
    return verticalSpeedValue;
  },
};

//    view
let viewValue = init.view;
const viewValueDisplay = document.querySelector(".hud-view span");
const view = {
  get: () => {
    return viewValue;
  },
  set: (view) => {
    if (view === "front" || "side" || "top") {
      viewValue = view;
      viewValueDisplay.innerHTML = viewValue;
      return verticalSpeedValue;
    } else {
      return console.error("View can only be set to front, side or top");
    }
  },
};

let thrustValue = false;
const thrust = {
  get: () => {
    return thrustValue;
  },
  toggle: () => {
    thrustValue = !thrustValue;
  },
};

export {
  dev,
  graphics,
  score,
  playtime,
  fuel,
  altitude,
  horizontalSpeed,
  verticalSpeed,
  view,
  thrust,
};
