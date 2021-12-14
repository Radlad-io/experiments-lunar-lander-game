import "./style.css";
// import * as THREE from "three";
// import gsap from "gsap";

// Global variables
let isDev = import.meta.env.DEV;
export let debug = isDev;

// Utilities
import * as Sizes from "@util/Sizes.js";

// Init
window.focus(); //Capture keys right away

// Animation
import { tick } from "@util/Time.js";
tick();

// Event handelers
Sizes.handleResize();
