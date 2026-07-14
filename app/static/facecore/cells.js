import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export const cells = [];

export function createCells(scene) {

    const geometry = new THREE.SphereGeometry(0.018, 16, 16);

    for (let i = 0; i < 260; i++) {

        const material = new THREE.MeshBasicMaterial({
            color: 0x8edcff,
            transparent: true,
            opacity: 0.9
        });

        const cell = new THREE.Mesh(geometry, material);

        const radius = Math.cbrt(Math.random()) * 0.9;

        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        cell.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );

        // Initial size
        const scale = 0.4 + Math.random() * 1.6;
        cell.scale.setScalar(scale);

        // Save for animation
        cell.userData = {

            home: cell.position.clone(),

            scale: scale,

            angle: Math.random() * Math.PI * 2,

            speed: 0.2 + Math.random() * 0.5,

            radius: 0.003 + Math.random() * 0.012,

            pulse: Math.random() * Math.PI * 2

        };

        scene.add(cell);

        cells.push(cell);
    }
}