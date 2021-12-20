/////////////////////////////////////////////////
//                                             //
//    Stats: Adds stats monitor to viewport    //
//                                             //
/////////////////////////////////////////////////

import { GUI } from "dat.gui";
import "@lib/rStats/rStats";
import { dev } from "@util/State.js";
import * as Cube from "@components/models/Cube.js";

var gui;

const rS = new rStats({
  values: {
    frame: { caption: "Total frame time (ms)", over: 16 },
    raf: { caption: "Time since last rAF (ms)" },
    fps: { caption: "Framerate (FPS)", below: 30 },
    action1: { caption: "Render action #1 (ms)" },
    render: { caption: "WebGL Render (ms)" },
  },
  groups: [
    { caption: "Framerate", values: ["fps", "raf"] },
    { caption: "Frame Budget", values: ["frame", "action1", "render"] },
  ],
  fractions: [{ base: "frame", steps: ["action1", "render"] }],
});

function stats() {
  if (dev.get()) {
    gui = new GUI();
    const cubeFolder = gui.addFolder("Cube");
    cubeFolder.add(Cube.rotation, "x", 0, Math.PI * 2);
    cubeFolder.add(Cube.rotation, "y", 0, Math.PI * 2);
    cubeFolder.add(Cube.rotation, "z", 0, Math.PI * 2);
    cubeFolder.open();
  }
}

function start() {
  if (dev.get()) {
    rS("frame").start();
    rS("rAF").tick();
    rS("FPS").frame();
  }
}

function end() {
  if (dev.get()) {
    rS("frame").end();
    rS().update();
  }
}

export { gui, stats, start, end };
