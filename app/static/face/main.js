import {scene,camera} from "./scene.js";

import {renderer} from "./renderer.js";

import { updateMembrane } from "./membrane.js";

import {createMembrane} from "./membrane.js";

import { createHalo } from "./halo.js";

import { createFluid, updateFluid} from "./fluid.js";

import {createCells,updateCells} from "./cells.js";

createMembrane(scene);

createHalo(scene);

createFluid(scene);

createCells(scene);

function animate(){

requestAnimationFrame(animate);

updateMembrane();

updateFluid();

updateCells();

renderer.render(scene,camera);

}

animate();

window.addEventListener(

"resize",

()=>{

camera.aspect=

window.innerWidth/

window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

}

);