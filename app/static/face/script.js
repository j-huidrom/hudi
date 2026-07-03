const emoji=document.getElementById("emoji");
const state=document.getElementById("state");
const subtitle=document.getElementById("subtitle");
const leftEye=document.getElementById("leftEye");
leftEye.style.animation="blink 6s infinite";
rightEye.style.animation="blink 6s infinite";

const rightEye=document.getElementById("rightEye");
const mouth=document.getElementById("mouth");

function setState(state){

    const face=document.getElementById("face");

    face.classList.remove(
        "ready",
        "listening",
        "thinking",
        "speaking"
    );

    face.classList.add(state);

}

function render(data){

    document.getElementById("state").innerHTML =
        data.state.toUpperCase();

    document.getElementById("subtitle").innerHTML =
        data.message;

    setState(data.state);
    subtitle.innerHTML=data.message;

}

const source = new EventSource(
    "https://api.huidrom.com/api/face/events"
);

source.onmessage = (event) => {

    const data = JSON.parse(event.data);

    render(data);

    setState(data.state);

};

source.onerror = () => {

    console.log("HUDI Face disconnected...");

};