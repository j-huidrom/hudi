import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let jelly;

export function createJelly(scene) {

    const geometry = new THREE.SphereGeometry(
        1.0,
        128,
        128
    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x6FD6FF,

        transmission: 1.0,

        transparent: true,

        opacity: 0.30,

        roughness: 0.02,

        metalness: 0,

        clearcoat: 1,

        clearcoatRoughness: 0,

        thickness: 0.45,

        ior: 1.15,

        emissive: 0x49bfff,

        emissiveIntensity: 0.18

    });

    jelly = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(jelly);

}