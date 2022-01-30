import gsap from "gsap";
import { mute, ambience, thrust } from "@components/Sound.js";
import { initialCameraFlyIn } from "@components/Camera.js";

const hud = document.querySelector(".hud");
const bottomBar = document.querySelector(".bottom-bar");
const title = document.querySelector(".intro-modal");
const instructions = document.querySelector(".instruction-modal");
const startBtn = document.querySelector(".start-btn");

// Initial title sequence
gsap.to(title, { delay: 0.75, duration: 0.75, opacity: 1 });
gsap.to(title, { delay: 4, duration: 1, opacity: 0 });
gsap.to(instructions, { delay: 5, duration: 0.75, opacity: 1 });

startBtn.addEventListener("click", () => {
  ambience.play();
  initialCameraFlyIn();
  gsap.to(instructions, { duration: 0.75, opacity: 0 }).then(() => {
    instructions.style.display = "none";
  });
  gsap.to(hud, { delay: 5, duration: 1, opacity: 1 });
  gsap.to(bottomBar, { delay: 5, duration: 1, opacity: 1 });
});

const muteBtn = document.querySelector(".sound-toggle");
muteBtn.addEventListener("click", () => {
  mute.toggle();
});

const info = document.querySelector(".info-modal");
const infoBtn = document.querySelector(".info-toggle");
let visible = false;
infoBtn.addEventListener("click", () => {
  console.log(info.style.display);
  if (visible == false) {
    console.log("Modal please");
    info.style.display = "flex";
    gsap.to(info, { duration: 0.5, opacity: 1 });
    visible = true;
  } else {
    console.log("Go away");
    gsap.to(info, { duration: 0.5, opacity: 0 }).then(() => {
      info.style.display = "none";
      visible = false;
    });
  }
});

window.addEventListener("keypress", (e) => {
  if (e.isComposing || e.key === " ") {
    if (!thrust.sound.isPlaying) {
      thrust.play();
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.isComposing || e.key === " ") {
    thrust.pause();
  }
});

export { hud };
