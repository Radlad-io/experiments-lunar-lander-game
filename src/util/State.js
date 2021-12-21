let isState = import.meta.env.DEV || false;
const dev = {
  get: () => {
    return isState;
  },
  toggle: () => {
    isState = !isState;
    return isState;
  },
};

let graphicsState = true;
const graphics = {
  get: () => {
    return graphicsState;
  },
  toggle: () => {
    graphicsState = !graphicsState;
    return isState;
  },
};

//    score
let scoreValue = 0;
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
let playtimeValue = 0;
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
let fuelValue = 0;
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

//    altitude
let altitudeValue = 0;
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
let horizontalSpeedValue = 0;
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
let verticalSpeedValue = 0;
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
let viewValue = "front";
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
};
