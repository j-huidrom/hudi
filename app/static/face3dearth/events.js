import { setState } from "./state.js";

console.log("[HUDI] Connecting to SSE...");

const source = new EventSource("/api/face/events");

source.onopen = () => {

    console.log("[HUDI] SSE Connected");

};

source.onmessage = (event) => {

    try {

        const data = JSON.parse(event.data);

        console.log("[HUDI] Event:", data);

        if (data.state) {

            setState(data.state);

        }

    } catch (err) {

        console.error("[HUDI] Invalid SSE message", err);

    }

};

source.onerror = (err) => {

    console.error("[HUDI] SSE Error", err);

};