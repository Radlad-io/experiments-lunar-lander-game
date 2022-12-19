"use strict";
// exports.__esModule = true;
// exports.CannonDebugRenderer = exports.CannonUtils = void 0;
//MIT License
//Copyright (c) 2020-2021 Sean Bradley
import * as THREE from "three";
import * as CANNON from "cannon-es";

var CannonUtils = /** @class */ (function () {
  function CannonUtils() {}
  CannonUtils.CreateTrimesh = function (geometry) {
    var vertices;
    if (geometry.index === null) {
      vertices = geometry.attributes.position.array;
    } else {
      vertices = geometry.clone().toNonIndexed().attributes.position.array;
    }
    var indices = Object.keys(vertices).map(Number);
    return new CANNON.Trimesh(vertices, indices);
  };
  CannonUtils.CreateConvexPolyhedron = function (geometry) {
    var position = geometry.attributes.position;
    var normal = geometry.attributes.normal;
    var vertices = [];
    for (var i = 0; i < position.count; i++) {
      vertices.push(new THREE.Vector3().fromBufferAttribute(position, i));
    }
    var faces = [];
    for (var i = 0; i < position.count; i += 3) {
      var vertexNormals =
        normal === undefined
          ? []
          : [
              new THREE.Vector3().fromBufferAttribute(normal, i),
              new THREE.Vector3().fromBufferAttribute(normal, i + 1),
              new THREE.Vector3().fromBufferAttribute(normal, i + 2),
            ];
      var face = {
        a: i,
        b: i + 1,
        c: i + 2,
        normals: vertexNormals,
      };
      faces.push(face);
    }
    var verticesMap = {};
    var points = [];
    var changes = [];
    for (var i = 0, il = vertices.length; i < il; i++) {
      var v = vertices[i];
      var key =
        Math.round(v.x * 100) +
        "_" +
        Math.round(v.y * 100) +
        "_" +
        Math.round(v.z * 100);
      if (verticesMap[key] === undefined) {
        verticesMap[key] = i;
        points.push(
          new CANNON.Vec3(vertices[i].x, vertices[i].y, vertices[i].z)
        );
        changes[i] = points.length - 1;
      } else {
        changes[i] = changes[verticesMap[key]];
      }
    }
    var faceIdsToRemove = [];
    for (var i = 0, il = faces.length; i < il; i++) {
      var face = faces[i];
      face.a = changes[face.a];
      face.b = changes[face.b];
      face.c = changes[face.c];
      var indices = [face.a, face.b, face.c];
      for (var n = 0; n < 3; n++) {
        if (indices[n] === indices[(n + 1) % 3]) {
          faceIdsToRemove.push(i);
          break;
        }
      }
    }
    for (var i = faceIdsToRemove.length - 1; i >= 0; i--) {
      var idx = faceIdsToRemove[i];
      faces.splice(idx, 1);
    }
    var cannonFaces = faces.map(function (f) {
      return [f.a, f.b, f.c];
    });
    return new CANNON.ConvexPolyhedron({
      vertices: points,
      faces: cannonFaces,
    });
  };
  CannonUtils.offsetCenterOfMass = function (body, centreOfMass) {
    body.shapeOffsets.forEach(function (offset) {
      centreOfMass.vadd(offset, centreOfMass);
    });
    centreOfMass.scale(1 / body.shapes.length, centreOfMass);
    body.shapeOffsets.forEach(function (offset) {
      offset.vsub(centreOfMass, offset);
    });
    var worldCenterOfMass = new CANNON.Vec3();
    body.vectorToWorldFrame(centreOfMass, worldCenterOfMass);
    body.position.vadd(worldCenterOfMass, body.position);
  };
  return CannonUtils;
})();
// exports.CannonUtils = CannonUtils;

var CannonDebugRenderer = /** @class */ (function () {
  function CannonDebugRenderer(scene, world, options) {
    this._particleMaterial = new THREE.PointsMaterial();
    this.tmpVec0 = new CANNON.Vec3();
    this.tmpVec1 = new CANNON.Vec3();
    this.tmpVec2 = new CANNON.Vec3();
    this.tmpQuat0 = new CANNON.Quaternion();
    options = options || {};
    this.scene = scene;
    this.world = world;
    this._meshes = [];
    this._material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
      name: "Debug Material",
    });
    this._particleMaterial = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 10,
      sizeAttenuation: false,
      depthTest: false,
      name: "Debug Material",
    });
    this._sphereGeometry = new THREE.SphereGeometry(1);
    this._boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    this._cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 8);
    this._planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    this._particleGeometry = new THREE.BufferGeometry();
    this._particleGeometry.setFromPoints([new THREE.Vector3(0, 0, 0)]);
  }
  CannonDebugRenderer.prototype.update = function () {
    var bodies = this.world.bodies;
    var meshes = this._meshes;
    var shapeWorldPosition = this.tmpVec0;
    var shapeWorldQuaternion = this.tmpQuat0;
    var meshIndex = 0;
    for (var i = 0; i !== bodies.length; i++) {
      var body = bodies[i];
      for (var j = 0; j !== body.shapes.length; j++) {
        var shape = body.shapes[j];
        this._updateMesh(meshIndex, body, shape);
        var mesh = meshes[meshIndex];
        if (mesh) {
          // Get world position
          body.quaternion.vmult(body.shapeOffsets[j], shapeWorldPosition);
          body.position.vadd(shapeWorldPosition, shapeWorldPosition);
          // Get world quaternion
          body.quaternion.mult(body.shapeOrientations[j], shapeWorldQuaternion);
          // Copy to meshes
          mesh.position.x = shapeWorldPosition.x;
          mesh.position.y = shapeWorldPosition.y;
          mesh.position.z = shapeWorldPosition.z;
          mesh.quaternion.x = shapeWorldQuaternion.x;
          mesh.quaternion.y = shapeWorldQuaternion.y;
          mesh.quaternion.z = shapeWorldQuaternion.z;
          mesh.quaternion.w = shapeWorldQuaternion.w;
        }
        meshIndex++;
      }
    }
    for (var i = meshIndex; i < meshes.length; i++) {
      var mesh = meshes[i];
      if (mesh) {
        this.scene.remove(mesh);
      }
    }
    meshes.length = meshIndex;
  };
  CannonDebugRenderer.prototype._updateMesh = function (index, body, shape) {
    var mesh = this._meshes[index];
    if (!this._typeMatch(mesh, shape)) {
      if (mesh) {
        //console.log(shape.type)
        this.scene.remove(mesh);
      }
      mesh = this._meshes[index] = this._createMesh(shape);
    }
    this._scaleMesh(mesh, shape);
  };
  CannonDebugRenderer.prototype._typeMatch = function (mesh, shape) {
    if (!mesh) {
      return false;
    }
    var geo = mesh.geometry;
    return (
      (geo instanceof THREE.SphereGeometry && shape instanceof CANNON.Sphere) ||
      (geo instanceof THREE.BoxGeometry && shape instanceof CANNON.Box) ||
      (geo instanceof THREE.CylinderGeometry &&
        shape instanceof CANNON.Cylinder) ||
      (geo instanceof THREE.PlaneGeometry && shape instanceof CANNON.Plane) ||
      shape instanceof CANNON.ConvexPolyhedron ||
      (geo.id === shape.id && shape instanceof CANNON.Trimesh) ||
      (geo.id === shape.id && shape instanceof CANNON.Heightfield)
    );
  };
  CannonDebugRenderer.prototype._createMesh = function (shape) {
    var mesh;
    var geometry;
    var v0;
    var v1;
    var v2;
    var material = this._material;
    var points = [];
    switch (shape.type) {
      case CANNON.Shape.types.SPHERE:
        mesh = new THREE.Mesh(this._sphereGeometry, material);
        break;
      case CANNON.Shape.types.BOX:
        mesh = new THREE.Mesh(this._boxGeometry, material);
        break;
      case CANNON.Shape.types.CYLINDER:
        geometry = new THREE.CylinderGeometry(
          shape.radiusTop,
          shape.radiusBottom,
          shape.height,
          shape.numSegments
        );
        mesh = new THREE.Mesh(geometry, material);
        break;
      case CANNON.Shape.types.PLANE:
        mesh = new THREE.Mesh(this._planeGeometry, material);
        break;
      case CANNON.Shape.types.PARTICLE:
        mesh = new THREE.Points(this._particleGeometry, this._particleMaterial);
        break;
      case CANNON.Shape.types.CONVEXPOLYHEDRON:
        // Create mesh
        geometry = new THREE.BufferGeometry();
        shape.id = geometry.id;
        points = [];
        for (var i = 0; i < shape.vertices.length; i += 1) {
          var v = shape.vertices[i];
          points.push(new THREE.Vector3(v.x, v.y, v.z));
        }
        geometry.setFromPoints(points);
        var indices = [];
        for (var i = 0; i < shape.faces.length; i++) {
          var face = shape.faces[i];
          var a = face[0];
          for (var j = 1; j < face.length - 1; j++) {
            var b = face[j];
            var c = face[j + 1];
            indices.push(a, b, c);
          }
        }
        geometry.setIndex(indices);
        mesh = new THREE.Mesh(geometry, material);
        break;
      case CANNON.Shape.types.TRIMESH:
        geometry = new THREE.BufferGeometry();
        shape.id = geometry.id;
        points = [];
        for (var i = 0; i < shape.vertices.length; i += 3) {
          points.push(
            new THREE.Vector3(
              shape.vertices[i],
              shape.vertices[i + 1],
              shape.vertices[i + 2]
            )
          );
        }
        geometry.setFromPoints(points);
        mesh = new THREE.Mesh(geometry, material);
        break;
      case CANNON.Shape.types.HEIGHTFIELD:
        geometry = new THREE.BufferGeometry();
        v0 = this.tmpVec0;
        v1 = this.tmpVec1;
        v2 = this.tmpVec2;
        for (var xi = 0; xi < shape.data.length - 1; xi++) {
          for (var yi = 0; yi < shape.data[xi].length - 1; yi++) {
            for (var k = 0; k < 2; k++) {
              shape.getConvexTrianglePillar(xi, yi, k === 0);
              v0.copy(shape.pillarConvex.vertices[0]);
              v1.copy(shape.pillarConvex.vertices[1]);
              v2.copy(shape.pillarConvex.vertices[2]);
              v0.vadd(shape.pillarOffset, v0);
              v1.vadd(shape.pillarOffset, v1);
              v2.vadd(shape.pillarOffset, v2);
              points.push(
                new THREE.Vector3(v0.x, v0.y, v0.z),
                new THREE.Vector3(v1.x, v1.y, v1.z),
                new THREE.Vector3(v2.x, v2.y, v2.z)
              );
              //const i = geometry.vertices.length - 3
              //geometry.faces.push(new THREE.Face3(i, i + 1, i + 2))
            }
          }
        }
        geometry.setFromPoints(points);
        //geometry.computeBoundingSphere()
        //geometry.computeFaceNormals()
        mesh = new THREE.Mesh(geometry, material);
        shape.id = geometry.id;
        break;
      default:
        mesh = new THREE.Mesh();
        break;
    }
    if (mesh && mesh.geometry) {
      this.scene.add(mesh);
    }
    return mesh;
  };
  CannonDebugRenderer.prototype._scaleMesh = function (mesh, shape) {
    var radius;
    var halfExtents;
    var scale;
    switch (shape.type) {
      case CANNON.Shape.types.SPHERE:
        radius = shape.radius;
        mesh.scale.set(radius, radius, radius);
        break;
      case CANNON.Shape.types.BOX:
        halfExtents = shape.halfExtents;
        mesh.scale.copy(
          new THREE.Vector3(halfExtents.x, halfExtents.y, halfExtents.z)
        );
        mesh.scale.multiplyScalar(2);
        break;
      case CANNON.Shape.types.CONVEXPOLYHEDRON:
        mesh.scale.set(1, 1, 1);
        break;
      case CANNON.Shape.types.TRIMESH:
        scale = shape.scale;
        mesh.scale.copy(new THREE.Vector3(scale.x, scale.y, scale.z));
        break;
      case CANNON.Shape.types.HEIGHTFIELD:
        mesh.scale.set(1, 1, 1);
        break;
    }
  };
  return CannonDebugRenderer;
})();
// exports.CannonDebugRenderer = CannonDebugRenderer;

export { CannonUtils, CannonDebugRenderer };
