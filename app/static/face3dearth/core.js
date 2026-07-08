import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

import { scene } from "./scene.js";

export let earth;
let clouds;

const loader = new THREE.TextureLoader();

export function initCore() {

    //----------------------------------------
    // Load Textures
    //----------------------------------------

    const dayTexture = loader.load("assets/earth_day.jpg");
    const normalTexture = loader.load("assets/earth_normal.jpg");
    const cloudTexture = loader.load("assets/earth_clouds.jpg");

    dayTexture.colorSpace = THREE.SRGBColorSpace;

    //----------------------------------------
    // Earth
    //----------------------------------------

    const earthGeometry = new THREE.SphereGeometry(

        2,

        128,

        128

    );

    const earthMaterial = new THREE.MeshStandardMaterial({

        map: dayTexture,

        normalMap: normalTexture,

        normalScale: new THREE.Vector2(0.7,0.7),

        metalness:0,

        roughness:0.95

    });

    earth = new THREE.Mesh(

        earthGeometry,

        earthMaterial

    );

    scene.add(earth);

    //----------------------------------------
    // Clouds
    //----------------------------------------

    const cloudGeometry = new THREE.SphereGeometry(

        2.02,

        128,

        128

    );

    const cloudMaterial = new THREE.MeshPhongMaterial({

        map: cloudTexture,

        transparent:true,

        opacity:0.55,

        depthWrite:false

    });

    clouds = new THREE.Mesh(

        cloudGeometry,

        cloudMaterial

    );

    scene.add(clouds);

}

export function updateCore(delta,time){

    if(!earth) return;

    //----------------------------------------
    // Earth Rotation
    //----------------------------------------

    earth.rotation.y += delta * 0.10;

    //----------------------------------------
    // Clouds rotate slightly faster
    //----------------------------------------

    clouds.rotation.y += delta * 0.13;

    //----------------------------------------
    // Floating Animation
    //----------------------------------------

    const offset = Math.sin(time*0.6)*0.08;

    earth.position.y = offset;

    clouds.position.y = offset;

}