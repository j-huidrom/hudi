const state=document.getElementById("state");
const subtitle=document.getElementById("subtitle");

const leftEye=document.getElementById("leftEye");
const rightEye=document.getElementById("rightEye");
const mouth=document.getElementById("mouth");

leftEye.style.animation="blink 6s infinite";
rightEye.style.animation="blink 6s infinite";

function setState(state){
    const face=document.getElementById("face");

    face.className="face "+state;

    console.log(face.className);

}

function render(data){

    document.getElementById("state").innerHTML =
        data.state.toUpperCase();

    document.getElementById("subtitle").innerHTML =
        data.message;

    console.log("STATE =", data.state);

    setState(data.state);
}

const source = new EventSource(
    "https://api.huidrom.com/api/face/events"
);

source.onmessage = (event) => {

        console.log("===== HUDI EVENT =====");

        console.log(event.data);

        const data = JSON.parse(event.data);

        console.log(data);

        render(data);

    }

source.onerror = () => {

    console.log("HUDI Face disconnected...");

};