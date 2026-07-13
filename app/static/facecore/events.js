/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
events.js

Responsibility

Connects FaceCore to HUDI backend using
Server Sent Events (SSE).

No rendering.
No Three.js.

Author:
Project HUDI
==========================================================
*/

import { setState } from "./state.js";

/*
==========================================================
Configuration
==========================================================
*/

const EVENTS_URL = "/api/face/events";

/*
==========================================================
Event Source
==========================================================
*/

let eventSource = null;

/*
==========================================================
Connect
==========================================================
*/

export function connectEvents() {

    if (eventSource) {

        eventSource.close();

    }

    console.log(

        "%cHUDI Connecting...",

        "color:#66bbff;font-weight:bold;"

    );

    eventSource = new EventSource(

        EVENTS_URL

    );

    /*
    ------------------------------------------
    Connected
    ------------------------------------------
    */

    eventSource.onopen = () => {

        console.log(

            "%cHUDI Connected",

            "color:#00dd88;font-weight:bold;"

        );

    };

    /*
    ------------------------------------------
    Message
    ------------------------------------------
    */

    eventSource.onmessage = event => {

        try {

            const payload = JSON.parse(

                event.data

            );

            console.log(

                "[HUDI EVENT]",

                payload

            );

            if (payload.state) {

                setState(

                    payload.state

                );

            }

        }

        catch (error) {

            console.error(

                "[HUDI] Invalid SSE message",

                error

            );

        }

    };

    /*
    ------------------------------------------
    Error
    ------------------------------------------
    */

    eventSource.onerror = error => {

        console.warn(

            "[HUDI] SSE disconnected",

            error

        );

    };

}

/*
==========================================================
Disconnect
==========================================================
*/

export function disconnectEvents() {

    if (!eventSource)
        return;

    eventSource.close();

    eventSource = null;

}

/*
==========================================================
Reconnect
==========================================================
*/

export function reconnectEvents() {

    disconnectEvents();

    connectEvents();

}

/*
==========================================================
Developer Console
==========================================================
*/

window.HUDI.connect = connectEvents;

window.HUDI.disconnect = disconnectEvents;

window.HUDI.reconnect = reconnectEvents;