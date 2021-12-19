// Global variables
const isDev = import.meta.env.DEV;
var debug = isDev;
var isOriginalGraphics;
isOriginalGraphics = true;

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

export { debug, isOriginalGraphics };
