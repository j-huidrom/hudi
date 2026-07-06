import * as THREE from "three";

import {

connectEvents,

updateFace

} from "./events.js";

import {
    initScene,
    scene,
    render
} from "./scene.js";

connectEvents();

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
    updateFace(delta);

    render();

}

animate();