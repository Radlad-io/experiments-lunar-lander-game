// Global variables
let isDev = import.meta.env.DEV;
let debug = isDev;

// Imports
import "./style.css";
import { cameraMove } from "@components/Camera.js";

// Utilities
import * as Sizes from "@util/Sizes.js";

// Init
window.focus(); //Capture keys right away

// Animation
import { tick } from "@util/Time.js";
tick();

// Event handelers
Sizes.handleResize();

cameraMove();

export { debug };
