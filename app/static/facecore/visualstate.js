/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
visualstate.js

Responsibility

Maps logical HUDI states to visual parameters.

No Three.js rendering.

Author:
Project HUDI
==========================================================
*/

import {

    STATE,
    STATE_PROFILE

} from "./config.js";

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

    glow: 1.0,

    particleMultiplier: 1.0,

    rotationMultiplier: 1.0,

    cloudOpacity: 0.50,

    energyBrightness: 1.0,

    transitionSpeed: 3.0

};

/*
==========================================================
Apply State
==========================================================
*/

function applyState(state) {

    switch (state) {

        case STATE.READY:

            visual.glow =
                STATE_PROFILE.READY.glow;

            visual.particleMultiplier =
                STATE_PROFILE.READY.particles;

            visual.rotationMultiplier =
                STATE_PROFILE.READY.rotation;

            visual.cloudOpacity = 0.45;

            visual.energyBrightness = 1.0;

            break;

        case STATE.LISTENING:

            visual.glow =
                STATE_PROFILE.LISTENING.glow;

            visual.particleMultiplier =
                STATE_PROFILE.LISTENING.particles;

            visual.rotationMultiplier =
                STATE_PROFILE.LISTENING.rotation;

            visual.cloudOpacity = 0.75;

            visual.energyBrightness = 1.25;

            break;

        case STATE.THINKING:

            visual.glow =
                STATE_PROFILE.THINKING.glow;

            visual.particleMultiplier =
                STATE_PROFILE.THINKING.particles;

            visual.rotationMultiplier =
                STATE_PROFILE.THINKING.rotation;

            visual.cloudOpacity = 0.25;

            visual.energyBrightness = 0.80;

            break;

        case STATE.SPEAKING:

            visual.glow =
                STATE_PROFILE.SPEAKING.glow;

            visual.particleMultiplier =
                STATE_PROFILE.SPEAKING.particles;

            visual.rotationMultiplier =
                STATE_PROFILE.SPEAKING.rotation;

            visual.cloudOpacity = 0.85;

            visual.energyBrightness = 1.50;

            break;

        case STATE.GOODBYE:

            visual.glow =
                STATE_PROFILE.GOODBYE.glow;

            visual.particleMultiplier =
                STATE_PROFILE.GOODBYE.particles;

            visual.rotationMultiplier =
                STATE_PROFILE.GOODBYE.rotation;

            visual.cloudOpacity = 0.10;

            visual.energyBrightness = 0.25;

            break;

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

/*
==========================================================
Debug
==========================================================
*/

window.HUDI.visual = visual;