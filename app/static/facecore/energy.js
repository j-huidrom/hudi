import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let energyCore;

let elapsed = 0;

export function createEnergyCore(scene) {

    const geometry = new THREE.SphereGeometry(
        0.72,
        128,
        128
    );

    const material = new THREE.MeshPhysicalMaterial({

        color: 0x33bbff,

        emissive: 0x1188ff,
        emissiveIntensity: 2.0,

        transparent: true,
        opacity: 0.82,

        transmission: 0.9,

        roughness: 0.15,

        metalness: 0,

        clearcoat: 1,

        clearcoatRoughness: 0

    });

    energyCore = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(energyCore);

}

export function updateEnergy(delta) {

    if (!energyCore) return;

    elapsed += delta;

    //------------------------------------------------
    // Gentle breathing
    //------------------------------------------------

    const scale =
        1.0 +
        Math.sin(elapsed * 1.4) * 0.035;

    energyCore.scale.setScalar(scale);

    //------------------------------------------------
    // Slow floating
    //------------------------------------------------

    energyCore.position.y =
        Math.sin(elapsed * 0.6) * 0.03;

    //------------------------------------------------
    // Slow rotation
    //------------------------------------------------

    energyCore.rotation.y += delta * 0.18;

    //------------------------------------------------
    // Living blue
    //------------------------------------------------

    const hue =
        0.55 +
        Math.sin(elapsed * 0.18) * 0.02;

    energyCore.material.color.setHSL(

        hue,
        0.9,
        0.60

    );

    energyCore.material.emissive.setHSL(

        hue,
        1,
        0.40

    );

}