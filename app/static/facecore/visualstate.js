import { getState, HUDI_STATE } from "./state.js";

const visual = {

    cloudOpacity: 0.45,
    cloudTint: 1.0,

    fillIntensity: 30,

    rotationSpeed: 0.10,

    glow: 1.0

};

function lerp(a, b, t) {

    return a + (b - a) * t;

}

export function updateVisualState(delta) {

    const state = getState();

    let target = {

        cloudOpacity: 0.45,
        cloudTint: 1.0,
        fillIntensity: 30,
        rotationSpeed: 0.10,
        glow: 1.0

    };

    switch(state){

        case HUDI_STATE.LISTENING:

            target.cloudOpacity = 0.70;
            target.cloudTint = 1.15;
            target.fillIntensity = 40;
            target.rotationSpeed = 0.05;
            target.glow = 1.20;

            break;

        case HUDI_STATE.THINKING:

            target.cloudOpacity = 0.32;
            target.cloudTint = 0.95;
            target.fillIntensity = 20;
            target.rotationSpeed = 0.02;
            target.glow = 0.90;

            break;

        case HUDI_STATE.SPEAKING:

            target.cloudOpacity = 0.75;
            target.cloudTint = 1.30;
            target.fillIntensity = 45;
            target.rotationSpeed = 0.14;
            target.glow = 1.35;

            break;

        case HUDI_STATE.GOODBYE:

            target.cloudOpacity = 0.20;
            target.fillIntensity = 10;
            target.rotationSpeed = 0.04;
            target.glow = 0.70;

            break;

    }

    const speed = delta * 5;

    visual.cloudOpacity =
        lerp(visual.cloudOpacity, target.cloudOpacity, speed);

    visual.cloudTint =
        lerp(visual.cloudTint, target.cloudTint, speed);

    visual.fillIntensity =
        lerp(visual.fillIntensity, target.fillIntensity, speed);

    visual.rotationSpeed =
        lerp(visual.rotationSpeed, target.rotationSpeed, speed);

    visual.glow =
        lerp(visual.glow, target.glow, speed);

}

export function getVisualState(){

    return visual;

}