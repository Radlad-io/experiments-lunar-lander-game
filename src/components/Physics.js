import * as CANNON from "cannon-es";
import gsap from "gsap";

// Physics
const params = {
  gravity: new CANNON.Vec3(0, -1.62, 0),
  // Earth -9.82 m/s²
  // Moon -1.62 m/s²
  material: new CANNON.Material(),
  velocity: new CANNON.Vec3(0, -5, 0),
  angularFactor: new CANNON.Vec3(1, 0, 1),
  angularDamping: 0.75,
  linearDamping: 0.015,
  allowSleep: true,
  sleepSpeedLimit: 2.0,
  landerThrust: 3.5,
  landerMass: 50,
  rotationFactor: 4,
};

const world = new CANNON.World({
  gravity: params.gravity,
});

const landerBodyPhysics = new CANNON.Body({
  mass: params.landerMass, // kg
  material: params.material,
  velocity: params.velocity,
  angularFactor: params.angularFactor,
  angularDamping: params.angularDamping,
  linearDamping: params.linearDamping,
  allowSleep: params.allowSleep,
  sleepSpeedLimit: params.sleepSpeedLimit,
});

// Lander parts (Top, Middle, Feet)
landerBodyPhysics.addShape(new CANNON.Sphere(0.9), new CANNON.Vec3(0, 2.25, 0));
landerBodyPhysics.addShape(
  new CANNON.Sphere(0.15),
  new CANNON.Vec3(-0.9, 0.75, -0.9)
);
landerBodyPhysics.addShape(
  new CANNON.Sphere(0.15),
  new CANNON.Vec3(-0.9, 0.75, 0.9)
);
landerBodyPhysics.addShape(
  new CANNON.Sphere(0.15),
  new CANNON.Vec3(0.9, 0.75, -0.9)
);
landerBodyPhysics.addShape(
  new CANNON.Sphere(0.15),
  new CANNON.Vec3(0.9, 0.75, 0.9)
);
//  TODO: Y Offset here accounds for the origin of the lander model I think
//        Try reseting the origin in blender to the icosphere
landerBodyPhysics.position.set(0, 50.766, 0);
world.addBody(landerBodyPhysics);

const landerPhysics = {
  thrust: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, params.landerThrust, 0)
    );
  },
  foward: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, 0.5, 0.25),
      new CANNON.Vec3(0, -1 * params.rotationFactor, 0)
    );
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, 0.5, -0.125),
      new CANNON.Vec3(0, 1 * params.rotationFactor, 0)
    );
    return;
  },
  backward: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, 0.5, -0.25),
      new CANNON.Vec3(0, -1 * params.rotationFactor, 0)
    );
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, 0.5, 0.25),
      new CANNON.Vec3(0, 1 * params.rotationFactor, 0)
    );
    return;
  },
  left: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0.25, 0.5, 0),
      new CANNON.Vec3(0, -1 * params.rotationFactor, 0)
    );
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(-0.25, 0.5, 0),
      new CANNON.Vec3(0, 1 * params.rotationFactor, 0)
    );
    return;
  },
  right: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(-0.25, 0.5, 0),
      new CANNON.Vec3(0, -1 * params.rotationFactor, 0)
    );
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0.25, 0.5, 0),
      new CANNON.Vec3(0, 1 * params.rotationFactor, 0)
    );
    return;
  },
  resetForces: () => {
    gsap.to(landerBodyPhysics.quaternion, {
      // TODO: Refactor camera movement speed into global state
      duration: 0.4,
      ease: "none",
      x: 0,
      y: 0,
      z: 0,
    });
    landerBodyPhysics.angularVelocity = new CANNON.Vec3(0, 0, 0);
    return;
  },
};

landerBodyPhysics.addEventListener("collide", (event) => {
  const contactForce = event.contact.getImpactVelocityAlongNormal();
  console.log(contactForce);
});

export { world, landerBodyPhysics, landerPhysics };
