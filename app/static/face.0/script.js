const state=document.getElementById("state");
const subtitle=document.getElementById("subtitle");

const leftEye=document.getElementById("leftEye");
const rightEye=document.getElementById("rightEye");
const mouth=document.getElementById("mouth");

const chat = document.getElementById("chat");

let conversation = [];

leftEye.style.animation="blink 6s infinite";
rightEye.style.animation="blink 6s infinite";

function setState(state){
    const face=document.getElementById("face");

    face.className="face "+state;

    console.log(face.className);

}

function render(data){

    state.innerHTML=data.state.toUpperCase();

    setState(data.state);

    if(data.state==="speaking"){

        addTypingMessage("hudi",data.message);

    }

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

function addMessage(role,text){

    conversation.push({

        role,

        text

    });

    renderConversation();

}

function renderConversation(){

    chat.innerHTML="";

    conversation.forEach(msg=>{

        const bubble=document.createElement("div");

        bubble.className="message "+msg.role;

        bubble.innerHTML=msg.text;

        chat.appendChild(bubble);

    });

    chat.scrollTop=chat.scrollHeight;

}

async function addTypingMessage(role,text){

    conversation.push({

        role,

        text:""

    });

    renderConversation();

    let current="";

    const index=conversation.length-1;

    for(const c of text){

        current+=c;

        conversation[index].text=current;

        renderConversation();

        await new Promise(r=>setTimeout(r,18));

    }

}