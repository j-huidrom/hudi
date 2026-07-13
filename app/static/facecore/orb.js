import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

/* ==========================================================
   HUDI Glass Orb
========================================================== */

export let orb;

export function createOrb(scene) {

    const geometry = new THREE.SphereGeometry(

        1.0,

        128,

        128

    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x5abfff,

        transmission: 0.98,

        transparent: true,

        opacity: 1.0,

        roughness: 0.03,

        metalness: 0.0,

        clearcoat: 1.0,

        clearcoatRoughness: 0.0,

        thickness: 0.8,

        ior: 1.45,

        reflectivity: 1.0

    });

    orb = new THREE.Mesh(

        geometry,

        material

    );

    orb.castShadow = false;

    orb.receiveShadow = false;

    scene.add(orb);

}

/* ==========================================================
   Idle Animation
========================================================== */

export function updateOrb(delta) {

    if (!orb) return;

    orb.rotation.y += delta * 1.5;

    orb.rotation.x += delta * 0.4;

    const s = 1 + Math.sin(Date.now() * 0.003) * 0.08;

    orb.scale.set(s, s, s);

}