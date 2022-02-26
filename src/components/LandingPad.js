import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Text } from "troika-three-text";
import font from "./fonts/IBMPlexMono-Bold.ttf";
import { world } from "./Physics";

// NOTE: Pad values 2x / 3x /4x / 5x
const padRenderMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 0.2,
});

const LandingPad = (multiplier, positionX, positionY, positionZ) => {
  const landingPad = new THREE.Group();
  const radius =
    multiplier === 2 ? 8 : multiplier === 3 ? 7 : multiplier === 4 ? 5 : 3;
  const landingPadRenderGeo = new THREE.CylinderBufferGeometry(
    radius,
    radius,
    10,
    20
  );
  const landingPadMesh = new THREE.Mesh(landingPadRenderGeo, padRenderMaterial);
  landingPadMesh.receiveShadow = true;
  landingPad.position.set(positionX, positionY, positionZ);
  landingPad.add(landingPadMesh);

  const landingPadPhysicsBody = new CANNON.Body({
    mass: 0,
    material: new CANNON.Material(),
    shape: new CANNON.Cylinder(radius, radius, 10, 20),
  });
  landingPadPhysicsBody.position.set(positionX, positionY, positionZ);
  world.addBody(landingPadPhysicsBody);

  // Set properties to configure:
  const padText = new Text();
  landingPad.add(padText);
  padText.text = `${multiplier}X`;
  padText.font = font;
  padText.fontSize = 2;
  padText.position.set(0, 5.5, 0);
  padText.color = 0xffffff;
  padText.anchorX = "50%";
  padText.anchorY = "50%";
  padText.anchorZ = "50%";
  padText.rotation.x = -Math.PI / 2;

  return landingPad;
};

export { LandingPad };
