import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import { renderer } from "./renderer.js";

import {

    scene,
    camera,
    createScene

} from "./scene.js";

import {

    updateOrb

} from "./orb.js";

import {

    updateEnergy

} from "./energy.js";

/* ==========================================================
   Build Scene
========================================================== */

createScene();

/* ==========================================================
   Clock
========================================================== */

const clock = new THREE.Clock();

/* ==========================================================
   Animation Loop
========================================================== */

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    updateOrb(delta);

    updateEnergy(delta);

    renderer.render(

        scene,

        camera

    );

}

animate();

console.log(

    "%cHUDI FaceCore v1",

    "color:#55bbff;font-size:18px;font-weight:bold;"

);