import { head, ring, leftEye, rightEye, mouth } from "./hudiface.js";

export let faceState = "ready";

export const face = {

    mouthOpen:0,

    glow:1.2,

    eyeGlow:3,

    ringScale:1,

    headTilt:0,

    eyeOffset:0

};

export function connectEvents(){

    const source = new EventSource(
        "https://api.huidrom.com/api/face/events"
    );

    source.onmessage = (event)=>{

        const data = JSON.parse(event.data);

        console.log(data);

        setState(data.state);

    };

    source.onerror=()=>{

        console.log("HUDI disconnected");

    };

}

function setState(state){

    faceState=state.toLowerCase();

}

export function updateFace(delta){

    switch(faceState){

        case "ready":

            face.mouthOpen=0;

            face.glow=1.4;

            face.eyeGlow=3.2;

            face.ringScale=1;

            face.headTilt=0;

            face.eyeOffset=0;

            break;

        case "listening":

            face.mouthOpen=0;

            face.glow=2.5;

            face.eyeGlow=5;

            face.ringScale=1.05;

            face.headTilt=0;

            face.eyeOffset=0;

            break;

        case "thinking":

            face.mouthOpen=0;

            face.glow=1.8;

            face.eyeGlow=4;

            face.ringScale=1.02;

            face.headTilt=.12;

            face.eyeOffset=.08;

            break;

        case "speaking":

            face.glow=2;

            face.eyeGlow=4;

            face.ringScale=1.02;

            face.headTilt=0;

            face.eyeOffset=0;

            face.mouthOpen=
                Math.abs(
                    Math.sin(
                        performance.now()*0.02
                    )
                );

            break;

    }

    //----------------------------------
    // Smooth interpolation
    //----------------------------------

    ring.scale.lerp(

        {

            x:face.ringScale,

            y:face.ringScale,

            z:1

        },

        delta*4

    );

    ring.material.emissiveIntensity +=

        (face.glow-ring.material.emissiveIntensity)

        *delta*5;

    leftEye.material.emissiveIntensity +=

        (face.eyeGlow-leftEye.material.emissiveIntensity)

        *delta*5;

    rightEye.material.emissiveIntensity +=

        (face.eyeGlow-rightEye.material.emissiveIntensity)

        *delta*5;

    head.rotation.z +=

        (face.headTilt-head.rotation.z)

        *delta*4;

    leftEye.position.x +=

        ((-0.45-face.eyeOffset)-leftEye.position.x)

        *delta*4;

    rightEye.position.x +=

        ((0.45-face.eyeOffset)-rightEye.position.x)

        *delta*4;

    //----------------------------------
    // ONLY mouth moves
    //----------------------------------

    mouth.scale.y +=

        (

            1+

            face.mouthOpen*2

            -

            mouth.scale.y

        )

        *delta*10;

}