import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let membrane;

const clock = new THREE.Clock();

export function createMembrane(scene){

    const geometry = new THREE.SphereGeometry(
        1.02,
        256,
        256
    );

    const material = new THREE.MeshPhysicalMaterial({

        color:0x7fe8ff,

        transparent:true,

        opacity:0.08,

        transmission:1.0,

        thickness:0.02,

        roughness:0,

        metalness:0,

        ior:1.02,

        clearcoat:1,

        clearcoatRoughness:0,

        side:THREE.DoubleSide,

        depthWrite:false

    });

    membrane = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(membrane);

}

export function updateMembrane(){

    if(!membrane) return;

    const t = clock.getElapsedTime();

    membrane.scale.setScalar(
        1.0 +
        Math.sin(t*1.3)*0.01
    );

}