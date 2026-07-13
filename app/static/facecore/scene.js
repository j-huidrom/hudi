/*
==========================================================
HUDI FaceCore
State Engine
==========================================================
*/

export const HUDI_STATE = {

    BOOT: "boot",

    READY: "ready",

    LISTENING: "listening",

    THINKING: "thinking",

    SPEAKING: "speaking",

    GOODBYE: "goodbye"

};

let currentState = HUDI_STATE.BOOT;

const listeners = [];

/*
==========================================================
Current State
==========================================================
*/

export function getState() {

    return currentState;

}

/*
==========================================================
Change State
==========================================================
*/

export function setState(state) {

    if (!Object.values(HUDI_STATE).includes(state)) {

        console.warn(

            "[HUDI] Unknown state:",

            state

        );

        return;

    }

    if (state === currentState)
        return;

    currentState = state;

    console.log(

        "%cHUDI → " + state.toUpperCase(),

        "color:#55bbff;font-weight:bold;"

    );

    listeners.forEach(

        listener => listener(state)

    );

}

/*
==========================================================
Subscribe
==========================================================
*/

export function onStateChanged(callback) {

    listeners.push(callback);

}

/*
==========================================================
Developer Console
==========================================================
*/

window.HUDI = {

    state: HUDI_STATE,

    getState,

    setState

};

/*
==========================================================
Boot
==========================================================
*/

setTimeout(() => {

    setState(HUDI_STATE.READY);

}, 500);