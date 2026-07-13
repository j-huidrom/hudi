import { createScene } from "./scene.js";
import { createRenderer, renderer } from "./renderer.js";

import { updateEnergy } from "./energy.js";

createRenderer();

createScene();

const clock = new THREE.Clock();

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    updateEnergy(delta);

    renderer.render(
        window.scene,
        window.camera
    );

}

animate();