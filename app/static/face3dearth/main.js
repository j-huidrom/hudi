import {

    initScene,

    render,

    clock

}
from "./scene.js";

initScene();

function animate(){

    requestAnimationFrame(animate);

    const delta =
        clock.getDelta();

    render(delta);

}

animate();