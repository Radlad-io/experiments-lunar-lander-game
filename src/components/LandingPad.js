/////////////////////////////////////////////////
//                                             //
//    Landing Pad: Constructor landing pads    //
//                                             //
/////////////////////////////////////////////////

import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import typeface from "@components/fonts/IBM_Plex_Mono_Bold.typeface.json";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

const fontLoader = new FontLoader();
fontLoader.load(
  helvetiker,
  (font) => {
    console.log(font);
    // const textGeometry = new TextGeometry(
    //   'Hello',
    //   {
    //     font:
    //   }
    // )
  }
  // function (e) {
  //   // do something with the font
  //   console.log("Got that font yo");
  // },

  // // onProgress callback
  // function (xhr) {
  //   console.log("Font " + (xhr.loaded / xhr.total) * 100 + "% loaded");
  // },

  // // onError callback
  // function (err) {
  //   console.log("An error happened");
  // }
);

const LandingPad = (
  mulltiplyer,
  radiusTop,
  radiusBottom,
  height,
  radialSegments,
  heightSegments,
  openEnded,
  thetaStart,
  thetaLength
) => {
  const landingPad = new THREE.Group();

  const geometry = new THREE.CylinderGeometry(
    radiusTop,
    radiusBottom,
    height,
    radialSegments,
    heightSegments,
    openEnded,
    thetaStart,
    thetaLength
  );

  const material = new THREE.MeshBasicMaterial({
    color: 0x333333,
  });
  const mesh = new THREE.Mesh(geometry, material);
  landingPad.add(mesh);

  // const textGeometry = new TextGeometry("test", {
  //   font: font,
  //   size: 80,
  //   height: 50,
  //   // curveSegments: 12,
  //   // bevelEnabled: true,
  //   // bevelThickness: 10,
  //   // bevelSize: 8,
  //   // bevelOffset: 0,
  //   // bevelSegments: 5,
  // });

  // const textMesh = new THREE.Mesh(textGeometry, [
  //   new THREE.MeshBasicMaterial({ color: 0xffffff }),
  //   new THREE.MeshBasicMaterial({ color: 0xffffff }),
  // ]);

  // textMesh.position.set(0, 50, 0);
  // console.log("Test", textMesh.position);
  // landingPad.add(textMesh);

  return landingPad;
};

export { LandingPad };
