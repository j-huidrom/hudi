/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
main.js

Responsibility

• Bootstrap FaceCore
• Build Scene
• Connect Backend
• Run Animation Loop

Nothing else.

Author:
Project HUDI
==========================================================
*/

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import { APP } from "./config.js";

import {

    renderer,
    camera

} from "./renderer.js";

import {

    scene,
    createScene

} from "./scene.js";

import {

    updateOrb

} from "./orb.js";

import {

    updateEnergy

} from "./energy.js";

import {

    updateParticles

} from "./particles.js";

import {

    connectEvents

} from "./events.js";

import "./state.js";
import "./visualstate.js";

/*
==========================================================
Initialization
==========================================================
*/

console.log(

    `%c${APP.NAME} ${APP.VERSION}`,

    "color:#66bbff;font-size:18px;font-weight:bold;"

);

/*
==========================================================
Build Scene
==========================================================
*/

createScene();

/*
==========================================================
Backend Connection
==========================================================
*/

connectEvents();

/*
==========================================================
Clock
==========================================================
*/

const clock = new THREE.Clock();

/*
==========================================================
Animation Loop
==========================================================
*/

function animate() {

    requestAnimationFrame(

        animate

    );

    const delta =

        clock.getDelta();

    updateOrb(

        delta

    );

    updateEnergy(

        delta

    );

    updateParticles(

        delta

    );

    renderer.render(

        scene,

        camera

    );

}

animate();

/*
==========================================================
Developer Console
==========================================================
*/

window.HUDI.version = APP.VERSION;

console.log(

    "%cHUDI FaceCore Started",

    "color:#00dd88;font-size:16px;font-weight:bold;"

);