import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let fluid;

const clock = new THREE.Clock();

export function createFluid(scene){

    const geometry = new THREE.SphereGeometry(
        0.96,
        128,
        128
    );

    const material = new THREE.MeshPhysicalMaterial({

        color:0x10324a,

        transparent:true,

        opacity:0.45,

        transmission:0.65,

        roughness:0.05,

        metalness:0.0,

        thickness:1.8,

        ior:1.08,

        clearcoat:1,

        clearcoatRoughness:0.02,

        depthWrite:false

    });

    fluid = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(fluid);

}

export function updateFluid(){

    if(!fluid) return;

    const t = clock.getElapsedTime();

    // very gentle breathing

    fluid.scale.setScalar(

        0.995 +

        Math.sin(t*1.1)*0.004

    );

    // slight internal rotation

    fluid.rotation.y += 0.0008;

    fluid.rotation.x += 0.0003;

}