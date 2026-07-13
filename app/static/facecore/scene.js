import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

/** Creates the Three.js scene and its light rig. */
export function createScene() {
  const scene = new THREE.Scene();
  scene.add(new THREE.HemisphereLight(0x84dfff, 0x02040c, 2.1));
  const key = new THREE.PointLight(0x77ddff, 20, 12, 2); key.position.set(2.5, 2.5, 4); scene.add(key);
  const rim = new THREE.PointLight(0x2e62ff, 13, 10, 2); rim.position.set(-3, -1.5, -2); scene.add(rim);
  return scene;
}
/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
scene.js

Responsibility:

• Own the Three.js Scene
• Create lighting
• Build FaceCore objects

Never owns:

✗ Camera
✗ Renderer

Author:
Project HUDI
==========================================================
*/

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import { LIGHTING } from "./config.js";

import { createOrb } from "./orb.js";
import { createEnergyCore } from "./energy.js";
import { createParticles } from "./particles.js";

/*
==========================================================
Scene
==========================================================
*/

export const scene = new THREE.Scene();

scene.background = null;

/*
==========================================================
Lights
==========================================================
*/

function createLights() {

    //------------------------------------
    // Ambient
    //------------------------------------

    const ambient = new THREE.AmbientLight(

        0xffffff,

        LIGHTING.AMBIENT

    );

    scene.add(ambient);

    //------------------------------------
    // Key Light
    //------------------------------------

    const key = new THREE.PointLight(

        0x66bbff,

        LIGHTING.KEY,

        100

    );

    key.position.set(

        3,

        3,

        5

    );

    scene.add(key);

    //------------------------------------
    // Rim Light
    //------------------------------------

    const rim = new THREE.PointLight(

        0x2255ff,

        LIGHTING.RIM,

        100

    );

    rim.position.set(

        -4,

        -2,

        -3

    );

    scene.add(rim);

}

/*
==========================================================
Build Scene
==========================================================
*/

export function createScene() {

    createLights();

    createOrb(scene);

    createEnergyCore(scene);

    createParticles(scene);

    console.log(

        "%cScene Ready",

        "color:#66bbff;font-weight:bold;"

    );

}