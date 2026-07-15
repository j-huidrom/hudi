import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let jelly;

let time = 0;

export function createJelly(scene) {

    const geometry = new THREE.SphereGeometry(
        1.0,
        128,
        128
    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x63cfff,

        transmission: 1.0,

        transparent: true,

        opacity: 0.18,

        thickness: 0.25,

        roughness: 0.02,

        metalness: 0,

        clearcoat: 1,

        clearcoatRoughness: 0,

        ior: 1.08,

        emissive: 0x1b9cff,

        emissiveIntensity: 0.12

    });

    jelly = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(jelly);

}

export function updateJelly(delta){

    if(!jelly) return;

    time += delta;

    //--------------------------------------------------
    // breathing
    //--------------------------------------------------

    const breathe =
        1.0 +
        Math.sin(time*1.1)*0.015;

    jelly.scale.setScalar(breathe);

    //--------------------------------------------------
    // tiny wobble
    //--------------------------------------------------

    jelly.rotation.y =
        Math.sin(time*0.25)*0.05;

    jelly.rotation.x =
        Math.cos(time*0.18)*0.03;

    //--------------------------------------------------
    // living blue
    //--------------------------------------------------

    const hue =
        0.55 +
        Math.sin(time*0.10)*0.01;

    jelly.material.color.setHSL(
        hue,
        0.95,
        0.68
    );

}