/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
renderer.js

Responsibility:

• Create WebGL renderer
• Create camera
• Handle resize

Nothing else.

Author:
Project HUDI
==========================================================
*/

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import {

    RENDERER,

    CAMERA

} from "./config.js";

/*
==========================================================
Container
==========================================================
*/

const container =
    document.getElementById(
        "scene-container"
    );

/*
==========================================================
Renderer
==========================================================
*/

export const renderer =
    new THREE.WebGLRenderer({

        antialias:
            RENDERER.ANTIALIAS,

        alpha:
            RENDERER.ALPHA,

        powerPreference:
            RENDERER.POWER_PREFERENCE

    });

renderer.setPixelRatio(

    Math.min(

        window.devicePixelRatio,

        RENDERER.MAX_PIXEL_RATIO

    )

);

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.shadowMap.enabled = false;

container.appendChild(
    renderer.domElement
);

/*
==========================================================
Camera
==========================================================
*/

export const camera =
    new THREE.PerspectiveCamera(

        CAMERA.FOV,

        window.innerWidth /
        window.innerHeight,

        CAMERA.NEAR,

        CAMERA.FAR

    );

camera.position.set(

    CAMERA.POSITION.x,

    CAMERA.POSITION.y,

    CAMERA.POSITION.z

);

/*
==========================================================
Resize
==========================================================
*/

export function resizeRenderer() {

    camera.aspect =

        window.innerWidth /

        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    renderer.setPixelRatio(

        Math.min(

            window.devicePixelRatio,

            RENDERER.MAX_PIXEL_RATIO

        )

    );

}

/*
==========================================================
Events
==========================================================
*/

window.addEventListener(

    "resize",

    resizeRenderer

);

/*
==========================================================
Developer Console
==========================================================
*/

console.log(

    "%cRenderer Ready",

    "color:#66bbff;font-weight:bold;"

);