const init = {
  devState: import.meta.env.DEV || false,
  // devState: false,
  levelState: 1,
  bwGraphics: true,
  highscore: 0,
  score: 0,
  time: 12000, // 2 Mins I think...
  fuel: 1000,
  altitude: 100,
  horizontalSpeed: 0,
  verticalSpeed: 0,
  view: "front",
  fuelBurnRate: 0.2,
  playingState: false,
  cameraMovingState: true,
  contactThreshold: 1,
};

let devState = init.devState;
const dev = {
  get: () => {
    return devState;
  },
};

let playingState = init.playingState;
const playing = {
  get: () => {
    return playingState;
  },
  toggle: () => {
    playingState = !playingState;
    return playingState;
  },
};

let cameraMovingState = init.cameraMovingState;
const cameraMoving = {
  get: () => {
    return cameraMovingState;
  },
  toggle: () => {
    cameraMovingState = !cameraMovingState;
    return cameraMovingState;
  },
};

let levelState = init.levelState;
const level = {
  get: () => {
    return levelState;
  },
  increment: () => {
    levelState += 1;
    return levelState;
  },
};

let collisionState = [];
const collisions = {
  get: () => {
    return collisionState;
  },
  add: (i) => {
    if (i.contactForce > init.contactThreshold) {
      console.log("Crashed");
    }
    if (collisionState.length > 3) {
      console.log(collisions.get());
    }
    collisionState.push(i);
    return collisionState;
  },
  clear: () => {
    collisionState.length = 0;
    return collisionState;
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
  set: (multiplier) => {
    const levelScore = 100 * multiplier;
    scoreValue += levelScore;
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
  set: () => {
    fuelValue -= init.fuelBurnRate;
    fuelDisplay.innerHTML = fuelValue.toFixed(0);
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
    altitudeValue = altitude.toFixed(0);
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
        ? Math.abs(horizontalSpeedValue).toFixed(1) + " ←"
        : horizontalSpeedValue > 0
        ? Math.abs(horizontalSpeedValue).toFixed(1) + " →"
        : horizontalSpeedValue.toFixed(1);
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
        ? Math.abs(verticalSpeedValue).toFixed(1) + " ↓"
        : verticalSpeedValue > 0
        ? Math.abs(verticalSpeedValue).toFixed(1) + " ↑"
        : verticalSpeedValue.toFixed(1);
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
  playing,
  cameraMoving,
  collisions,
  level,
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
