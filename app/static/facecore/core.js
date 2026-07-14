import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let core;

export function createCore(scene) {

    const geometry = new THREE.SphereGeometry(

        0.23,
        64,
        64

    );

    const material = new THREE.MeshBasicMaterial({

        color: 0x7fdfff

    });

    core = new THREE.Mesh(

        geometry,
        material

    );

    scene.add(core);

}