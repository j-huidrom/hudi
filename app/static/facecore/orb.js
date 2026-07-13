/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
orb.js

Responsibility

Creates and animates
HUDI's glass shell.

Author:
Project HUDI
==========================================================
*/

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import {

    ORB

} from "./config.js";

/*
==========================================================
Orb
==========================================================
*/

let orb;

/*
==========================================================
Create
==========================================================
*/

export function createOrb(scene) {

    const geometry =
        new THREE.SphereGeometry(

            ORB.RADIUS,

            ORB.SEGMENTS,

            ORB.SEGMENTS

        );

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                ORB.COLOR,

            transmission:
                ORB.TRANSMISSION,

            transparent: true,

            opacity: 1.0,

            roughness:
                ORB.ROUGHNESS,

            metalness: 0.0,

            clearcoat: 1,

            clearcoatRoughness: 0,

            thickness:
                ORB.THICKNESS,

            ior:
                ORB.IOR

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

let elapsed = 0;

export function updateOrb(delta) {

    if (!orb)
        return;

    elapsed += delta;

    //---------------------------------------
    // Idle Rotation
    //---------------------------------------

    orb.rotation.y +=

        delta *

        ORB.ROTATION_SPEED;

    //---------------------------------------
    // Breathing
    //---------------------------------------

    const breathe =

        1 +

        Math.sin(

            elapsed *

            ORB.BREATH_SPEED

        ) *

        ORB.BREATH_SCALE;

    orb.scale.set(

        breathe,

        breathe,

        breathe

    );

}

/*
==========================================================
Access
==========================================================
*/

export function getOrb(){

    return orb;

}