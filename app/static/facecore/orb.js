import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let orb;

export function createOrb(scene) {

    const geometry = new THREE.SphereGeometry(
        1,
        128,
        128
    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x5dbdff,

        transmission: 0.98,

        transparent: true,

        opacity: 1,

        roughness: 0.05,

        metalness: 0,

        clearcoat: 1,

        clearcoatRoughness: 0,

        ior: 1.4,

        thickness: 0.8

    });

    orb = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(orb);

}