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

    switch(data.state){

        case "ready":

            leftEye.style.height="24px";
            rightEye.style.height="24px";
            mouth.style.width="70px";
            mouth.style.height="8px";
            break;

        case "listening":

            leftEye.style.width="30px";
            rightEye.style.width="30px";
            mouth.style.width="50px";
            mouth.style.height="6px";
            break;

        case "thinking":

            leftEye.style.transform="translateY(-4px)";
            rightEye.style.transform="translateY(-4px)";
            mouth.style.width="40px";
            break;

        case "speaking":

            mouth.style.height="28px";
            mouth.style.width="40px";
            break;

        default:

            emoji.innerHTML="😊";
            state.innerHTML="🟡 Ready";

    }

    setState(data.state);
    subtitle.innerHTML=data.message;

}

async function refresh(){

    try{

        const r = await fetch("https://api.huidrom.com/api/face/state");

        const data=await r.json();

        render(data);

    }
    catch(e){

        console.log(e);

    }

}

refresh();

setInterval(refresh,1000);