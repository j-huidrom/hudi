/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
visualstate.js

Responsibility

Maps logical HUDI states into visual parameters.

Author:
Project HUDI
==========================================================
*/

import { STATE } from "./config.js";

import {

    getState,
    onStateChanged

} from "./state.js";

/*
==========================================================
Visual State
==========================================================
*/

const visual = {

    /*
    ------------------------------------------------------
    Orb
    ------------------------------------------------------
    */

    rotationMultiplier: 1.0,

    breathingAmplitude: 0.015,

    breathingSpeed: 0.60,

    glassOpacity: 0.92,

    glassBrightness: 1.00,

    /*
    ------------------------------------------------------
    Energy
    ------------------------------------------------------
    */

    energyBrightness: 1.00,

    energyPulseSpeed: 1.00,

    energyHue: 0.56,

    /*
    ------------------------------------------------------
    Particles
    ------------------------------------------------------
    */

    particleSpeed: 0.25,

    particleOpacity: 0.45,

    particleScale: 1.00,

    /*
    ------------------------------------------------------
    General
    ------------------------------------------------------
    */

    glow: 1.00,

    transitionSpeed: 2.50

};

/*
==========================================================
READY
==========================================================
*/

function ready() {

    visual.rotationMultiplier = 1.00;

    visual.breathingAmplitude = 0.015;

    visual.breathingSpeed = 0.60;

    visual.glassOpacity = 0.92;

    visual.glassBrightness = 1.00;

    visual.energyBrightness = 1.00;

    visual.energyPulseSpeed = 1.00;

    visual.energyHue = 0.56;

    visual.particleSpeed = 0.25;

    visual.particleOpacity = 0.45;

    visual.particleScale = 1.00;

    visual.glow = 1.00;

}

/*
==========================================================
LISTENING

Focused.
Still.
Attentive.
==========================================================
*/

function listening() {

    visual.rotationMultiplier = 0.20;

    visual.breathingAmplitude = 0.005;

    visual.breathingSpeed = 0.25;

    visual.glassOpacity = 0.98;

    visual.glassBrightness = 1.30;

    visual.energyBrightness = 1.35;

    visual.energyPulseSpeed = 0.60;

    visual.energyHue = 0.53;

    visual.particleSpeed = 0.12;

    visual.particleOpacity = 0.65;

    visual.particleScale = 0.95;

    visual.glow = 1.30;

}

/*
==========================================================
THINKING

Placeholder
==========================================================
*/

function thinking() {

    visual.rotationMultiplier = 0.08;

    visual.breathingAmplitude = 0.003;

    visual.breathingSpeed = 0.18;

    visual.glassOpacity = 0.88;

    visual.glassBrightness = 0.82;

    visual.energyBrightness = 1.65;

    visual.energyPulseSpeed = 0.45;

    visual.energyHue = 0.61;

    visual.particleSpeed = 0.60;

    visual.particleOpacity = 0.35;

    visual.particleScale = 1.15;

    visual.glow = 0.90;

}

/*
==========================================================
SPEAKING

Placeholder
==========================================================
*/

function speaking() {

    visual.rotationMultiplier = 1.80;

    visual.breathingAmplitude = 0.035;

    visual.breathingSpeed = 2.20;

    visual.glassOpacity = 0.96;

    visual.glassBrightness = 1.45;

    visual.energyBrightness = 2.10;

    visual.energyPulseSpeed = 2.50;

    visual.energyHue = 0.54;

    visual.particleSpeed = 2.20;

    visual.particleOpacity = 0.85;

    visual.particleScale = 1.30;

    visual.glow = 1.80;

}

/*
==========================================================
GOODBYE

Placeholder
==========================================================
*/

function goodbye() {

    visual.rotationMultiplier = 0.03;

    visual.breathingAmplitude = 0.001;

    visual.breathingSpeed = 0.10;

    visual.glassOpacity = 0.20;

    visual.glassBrightness = 0.25;

    visual.energyBrightness = 0.15;

    visual.energyPulseSpeed = 0.08;

    visual.energyHue = 0.56;

    visual.particleSpeed = 0.02;

    visual.particleOpacity = 0.08;

    visual.particleScale = 0.80;

    visual.glow = 0.10;

}

/*
==========================================================
Apply
==========================================================
*/

function applyState(state) {

    switch (state) {

        case STATE.READY:

            ready();

            break;

        case STATE.LISTENING:

            listening();

            break;

        case STATE.THINKING:

            thinking();

            break;

        case STATE.SPEAKING:

            speaking();

            break;

        case STATE.GOODBYE:

            goodbye();

            break;

        default:

            ready();

    }

}

/*
==========================================================
Initialize
==========================================================
*/

applyState(

    getState()

);

onStateChanged(

    state => applyState(state)

);

/*
==========================================================
Access
==========================================================
*/

export function getVisualState() {

    return visual;

}

window.HUDI.visual = visual;