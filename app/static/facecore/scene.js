import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

import { createOrb } from "./orb.js";
import { createEnergyCore } from "./energy.js";

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

    const ambient = new THREE.AmbientLight(
        0xffffff,
        1.8
    );

    scene.add(ambient);

    const light = new THREE.PointLight(
        0x77ddff,
        25
    );

    light.position.set(
        3,
        3,
        5
    );

    scene.add(light);

    createOrb(scene);

    createEnergyCore(scene);

}