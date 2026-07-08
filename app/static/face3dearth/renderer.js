import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

export const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);

/*
|--------------------------------------------------------------------------
| Camera
|--------------------------------------------------------------------------
*/

export const camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

/*
|--------------------------------------------------------------------------
| Intelligent Earth Fitting
|--------------------------------------------------------------------------
*/

const EARTH_RADIUS = 2.0;

/**
 * Automatically positions the camera so the
 * complete Earth is visible on every screen.
 */
export function fitEarthToViewport() {

    const aspect = window.innerWidth / window.innerHeight;

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    const fov = THREE.MathUtils.degToRad(camera.fov);

    /*
     * 0.92 means Earth occupies roughly 92%
     * of the smallest screen dimension.
     *
     * Lower value = smaller Earth
     * Higher value = larger Earth
     */
    const fill = 0.92;

    const distance =
        (EARTH_RADIUS / fill) /
        Math.tan(fov / 2);

    camera.position.set(0, 0, distance);

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}

window.addEventListener("resize", fitEarthToViewport);

fitEarthToViewport();