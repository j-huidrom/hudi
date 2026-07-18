import {scene,camera} from "./scene.js";

import {renderer} from "./renderer.js";

import { updateMembrane } from "./membrane.js";

import {createMembrane} from "./membrane.js";

import { createHalo } from "./halo.js";

import { createFluid, updateFluid} from "./fluid.js";

import {createCells,updateCells} from "./cells.js";

import {createSignalCells,updateSignalCells} from "./signal.js";

import { setState, HUDI } from "./behavior.js";

createMembrane(scene);

createHalo(scene);

createFluid(scene);

createCells(scene);

createSignalCells(scene);

setState("idle");

// --------------------------------------------------
// HUDI SSE Connection
// --------------------------------------------------

const eventSource = new EventSource("/api/face/events");

eventSource.onopen = () => {

    console.log("✅ Connected to HUDI Face SSE");

};

eventSource.onmessage = (event) => {

    const data = JSON.parse(event.data);

    console.log("FACE EVENT", data);

    if (data.state) {

        setState(data.state);

    }

};

eventSource.onerror = (err) => {

    console.error("❌ SSE Connection Lost", err);

};


// --------------------------------------------------
// HUDI Debug API
// --------------------------------------------------

window.HUDI = {

    setState,

    state: HUDI,

    idle() {
        setState("idle");
    },

    listening() {
        setState("listening");
    },

    thinking() {
        setState("thinking");
    },

    speaking() {
        setState("speaking");
    }

};

console.log("HUDI Debug API Ready");
console.log("Try:");
console.log("HUDI.idle()");
console.log("HUDI.listening()");
console.log("HUDI.thinking()");
console.log("HUDI.speaking()");


function animate(){

requestAnimationFrame(animate);

updateMembrane();

updateFluid();

updateCells();

updateSignalCells();

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