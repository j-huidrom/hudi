/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
energy.js

Responsibility

Creates and animates
HUDI's living energy core.

Author:
Project HUDI
==========================================================
*/

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import {

    ENERGY

} from "./config.js";

/*
==========================================================
Energy Core
==========================================================
*/

let energyCore;

let elapsed = 0;

/*
==========================================================
Create
==========================================================
*/

export function createEnergyCore(scene) {

    const geometry =
        new THREE.SphereGeometry(

            ENERGY.RADIUS,

            128,

            128

        );

    const material =
        new THREE.MeshPhysicalMaterial({

            color:
                ENERGY.COLOR,

            emissive:
                ENERGY.EMISSIVE,

            emissiveIntensity:
                ENERGY.EMISSIVE_INTENSITY,

            transmission: 0.95,

            transparent: true,

            opacity: 0.82,

            roughness: 0.08,

            metalness: 0,

            clearcoat: 1,

            clearcoatRoughness: 0

        });

    energyCore =
        new THREE.Mesh(

            geometry,

            material

        );

    scene.add(

        energyCore

    );

}

/*
==========================================================
Update
==========================================================
*/

export function updateEnergy(delta) {

    if (!energyCore)
        return;

    elapsed += delta;

    //----------------------------------------
    // Breathing
    //----------------------------------------

    const breathe =

        1 +

        Math.sin(

            elapsed *

            ENERGY.BREATH_SPEED

        ) *

        ENERGY.BREATH_SCALE;

    energyCore.scale.set(

        breathe,

        breathe,

        breathe

    );

    //----------------------------------------
    // Floating
    //----------------------------------------

    energyCore.position.y =

        Math.sin(

            elapsed *

            ENERGY.FLOAT_SPEED

        ) *

        ENERGY.FLOAT_HEIGHT;

    //----------------------------------------
    // Rotation
    //----------------------------------------

    energyCore.rotation.y +=

        delta *

        ENERGY.ROTATION_SPEED;

    //----------------------------------------
    // Living Glow
    //----------------------------------------

    const glow =

        ENERGY.EMISSIVE_INTENSITY +

        Math.sin(

            elapsed * 3.0

        ) * 0.40;

    energyCore.material.emissiveIntensity =

        glow;

    //----------------------------------------
    // Color Drift
    //----------------------------------------

    const hue =

        0.56 +

        Math.sin(

            elapsed * 0.20

        ) * 0.02;

    energyCore.material.color.setHSL(

        hue,

        1.0,

        0.60

    );

    energyCore.material.emissive.setHSL(

        hue,

        1.0,

        0.45

    );

}

/*
==========================================================
Access
==========================================================
*/

export function getEnergyCore() {

    return energyCore;

}