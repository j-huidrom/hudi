import {

    setRotation,
    setGlow,
    setPulseSpeed,
    setAtmosphereColor

} from "./core.js";

export let hudiState = "ready";

let previousState = "";


//--------------------------------------------

export function setState(state){

    hudiState = state.toLowerCase();

}


//--------------------------------------------

export function connectKeyboard(){

    window.addEventListener(

        "keydown",

        (e)=>{

            switch(e.key){

                case "1":
                    setState("ready");
                    break;

                case "2":
                    setState("listening");
                    break;

                case "3":
                    setState("thinking");
                    break;

                case "4":
                    setState("speaking");
                    break;

                case "5":
                    setState("goodbye");
                    break;

            }

        }

    );

}


//--------------------------------------------

export function connectEvents(){

    const source = new EventSource(

        "https://api.huidrom.com/api/face/events"

    );

    source.onmessage = (event)=>{

        const data = JSON.parse(event.data);

        console.log("HUDI",data.state);

        setState(data.state);

    };

    source.onerror=()=>{

        console.log("HUDI disconnected");

    };

}


//--------------------------------------------

export function updateState(){

    if(previousState===hudiState){

        return;

    }

    previousState=hudiState;

    console.log("State:",hudiState);

    switch(hudiState){

        //------------------------------------

        case "ready":

            setRotation(true);

            setGlow(.22);

            setPulseSpeed(.60);

            setAtmosphereColor(0x4da6ff);

            break;

        //------------------------------------

        case "listening":

            setRotation(false);

            setGlow(.34);

            setPulseSpeed(1.4);

            setAtmosphereColor(0x74c8ff);

            break;

        //------------------------------------

        case "thinking":

            setRotation(false);

            setGlow(.42);

            setPulseSpeed(.45);

            setAtmosphereColor(0x6f8cff);

            break;

        //------------------------------------

        case "speaking":

            setRotation(false);

            setGlow(.55);

            setPulseSpeed(3.2);

            setAtmosphereColor(0x39b8ff);

            break;

        //------------------------------------

        case "goodbye":

            setRotation(false);

            setGlow(.08);

            setPulseSpeed(.25);

            setAtmosphereColor(0x2d5cff);

            break;

    }

}