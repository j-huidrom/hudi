/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
orb.js

Responsibility

Creates and animates
HUDI's glass shell.

Consumes only visual parameters.

Never knows runtime states.

Author:
Project HUDI
==========================================================
*/

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import {

    ORB

} from "./config.js";

import {

    getVisualState

} from "./visualstate.js";

/*
==========================================================
Orb
==========================================================
*/

let orb;

let elapsed = 0;

/*
==========================================================
Create
==========================================================
*/

export function createOrb(scene) {

    const geometry = new THREE.SphereGeometry(

        ORB.RADIUS,

        ORB.SEGMENTS,

        ORB.SEGMENTS

    );

    const material = new THREE.MeshPhysicalMaterial({

        color: ORB.COLOR,

        transmission: ORB.TRANSMISSION,

        transparent: true,

        opacity: 1.0,

        roughness: ORB.ROUGHNESS,

        metalness: 0.0,

        clearcoat: 1.0,

        clearcoatRoughness: 0.0,

        thickness: ORB.THICKNESS,

        ior: ORB.IOR

    });

    orb = new THREE.Mesh(

        geometry,

        material

    );

    scene.add(

        orb

    );

}

/*
==========================================================
Update
==========================================================
*/

export function updateOrb(delta) {

    if (!orb)
        return;

    elapsed += delta;

    const visual =

        getVisualState();

    /*
    ---------------------------------------
    Rotation
    ---------------------------------------
    */

    orb.rotation.y +=

        delta *

        ORB.ROTATION_SPEED *

        visual.rotationMultiplier;

    orb.rotation.x =

        Math.sin(

            elapsed * 0.10

        ) * 0.03;

    /*
    ---------------------------------------
    Breathing
    ---------------------------------------
    */

    const breathe =

        1 +

        Math.sin(

            elapsed *

            visual.breathingSpeed

        ) *

        visual.breathingAmplitude;

    orb.scale.set(

        breathe,

        breathe,

        breathe

    );

    /*
    ---------------------------------------
    Glass Opacity
    ---------------------------------------
    */

    orb.material.opacity =

        visual.glassOpacity;

    /*
    ---------------------------------------
    Glass Brightness
    ---------------------------------------
    */

    const brightness =

        0.35 +

        visual.glassBrightness * 0.25;

    orb.material.color.setHSL(

        0.56,

        0.75,

        brightness

    );

}

/*
==========================================================
Access
==========================================================
*/

export function getOrb() {

    return orb;

}