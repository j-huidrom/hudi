const status=document.getElementById("status");

const avatar=document.getElementById("avatar");

const states=[

{
status:"🟡 Ready",
avatar:"😊"
},

{
status:"👂 Listening",
avatar:"🙂"
},

{
status:"🤔 Thinking",
avatar:"🤔"
},

{
status:"🗣️ Speaking",
avatar:"😄"
}

];

let i=0;

setInterval(()=>{

    i++;

    if(i>=states.length)
        i=0;

    status.innerHTML=states[i].status;

    avatar.innerHTML=states[i].avatar;

},4000);