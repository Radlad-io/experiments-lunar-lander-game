import * as THREE from "three";
import { scene } from "@components/MainScene.js";
import gsap from "gsap";

const lighting = new THREE.Group();

const sunLight = new THREE.PointLight(0xffffff, 0, 300);
sunLight.position.set(-100, 50, -100);
lighting.add(sunLight);

gsap.to(sunLight, {
  delay: 2,
  duration: 1.75,
  ease: "circ.easeIn",
  intensity: 0.75,
});

// const ambLight = new THREE.AmbientLight(0xffffff);
// ambLight.intensity = 50; // soft white light
// lighting.add(ambLight);

let color, intensity, distance, angle, penumbra, decay;
color = 0xffffff;
intensity = 2;
distance = 125;
angle = 0.075;
penumbra = 0.005;
decay = 0;

const landerLight = new THREE.SpotLight(
  color,
  intensity,
  distance,
  angle,
  penumbra,
  decay
);
landerLight.position.set(0, 75, 0);
landerLight.target.position.set(
  landerLight.position.x,
  landerLight.position.y - 75,
  landerLight.position.z
);
lighting.add(landerLight);

// gsap.to(landerLight.position, {
//   duration: 5,
//   ease: "circ.easeIn",
//   x: 50,
// });

const landerLightHelper = new THREE.SpotLightHelper(landerLight);

export { lighting, landerLight, landerLightHelper };
