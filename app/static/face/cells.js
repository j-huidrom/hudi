import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let cells = [];

const clock = new THREE.Clock();

let cellTexture;

//---------------------------------------------------------
// Create Procedural Texture
//---------------------------------------------------------

function createCellTexture() {

    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;

    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        64,64,8,
        64,64,64
    );

    gradient.addColorStop(0.0,"rgba(255,255,255,1)");
    gradient.addColorStop(0.25,"rgba(180,245,255,0.95)");
    gradient.addColorStop(0.55,"rgba(100,220,255,0.45)");
    gradient.addColorStop(1.0,"rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,128,128);

    cellTexture = new THREE.CanvasTexture(canvas);

}

//---------------------------------------------------------
// Create Cells
//---------------------------------------------------------

export function createCells(scene){

    createCellTexture();

    const COUNT = 320;

    for(let i=0;i<COUNT;i++){

        const material = new THREE.SpriteMaterial({

            map:cellTexture,

            transparent:true,

            depthWrite:false,

            color:0xc8f8ff,

            opacity:0.85

        });

        const sprite = new THREE.Sprite(material);

        // Random position inside sphere

        const radius =
            Math.cbrt(Math.random()) * 0.80;

        const theta =
            Math.random()*Math.PI*2;

        const phi =
            Math.acos(2*Math.random()-1);

        sprite.position.set(

            radius*Math.sin(phi)*Math.cos(theta),

            radius*Math.sin(phi)*Math.sin(theta),

            radius*Math.cos(phi)

        );

        const size =
            0.008 +
            Math.random()*0.020;

        sprite.scale.set(size,size,1);

        sprite.userData={

            radius,

            theta,

            phi,

            speed:0.10+Math.random()*0.20,

            pulse:Math.random()*10,

            drift:Math.random()*100

        };

        cells.push(sprite);

        scene.add(sprite);

    }

}

//---------------------------------------------------------
// Update
//---------------------------------------------------------

export function updateCells(){

    const t = clock.getElapsedTime();

    cells.forEach(cell=>{

        const d = cell.userData;

        // Slow orbital movement

        d.theta += d.speed * 0.0015;

        const r = d.radius;

        cell.position.x =
            r * Math.sin(d.phi) * Math.cos(d.theta);

        cell.position.y =
            r * Math.sin(d.phi) * Math.sin(d.theta);

        cell.position.z =
            r * Math.cos(d.phi);

        // Brownian Motion

        cell.position.x +=
            Math.sin(t*0.8 + d.drift) * 0.006;

        cell.position.y +=
            Math.cos(t*0.6 + d.drift) * 0.006;

        cell.position.z +=
            Math.sin(t*0.4 + d.drift) * 0.004;

        // Organic Pulse

        const pulse =
            0.8 +
            Math.sin(
                t*2.5 + d.pulse
            ) * 0.25;

        const size =
            0.012 + pulse*0.018;

        cell.scale.set(size,size,1);

        cell.material.opacity =
            0.45 +
            Math.sin(
                t*3 + d.pulse
            ) * 0.20;

    });

}