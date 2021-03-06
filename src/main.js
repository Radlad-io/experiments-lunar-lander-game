//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  __        __    __  __    __   ______   _______         __         ______   __    __  _______   ________  _______   //
// /  |      /  |  /  |/  \  /  | /      \ /       \       /  |       /      \ /  \  /  |/       \ /        |/       \  //
// $$ |      $$ |  $$ |$$  \ $$ |/$$$$$$  |$$$$$$$  |      $$ |      /$$$$$$  |$$  \ $$ |$$$$$$$  |$$$$$$$$/ $$$$$$$  | //
// $$ |      $$ |  $$ |$$$  \$$ |$$ |__$$ |$$ |__$$ |      $$ |      $$ |__$$ |$$$  \$$ |$$ |  $$ |$$ |__    $$ |__$$ | //
// $$ |      $$ |  $$ |$$$$  $$ |$$    $$ |$$    $$<       $$ |      $$    $$ |$$$$  $$ |$$ |  $$ |$$    |   $$    $$<  //
// $$ |      $$ |  $$ |$$ $$ $$ |$$$$$$$$ |$$$$$$$  |      $$ |      $$$$$$$$ |$$ $$ $$ |$$ |  $$ |$$$$$/    $$$$$$$  | //
// $$ |_____ $$ \__$$ |$$ |$$$$ |$$ |  $$ |$$ |  $$ |      $$ |_____ $$ |  $$ |$$ |$$$$ |$$ |__$$ |$$ |_____ $$ |  $$ | //
// $$       |$$    $$/ $$ | $$$ |$$ |  $$ |$$ |  $$ |      $$       |$$ |  $$ |$$ | $$$ |$$    $$/ $$       |$$ |  $$ | //
// $$$$$$$$/  $$$$$$/  $$/   $$/ $$/   $$/ $$/   $$/       $$$$$$$$/ $$/   $$/ $$/   $$/ $$$$$$$/  $$$$$$$$/ $$/   $$/  //
//                                                                                                                      //
//                       An ode to Atari's 1979 Lunar Lander | Created by: Kevin Merinsky                               //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Libraries
import * as THREE from "three";
import { dev } from "@util/State.js";

// Mobile check
import  '@util/Mobile.js'

// // UI Animations
import { hud } from "@components/UI.js";

// Imports
import "./style.css";
import { scene } from "@components/MainScene.js";
// import { move } from "@components/Camera.js";
// import { landerBodyPhysics } from "@components/Physics.js";

// Utilities
import * as Sizes from "@util/Sizes.js";

// Animation
import { tick } from "@util/Time.js";

tick();

if (dev.get()) {
  console.log(scene);
}

// Event handelers
Sizes.handleResize();
