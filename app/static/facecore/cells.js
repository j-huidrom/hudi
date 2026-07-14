import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export const cells = [];

export function createCells(scene) {

    const geometry = new THREE.SphereGeometry(0.018, 16, 16);

    const material = new THREE.MeshBasicMaterial({
        color: 0x9fe8ff
    });

    for (let i = 0; i < 350; i++) {

        const cell = new THREE.Mesh(
            geometry,
            material.clone()
        );

        // random point inside sphere
        const r = Math.cbrt(Math.random()) * 0.92;

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        cell.position.set(

            r * Math.sin(phi) * Math.cos(theta),

            r * Math.sin(phi) * Math.sin(theta),

            r * Math.cos(phi)

        );

        const s = 0.5 + Math.random();

        cell.scale.set(s, s, s);

        scene.add(cell);

        cells.push(cell);

    }

}