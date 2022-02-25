import * as CANNON from "cannon-es";

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
  allowSleep: false,
  sleepSpeedLimit: 1.0,
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
landerBodyPhysics.addShape(new CANNON.Sphere(3.5), new CANNON.Vec3(0, 3.5, 0));
landerBodyPhysics.addShape(new CANNON.Box(new CANNON.Vec3(2.5, 1.5, 2.5)));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(-3, -2.5, -3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(-3, -2.5, 3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(3, -2.5, -3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(3, -2.5, 3));
//  TODO: Y Offset here accounds for the origin of the lander model I think
//        Try reseting the origin in blender to the icosphere
landerBodyPhysics.position.set(0, 50.766, 0);
world.addBody(landerBodyPhysics);

//  Temp ground plane
const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
  material: new CANNON.Material(),
});
10;
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
groundBody.position.y = -75;
world.addBody(groundBody);

const landerPhysics = {
  thrust: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, params.landerThrust, 0)
    );
  },
  foward: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, .5, 1.5),
      new CANNON.Vec3(0, -1 * params.rotationFactor, 0)
    );
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, .5, -1.5),
      new CANNON.Vec3(0, 1 * params.rotationFactor, 0)
    );
    return;
  },
  backward: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, .5, -1.5),
      new CANNON.Vec3(0, -1 * params.rotationFactor, 0)
    );
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(0, .5, 1.5),
      new CANNON.Vec3(0, 1 * params.rotationFactor, 0)
    );
    return;
  },
  left: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(1.5, .5, 0),
      new CANNON.Vec3(0, -1 * params.rotationFactor, 0)
    );
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(-1.5, .5, 0),
      new CANNON.Vec3(0, 1 * params.rotationFactor, 0)
    );
    return;
  },
  right: () => {
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(-1.5, .5, 0),
      new CANNON.Vec3(0, -1 * params.rotationFactor, 0)
    );
    landerBodyPhysics.applyLocalImpulse(
      new CANNON.Vec3(1.5, .5, 0),
      new CANNON.Vec3(0, 1 * params.rotationFactor, 0)
    );
    return;
  },
  resetForces: () => {
    landerBodyPhysics.quaternion.setFromEuler(0, 0, 0);
    landerBodyPhysics.angularVelocity = new CANNON.Vec3(0, 0, 0);
    return;
  },
};

export { world, landerBodyPhysics, landerPhysics };
