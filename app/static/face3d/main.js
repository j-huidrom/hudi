import { initScene, scene, render } from "./scene.js";
import { createFace } from "./hudiface.js";

initScene();

createFace(scene);

function animate(){

    requestAnimationFrame(animate);

    render();

}

animate();