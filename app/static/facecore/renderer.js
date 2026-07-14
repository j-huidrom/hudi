import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let renderer;

export function createRenderer() {

    renderer = new THREE.WebGLRenderer({

        antialias: true,
        alpha: true

    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(

        window.innerWidth,
        window.innerHeight

    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    document
        .getElementById("scene-container")
        .appendChild(renderer.domElement);

}