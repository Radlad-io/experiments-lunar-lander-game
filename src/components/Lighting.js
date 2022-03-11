import * as THREE from "three";
import { landerBodyPhysics } from "@components/Physics.js";
import gsap from "gsap";
import { Lander } from "./Lander";

const Lighting = new THREE.Group();

const sunLight = new THREE.PointLight(0xffffff, 0, 300);
sunLight.position.set(-100, 50, -100);
Lighting.name = "Lighting";
Lighting.add(sunLight);

gsap.to(sunLight, {
  delay: 2.25,
  duration: 2.75,
  ease: "circ.easeIn",
  intensity: 1,
});

let color, intensity, distance, angle, penumbra, decay;
color = 0xffffff;
intensity = 1;
distance = 200;
angle = 0.0175;
penumbra = 0.75;
decay = 0;

const landerLight = new THREE.SpotLight(
  color,
  intensity,
  distance,
  angle,
  penumbra,
  decay
);

landerLight.position.set(0, landerBodyPhysics + 125, 0);
landerLight.name = "lander-light";
landerLight.target.position.set(
  landerLight.position.x,
  landerLight.position.y - 1,
  landerLight.position.z
);

const landerLightHelper = new THREE.SpotLightHelper(landerLight);
// Lighting.add(landerLight, landerLight.target, landerLightHelper);

export { Lighting, landerLight, landerLightHelper };
