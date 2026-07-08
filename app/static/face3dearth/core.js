import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

import { scene } from "./scene.js";

import { updateVisualState, getVisualState } from "./visualstate.js";

export let earth;
let clouds;
let atmosphere;
let fillLight;

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

    //------------------------------------------------
    // Blue Fill Light
    //------------------------------------------------

    fillLight = new THREE.PointLight(
        0x66ccff,
        30,
        25
    );

    fillLight.position.set(0,0,6);

    scene.add(fillLight);

}



//--------------------------------------------------

export function updateCore(delta,time){

        //------------------------------------------------
        // Visual State
        //------------------------------------------------

        updateVisualState(delta);

        const visual = getVisualState();

        if(coreState.rotationEnabled){

            earth.rotation.y +=
                delta * visual.rotationSpeed;

            clouds.rotation.y +=
                delta * (visual.rotationSpeed * 1.25);

        }



    //------------------------------------------------
    // Floating
    //------------------------------------------------

    const floatOffset =

        Math.sin(time*.55)*0.06;

    earth.position.y = floatOffset;

    clouds.position.y = floatOffset;

    //------------------------------------------------
    // Cloud Animation
    //------------------------------------------------

    clouds.material.opacity =
        visual.cloudOpacity;

    clouds.material.color.setRGB(

        visual.cloudTint,

        visual.cloudTint,

        1.0

    );
  

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

        pulse * 0.012 * visual.glow;

    earth.scale.setScalar(scale);

    clouds.scale.setScalar(

        scale + 0.01

    );

    fillLight.intensity =

        visual.fillIntensity;

    fillLight.position.copy(

        earth.position

    );

    fillLight.position.z += 6;
    
}
