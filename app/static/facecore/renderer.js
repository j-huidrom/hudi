import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

/* ==========================================================
   Renderer
========================================================== */

const container = document.getElementById("scene-container");

export const renderer = new THREE.WebGLRenderer({

    antialias: true,

    alpha: true,

    powerPreference: "high-performance"

});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.shadowMap.enabled = true;

container.appendChild(
    renderer.domElement
);

/* ==========================================================
   Camera
========================================================== */

export const camera =
    new THREE.PerspectiveCamera(

        35,

        window.innerWidth /
        window.innerHeight,

        0.1,

        100

    );

/*
 * Camera starts here.
 * Scene.js can adjust later if required.
 */
camera.position.set(

    0,

    0,

    4

);

/* ==========================================================
   Resize
========================================================== */

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
            2
        )

    );

}

window.addEventListener(

    "resize",

    resizeRenderer

);