import * as CANNON from "cannon-es";

// Physics
const params = {
  gravity: new CANNON.Vec3(0, -1.62, 0),
  // Earth -9.82 m/s²
  // Moon -1.62 m/s²
  material: new CANNON.Material(),
  velocity: new CANNON.Vec3(0, -2, 10),
  angularFactor: new CANNON.Vec3(1, 0, 1),
  angularDamping: 0.75,
  linearDamping: 0.015,
  allowSleep: true,
  sleepSpeedLimit: 1.0,
};

const world = new CANNON.World({
  gravity: params.gravity,
});

const landerBodyPhysics = new CANNON.Body({
  mass: 50, // kg
  material: new CANNON.Material(),
  velocity: new CANNON.Vec3(0, -2, 10),
  angularFactor: new CANNON.Vec3(1, 0, 1),
  angularDamping: 0.75,
  linearDamping: 0.015,
  allowSleep: true,
  sleepSpeedLimit: 1.0,
});

// Top Part
landerBodyPhysics.addShape(new CANNON.Sphere(3.5), new CANNON.Vec3(0, 3.5, 0));
// Middle part
landerBodyPhysics.addShape(new CANNON.Box(new CANNON.Vec3(2.5, 1.5, 2.5)));
// Feet
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(-3, -2.5, -3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(-3, -2.5, 3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(3, -2.5, -3));
landerBodyPhysics.addShape(new CANNON.Sphere(1), new CANNON.Vec3(3, -2.5, 3));

world.addBody(landerBodyPhysics);

export { world, landerBodyPhysics };
