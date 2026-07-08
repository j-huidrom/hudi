import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

import { scene } from "./scene.js";

export let earth;
let clouds;
let atmosphere;

const loader = new THREE.TextureLoader();


//--------------------------------------------------
// Public State
//--------------------------------------------------

export const coreState = {

    rotationEnabled:true,

    glowIntensity:0.35,

    pulseSpeed:1.0,

    atmosphereColor:new THREE.Color(0x4da6ff)

};


//--------------------------------------------------

export function setRotation(enabled){

    coreState.rotationEnabled = enabled;

}

export function setGlow(value){

    coreState.glowIntensity = value;

}

export function setPulseSpeed(value){

    coreState.pulseSpeed = value;

}

export function setAtmosphereColor(hex){

    coreState.atmosphereColor.set(hex);

}



//--------------------------------------------------

export function initCore(){

    const dayTexture =
        loader.load("assets/earth_day.jpg");

    const normalTexture =
        loader.load("assets/earth_normal.jpg");

    const cloudTexture =
        loader.load("assets/earth_clouds.jpg");

    dayTexture.colorSpace =
        THREE.SRGBColorSpace;

    //------------------------------------------------
    // Earth
    //------------------------------------------------

    earth = new THREE.Mesh(

        new THREE.SphereGeometry(

            2,

            128,

            128

        ),

        new THREE.MeshStandardMaterial({

            map:dayTexture,

            normalMap:normalTexture,

            normalScale:new THREE.Vector2(.7,.7),

            metalness:0,

            roughness:.95

        })

    );

    scene.add(earth);

    //------------------------------------------------
    // Clouds
    //------------------------------------------------

    clouds = new THREE.Mesh(

        new THREE.SphereGeometry(

            2.02,

            128,

            128

        ),

        new THREE.MeshPhongMaterial({

            map:cloudTexture,

            transparent:true,

            opacity:.28,

            depthWrite:false

        })

    );

    scene.add(clouds);    

}



//--------------------------------------------------

export function updateCore(delta,time){

    //------------------------------------------------
    // Rotation
    //------------------------------------------------

    if(coreState.rotationEnabled){

        earth.rotation.y += delta*0.10;

        clouds.rotation.y += delta*0.13;

    }

    //------------------------------------------------
    // Floating
    //------------------------------------------------

    const floatOffset =

        Math.sin(time*.55)*0.06;

    earth.position.y = floatOffset;

    clouds.position.y = floatOffset;
  

    //------------------------------------------------
    // Breathing Atmosphere
    //------------------------------------------------

    const pulse =

        Math.sin(

            time *

            coreState.pulseSpeed

        )*0.5+0.5;

    const scale =

        1 +

        pulse*0.012;

    
}