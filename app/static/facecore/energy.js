import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

/* ==========================================================
   HUDI Energy Core
========================================================== */

export let energyCore;

let elapsed = 0;

/* ==========================================================
   Create
========================================================== */

export function createEnergyCore(scene) {

    const geometry = new THREE.SphereGeometry(

        0.72,

        128,

        128

    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x33bbff,

        emissive: 0x1188ff,

        emissiveIntensity: 2.4,

        transparent: true,

        opacity: 0.82,

        transmission: 0.92,

        roughness: 0.12,

        metalness: 0.0,

        clearcoat: 1.0,

        clearcoatRoughness: 0.0

    });

    energyCore = new THREE.Mesh(

        geometry,

        material

    );

    scene.add(energyCore);

}

/* ==========================================================
   Animation
========================================================== */

export function updateEnergy(delta) {

    if (!energyCore) return;

    elapsed += delta;

    //------------------------------------------
    // Breathing
    //------------------------------------------

    const breathe =

        1 +

        Math.sin(elapsed * 1.4) * 0.04;

    energyCore.scale.set(

        breathe,

        breathe,

        breathe

    );

    //------------------------------------------
    // Floating
    //------------------------------------------

    energyCore.position.y =

        Math.sin(elapsed * 0.7) * 0.03;

    //------------------------------------------
    // Rotation
    //------------------------------------------

    energyCore.rotation.y +=

        delta * 0.18;

    //------------------------------------------
    // Living blue color
    //------------------------------------------

    const hue =

        0.55 +

        Math.sin(elapsed * 0.22) * 0.02;

    energyCore.material.color.setHSL(

        hue,

        0.95,

        0.60

    );

    energyCore.material.emissive.setHSL(

        hue,

        1.0,

        0.45

    );

    //------------------------------------------
    // Glow pulse
    //------------------------------------------

    energyCore.material.emissiveIntensity =

        2.2 +

        Math.sin(elapsed * 2.5) * 0.35;

}