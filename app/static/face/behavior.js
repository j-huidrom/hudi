export const HUDI = {

    state: "idle",

    membrane: {

        breathe: 1.0,

        glow: 1.0,

        color:"#4FC3FF"
        

    },

    cells: {

        speed: 1.0,

        pulse: 1.0,

        brightness: 1.0,

        color: "#2196F3"

    },

    signal: {

        speed: 1.0,

        brightness: 1.0

    }

};

export function setState(state){

    HUDI.state = state;

    switch(state){

        case "idle":

            HUDI.membrane.breathe = 1.0;
            HUDI.membrane.glow = 0.9;

            HUDI.signal.speed = 0.4;

            HUDI.membrane.color = "#4FC3FF";

            HUDI.cells.speed = 0.6;
            HUDI.cells.pulse = 0.8;
            HUDI.cells.color = "#2196F3";   // Blue

            break;

        case "listening":

            HUDI.signal.speed = 0.8;

            HUDI.membrane.breathe = 1.15;
            HUDI.membrane.glow = 1.1;
            HUDI.membrane.color = "#42F5F5";

            HUDI.cells.speed = 0.9;
            HUDI.cells.pulse = 1.0;
            HUDI.cells.color = "#00E676";   // Green

            break;

        case "thinking":

            HUDI.signal.speed = 3.0;

            HUDI.membrane.breathe = 0.85;
            HUDI.membrane.glow = 1.4;
            HUDI.membrane.color = "#9B5CFF";

            HUDI.cells.speed = 1.6;
            HUDI.cells.pulse = 1.4;
            HUDI.cells.color = "#FFD600";   // Yellow

            break;

        case "speaking":

        
            HUDI.signal.speed = 1.6;

            HUDI.membrane.breathe = 1.5;
            HUDI.membrane.glow = 1.2;
            HUDI.membrane.color = "#FFAA42";

            HUDI.cells.speed = 1.2;
            HUDI.cells.pulse = 1.8;
            HUDI.cells.color = "#FF3D00";   // Red

            break;

    }

}