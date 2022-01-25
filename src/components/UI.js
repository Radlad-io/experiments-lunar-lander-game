import gsap from "gsap";
import { ambience, status } from "@components/Sound.js";
import { initialCameraFlyIn } from "@components/Camera.js";

const hud = document.querySelector(".hud");
const bottomBar = document.querySelector(".bottom-bar");
const title = document.querySelector(".intro-modal");
const instructions = document.querySelector(".instruction-modal");
const startBtn = document.querySelector(".start-btn");
const muteBtn = document.querySelector(".sound-toggle");

gsap.to(title, { delay: 0.75, duration: 0.75, opacity: 1 });
gsap.to(title, { delay: 4, duration: 1, opacity: 0 });
gsap.to(instructions, { delay: 5, duration: 0.75, opacity: 1 });

startBtn.addEventListener("click", () => {
  status.set();
  ambience.play();
  gsap
    .to(instructions, { duration: 0.5, opacity: 0 })
    .then((instructions.style.display = "none"));
  gsap.to(hud, { delay: 5, duration: 1, opacity: 1 });
  gsap.to(bottomBar, { delay: 5, duration: 1, opacity: 1 });
  initialCameraFlyIn();
});

muteBtn.addEventListener("click", () => {
  if (status.get() === false) {
    status.set();
    ambience.play();
  } else if (status.get() === true) {
    status.set();
    ambience.pause();
  }
});

export { hud };
