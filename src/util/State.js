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

export { dev, graphics };
