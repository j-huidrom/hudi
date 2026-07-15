import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";
import { scene, camera } from "./scene.js";
import { cells } from "./cells.js";
import { updateJelly } from "./jelly.js";

let renderer;

export function startRenderer() {

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onResize);

    animate();

}

function animate(time = 0) {

    requestAnimationFrame(animate);

    const t = time * 0.001;

    cells.forEach(cell => {

        const d = cell.userData;

        cell.position.x =
            d.home.x +
            Math.cos(t * d.speed + d.angle) * d.radius;

        cell.position.y =
            d.home.y +
            Math.sin(t * d.speed + d.angle) * d.radius;

        cell.position.z =
            d.home.z +
            Math.sin(t * d.speed * 0.8) * d.radius;

        const pulse =
            0.92 +
            Math.sin(t * 2 + d.pulse) * 0.08;

        cell.scale.setScalar(
            pulse * d.scale
        );

    });

    const delta = 1/60;

    updateJelly(delta);

    renderer.render(scene, camera);

}

function onResize() {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}