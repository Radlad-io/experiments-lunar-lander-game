import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Text } from "troika-three-text";
import { world } from "./Physics";

// NOTE: Pad values 2x / 3x /4x / 5x
const padRenderMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 0.2,
});

const LandingPad = (multiplier, position) => {
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
  landingPad.position.set(-30, -78, 10);
  landingPad.add(landingPadMesh);

  const landingPadPhysicsBody = new CANNON.Body({
    mass: 0,
    material: new CANNON.Material(),
    shape: new CANNON.Cylinder(radius, radius, 10, 20),
  });
  landingPadPhysicsBody.position.set(-30, -78, 10);
  world.addBody(landingPadPhysicsBody);

  return landingPad;
};

export { LandingPad };
