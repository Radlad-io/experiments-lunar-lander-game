import * as THREE from "three";
import { scene } from "@components/MainScene.js";
import gsap from "gsap";

const lighting = new THREE.Group();

const sunLight = new THREE.PointLight(0xffffff, 0, 300);
sunLight.position.set(-100, 50, -100);
lighting.add(sunLight);

gsap.to(sunLight, {
  delay: 1.25,
  duration: 2.75,
  ease: "circ.easeIn",
  intensity: 0.75,
});

let color, intensity, distance, angle, penumbra, decay;
color = 0xffffff;
intensity = 1;
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
// lighting.add(landerLight);

const landerLightHelper = new THREE.SpotLightHelper(landerLight);

export { lighting, landerLight, landerLightHelper };
