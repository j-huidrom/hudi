import { head, ring, leftEye, rightEye, mouth } from "./hudiface.js";

let clock = 0;

let blinkTimer = 0;
let blinkDuration = 0;

let nextBlink =
    2 + Math.random() * 4;

export function animateFace(delta) {

    clock += delta;

    //----------------------------------------
    // Floating
    //----------------------------------------

    head.position.y =
        Math.sin(clock * 1.5) * 0.08;

    //----------------------------------------
    // Gentle breathing
    //----------------------------------------

    const breathe =
        1 + Math.sin(clock * 1.5) * 0.015;

    head.scale.set(
        breathe,
        breathe,
        breathe
    );

    //----------------------------------------
    // Head sway
    //----------------------------------------

    head.rotation.z =
        Math.sin(clock * 0.35) * 0.03;

    head.rotation.x =
        Math.sin(clock * 0.45) * 0.02;

    //----------------------------------------
    // Ring glow
    //----------------------------------------

    const glow =
        1.3 +
        Math.sin(clock * 2.2) * 0.4;

    ring.material.emissiveIntensity =
        glow;

    //----------------------------------------
    // Eye glow
    //----------------------------------------

    const eyeGlow =
        3.2 +
        Math.sin(clock * 3) * 0.7;

    leftEye.material.emissiveIntensity =
        eyeGlow;

    rightEye.material.emissiveIntensity =
        eyeGlow;

    //----------------------------------------
    // Mouth breathing
    //----------------------------------------

    mouth.scale.x =
        1 +
        Math.sin(clock * 1.5) * 0.05;

    //----------------------------------------
    // Random blinking
    //----------------------------------------

    blinkTimer += delta;

    if(blinkDuration>0){

        blinkDuration-=delta;

        leftEye.scale.y=0.15;
        rightEye.scale.y=0.15;

    }
    else{

        leftEye.scale.y=1;
        rightEye.scale.y=1;

    }

    if(blinkTimer>nextBlink){

        blinkDuration=0.12;

        blinkTimer=0;

        nextBlink=
            2+
            Math.random()*5;

    }

}