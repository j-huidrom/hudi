import "./events.js";
import { initScene, render, clock } from "./scene.js";
import { initCore, updateCore } from "./core.js";
import { getState } from "./state.js";

initScene();
initCore();

animate();

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    updateCore(delta, elapsed);

    render();

}