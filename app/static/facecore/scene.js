import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let scene;
export let camera;

export function createScene() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(

        35,
        window.innerWidth / window.innerHeight,
        0.1,
        100

    );

    camera.position.z = 4;

    //----------------------------------
    // Ambient Light
    //----------------------------------

    const ambient = new THREE.AmbientLight(

        0xffffff,
        2.5

    );

    scene.add(ambient);

    //----------------------------------
    // Blue Key Light
    //----------------------------------

    const key = new THREE.PointLight(

        0x55bbff,
        80

    );

    key.position.set(

        3,
        3,
        4

    );

    scene.add(key);

}