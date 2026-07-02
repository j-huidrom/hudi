const emoji=document.getElementById("emoji");
const state=document.getElementById("state");
const subtitle=document.getElementById("subtitle");

function render(data){

    switch(data.state){

        case "ready":

            emoji.innerHTML="😊";
            state.innerHTML="🟡 Ready";
            break;

        case "listening":

            emoji.innerHTML="👂";
            state.innerHTML="👂 Listening";
            break;

        case "thinking":

            emoji.innerHTML="🤔";
            state.innerHTML="🤔 Thinking";
            break;

        case "speaking":

            emoji.innerHTML="🗣️";
            state.innerHTML="🗣️ Speaking";
            break;

        default:

            emoji.innerHTML="😊";
            state.innerHTML="🟡 Ready";

    }

    subtitle.innerHTML=data.message;

}

async function refresh(){

    try{

        const r=await fetch("/face/state");

        const data=await r.json();

        render(data);

    }
    catch(e){

        console.log(e);

    }

}

refresh();

setInterval(refresh,1000);