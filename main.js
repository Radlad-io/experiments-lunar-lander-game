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

import "./src/style.css";
import Experience from "@Experience/Experience.js";
import gsap from "gsap";
// import ServiceWorker from "@Experience/Utils/RegisterServiceWorker.js";

gsap.registerPlugin(CustomEase);

//Capture keys right away
window.focus();

// Canvas
const canvas = document.querySelector("canvas.webgl");
const experience = new Experience(canvas);

// new ServiceWorker();

// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-R9CR6EWLMC");
