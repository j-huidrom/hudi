import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let signalCells = [];

const clock = new THREE.Clock();

export function createSignalCells(scene){

    const texture = createTexture();

    for(let i=0;i<3;i++){

        const material = new THREE.SpriteMaterial({

            map:texture,

            color:0xffffff,

            transparent:true,

            opacity:1,

            depthWrite:false

        });

        const sprite = new THREE.Sprite(material);

        sprite.scale.set(0.055,0.055,1);

        sprite.userData={

            angle:Math.random()*Math.PI*2,

            radius:0.55+Math.random()*0.12,

            speed:0.25+Math.random()*0.08,

            height:(Math.random()-0.5)*0.4

        };

        scene.add(sprite);

        signalCells.push(sprite);

    }

}

function createTexture(){

    const canvas=document.createElement("canvas");

    canvas.width=128;
    canvas.height=128;

    const ctx=canvas.getContext("2d");

    const g=ctx.createRadialGradient(
        64,64,6,
        64,64,64
    );

    g.addColorStop(0,"rgba(255,255,255,1)");
    g.addColorStop(0.25,"rgba(180,255,255,1)");
    g.addColorStop(0.55,"rgba(80,220,255,.6)");
    g.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle=g;
    ctx.fillRect(0,0,128,128);

    return new THREE.CanvasTexture(canvas);

}

export function updateSignalCells(){

    const t=clock.getElapsedTime();

    signalCells.forEach(c=>{

        const d=c.userData;

        d.angle+=d.speed*0.01;

        c.position.x=Math.cos(d.angle)*d.radius;

        c.position.z=Math.sin(d.angle)*d.radius;

        c.position.y=d.height+
            Math.sin(t+d.angle)*0.08;

        const pulse=

            1+

            Math.sin(t*6+d.angle)*0.25;

        c.scale.setScalar(0.05*pulse);

    });

}