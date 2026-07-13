/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
state.js

Responsibility

Single source of truth for HUDI runtime state.

No rendering.
No Three.js.
No DOM.

Author:
Project HUDI
==========================================================
*/

import { STATE } from "./config.js";

/*
==========================================================
Current State
==========================================================
*/

let currentState = STATE.BOOT;

/*
==========================================================
Listeners
==========================================================
*/

const listeners = new Set();

/*
==========================================================
Get State
==========================================================
*/

export function getState() {

    return currentState;

}

/*
==========================================================
Check State
==========================================================
*/

export function isState(state) {

    return currentState === state;

}

/*
==========================================================
Set State
==========================================================
*/

export function setState(state) {

    if (!Object.values(STATE).includes(state)) {

        console.warn(

            "[HUDI] Unknown state:",

            state

        );

        return;

    }

    if (state === currentState)
        return;

    const previous = currentState;

    currentState = state;

    console.log(

        `%cHUDI ${previous.toUpperCase()} → ${state.toUpperCase()}`,

        "color:#66bbff;font-weight:bold;"

    );

    listeners.forEach(listener => {

        try {

            listener(state, previous);

        }

        catch(error){

            console.error(error);

        }

    });

}

/*
==========================================================
Subscribe
==========================================================
*/

export function onStateChanged(callback) {

    listeners.add(callback);

}

/*
==========================================================
Unsubscribe
==========================================================
*/

export function removeStateListener(callback) {

    listeners.delete(callback);

}

/*
==========================================================
Developer Console
==========================================================
*/

window.HUDI = {

    state: STATE,

    getState,

    setState,

    isState

};

/*
==========================================================
Boot Sequence
==========================================================
*/

setTimeout(() => {

    setState(

        STATE.READY

    );

}, 500);