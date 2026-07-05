import * as THREE from "three";

import {
    initScene,
    scene,
    render
} from "./scene.js";

import {
    createFace
} from "./hudiface.js";

import {
    animateFace
} from "./animations.js";

initScene();

createFace(scene);

const clock =
    new THREE.Clock();

function animate(){

    requestAnimationFrame(animate);

    const delta=
        clock.getDelta();

    animateFace(delta);

    render();

}

animate();