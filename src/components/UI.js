import * as THREE from "three";
import { dev, playing, graphics, thrust } from "@util/State.js";
import * as Sounds from "@components/Sound.js";
import { move } from "@components/Camera.js";
import { scene } from "@components/MainScene.js";
import gsap from "gsap";

const banner = document.querySelector(".banner");
const hud = document.querySelector(".hud");
const bottomBar = document.querySelector(".bottom-bar");
const title = document.querySelector(".intro-modal");
const instructions = document.querySelector(".instruction-modal");
const startBtn = document.querySelector(".start-btn");
const lowFuelIndicatorBG = document.querySelector(".low-fuel-indicator-bg");
const lowFuelIndicator = document.querySelector(".low-fuel-indicator");

// Initial title sequence
// Skips sequence if Dev
if (dev.get()) {
  banner.style.display = "none";
  title.style.display = "none";
  instructions.style.display = "none";
  move.initialCameraFlyIn();
  // TODO:: I don't know about this pal. Maybe an event with the three loading manager can help
  setTimeout(() => {
    playing.toggle();
  }, 1000);
  gsap.to(hud, { delay: 0, duration: 1, opacity: 1 });
  gsap.to(bottomBar, { delay: 0, duration: 1, opacity: 1 });
} else {
  gsap.to(title, { delay: 0.75, duration: 0.75, opacity: 1 });
  gsap.to(title, { delay: 5, duration: 1, opacity: 0 });
  gsap.to(instructions, { delay: 6, duration: 0.75, opacity: 1 });
}

//Capture keys right away
window.focus();

const initLowFuelIndicator = {
  toggle: () => {
    lowFuelIndicatorBG.style.opacity = 1;
    gsap.fromTo(
      lowFuelIndicator,
      { opacity: 0 },
      {
        ease: CustomEase.create(
          "custom",
          "M0,0 C0,0.196 0,1 0.5,1 1,1 1,0.2 1,0 "
        ),
        duration: 2,
        opacity: 1,
        repeat: -1,
      }
    );
  },
};

// UI Mute Button
const muteBtn = document.querySelector(".sound-toggle");
muteBtn.addEventListener("click", () => {
  Sounds.mute.toggle();
});

// UI Info Modal
const info = document.querySelector(".info-modal");
const infoBtn = document.querySelector(".info-toggle");
let visible = false;
infoBtn.addEventListener("click", () => {
  console.log(info.style.display);
  if (visible == false) {
    info.style.display = "flex";
    gsap.to(info, { duration: 0.5, opacity: 1 });
    visible = true;
  } else {
    gsap.to(info, { duration: 0.5, opacity: 0 }).then(() => {
      info.style.display = "none";
      visible = false;
    });
  }
});

// UI Graphics Toggle
import { setSobel } from "@util/Renderer.js";
const graphicsToggle = document.querySelector(".graphics-toggle");
graphicsToggle.addEventListener("click", () => {
  graphics.toggle();
  let current = graphics.get();
  scene.background =
    current === false ? new THREE.Color(0x000000) : new THREE.Color(0xffffff);
  setSobel(current);
});

// UI Start Button
startBtn.addEventListener("click", () => {
  Sounds.ambience.play();
  move.initialCameraFlyIn();
  gsap.to(instructions, { duration: 0.75, opacity: 0 }).then(() => {
    instructions.style.display = "none";
  });
  gsap.to(hud, { delay: 5, duration: 1, opacity: 1 });
  gsap.to(bottomBar, { delay: 5, duration: 1, opacity: 1 });
  playing.toggle();
});

// UI Thrust Input
window.addEventListener("keypress", (e) => {
  if (e.isComposing || e.key === " ") {
    if (!thrust.get()) {
      thrust.toggle();
    } else {
      return;
    }
    if (!Sounds.thrust.sound.isPlaying) {
      Sounds.thrust.play();
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.isComposing || e.key === " ") {
    if (thrust.get()) {
      thrust.toggle();
    } else {
      return;
    }
    Sounds.thrust.pause();
  }
});

export { hud, initLowFuelIndicator };
