import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let cells;

const COUNT = 180;

let positions;
let velocities;

export function createCells(scene){

    const geometry = new THREE.BufferGeometry();

    positions = new Float32Array(COUNT * 3);

    velocities = [];

    for(let i=0;i<COUNT;i++){

        const radius = Math.random() * 0.82;

        const theta = Math.random() * Math.PI * 2;

        const phi = Math.acos(2 * Math.random() - 1);

        const r = Math.cbrt(Math.random()) * radius;

        positions[i*3] =
            r * Math.sin(phi) * Math.cos(theta);

        positions[i*3+1] =
            r * Math.cos(phi);

        positions[i*3+2] =
            r * Math.sin(phi) * Math.sin(theta);

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

    cells =

        new THREE.Points(

            geometry,

            material

        );

    scene.add(cells);

}