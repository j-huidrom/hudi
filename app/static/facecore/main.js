import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

import { createScene } from "./scene.js";
import { startRenderer } from "./renderer.js";

createScene();
startRenderer();

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    renderer.render(

        scene,
        camera

    );

}

animate();