import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import { camera } from "./renderer.js";

import { createOrb } from "./orb.js";
import { createEnergyCore } from "./energy.js";

/* ==========================================================
   Scene
========================================================== */

export const scene = new THREE.Scene();

/* ==========================================================
   Background
========================================================== */

scene.background = null;

/* ==========================================================
   Lights
========================================================== */

const ambientLight = new THREE.AmbientLight(

    0xffffff,

    1.6

);

scene.add(ambientLight);

const keyLight = new THREE.PointLight(

    0x77ccff,

    18,

    100

);

keyLight.position.set(

    3,
    3,
    5

);

scene.add(keyLight);

const rimLight = new THREE.PointLight(

    0x2255ff,

    8,

    100

);

rimLight.position.set(

    -4,
    -2,
    -3

);

scene.add(rimLight);

/* ==========================================================
   Scene Objects
========================================================== */

export function createScene() {

    createOrb(scene);

    createEnergyCore(scene);

}

/* ==========================================================
   Export Camera
========================================================== */

export { camera };