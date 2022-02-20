import * as THREE from "three";
import * as CANNON from "cannon-es";
import { Text } from "troika-three-text";

const padRenderMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  emissive: 0xffffff,
  emissiveIntensity: 0.5,
});

const LandingPad = (multiplier, position) => {
  const landingPad = new THREE.Group();

  const landingPadRenderGeo = new THREE.CylinderBufferGeometry(
    multiplier >= 4 ? 8 : multiplier >= 2 ? 12 : 18,
    size || 10,
    10,
    20
  );
  const landingPadMesh = new THREE.Mesh(landingPadRenderGeo, padRenderMaterial);
  landingPadMesh.receiveShadow = true;

  landingPad.add(landingPadMesh);

  return landingPad;
};

export { LandingPad };
