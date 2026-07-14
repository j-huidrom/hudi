import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

import { createRenderer, renderer } from "./renderer.js";

import { createScene, scene, camera } from "./scene.js";

createRenderer();

createScene();

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    renderer.render(

        scene,
        camera

    );

}

animate();