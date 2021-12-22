import gsap from "gsap";

const hud = document.querySelector(".hud");
const bottomBar = document.querySelector(".bottom-bar");
const title = document.querySelector(".intro-modal");

gsap.to(hud, { delay: 8, duration: 1, opacity: 1 });
gsap.to(bottomBar, { delay: 8, duration: 1, opacity: 1 });

gsap.to(title, { delay: 0.75, duration: 0.75, opacity: 1 });
gsap.to(title, { delay: 5, duration: 1, opacity: 0 });

export { hud };
