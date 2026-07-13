/*
==========================================================
HUDI State Engine
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

let currentState = HUDI_STATE.READY;

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

    if (state === currentState)
        return;

    currentState = state;

    console.log(
        "[HUDI] State ->",
        state
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

export function onStateChanged(callback){

    listeners.push(callback);

}

/*
==========================================================
Developer Console
==========================================================
*/

window.HUDI = {

    setState,

    getState,

    states: HUDI_STATE

};