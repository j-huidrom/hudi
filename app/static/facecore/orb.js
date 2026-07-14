import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let orb;

export function createOrb(scene) {

    const geometry = new THREE.SphereGeometry(

        1.05,
        128,
        128

    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x5ec8ff,

        transmission: 1.0,

        transparent: true,

        opacity: 0.95,

        roughness: 0.08,

        metalness: 0,

        clearcoat: 1,

        clearcoatRoughness: 0,

        ior: 1.45,

        thickness: 1.2

    });

    orb = new THREE.Mesh(

        geometry,
        material

    );

    scene.add(orb);

}