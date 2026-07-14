import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let particles;

const COUNT = 180;

let positions;
let velocities;

export function createParticles(scene){

    const geometry = new THREE.BufferGeometry();

    positions = new Float32Array(COUNT * 3);

    velocities = [];

    for(let i=0;i<COUNT;i++){

        const radius = 1.35 + Math.random()*0.8;

        const theta = Math.random()*Math.PI*2;

        const phi = Math.acos(2*Math.random()-1);

        positions[i*3+0] =
            radius*Math.sin(phi)*Math.cos(theta);

        positions[i*3+1] =
            radius*Math.cos(phi);

        positions[i*3+2] =
            radius*Math.sin(phi)*Math.sin(theta);

        velocities.push(

            0.0005 +

            Math.random()*0.001

        );

    }

    geometry.setAttribute(

        "position",

        new THREE.BufferAttribute(

            positions,

            3

        )

    );

    const material = new THREE.PointsMaterial({

        color:0x6fdcff,

        size:0.03,

        transparent:true,

        opacity:0.65,

        depthWrite:false

    });

    particles =

        new THREE.Points(

            geometry,

            material

        );

    scene.add(particles);

}