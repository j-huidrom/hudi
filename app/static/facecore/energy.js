/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
energy.js

Responsibility

Creates and animates
HUDI's living energy core.

Consumes only visual parameters.

Author:
Project HUDI
==========================================================
*/

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import { ENERGY } from "./config.js";

import { getVisualState } from "./visualstate.js";

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

    const geometry = new THREE.SphereGeometry(

        ENERGY.RADIUS,

        128,

        128

    );

    const material = new THREE.MeshPhysicalMaterial({

        color: ENERGY.COLOR,

        emissive: ENERGY.EMISSIVE,

        emissiveIntensity: ENERGY.EMISSIVE_INTENSITY,

        transmission: 0.95,

        transparent: true,

        opacity: 0.82,

        roughness: 0.08,

        metalness: 0.0,

        clearcoat: 1.0,

        clearcoatRoughness: 0.0

    });

    energyCore = new THREE.Mesh(

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

    const visual = getVisualState();

    /*
    --------------------------------------------------
    Breathing
    --------------------------------------------------
    */

    const breathe =

        1 +

        Math.sin(

            elapsed *

            ENERGY.BREATH_SPEED *

            visual.energyPulseSpeed

        ) *

        ENERGY.BREATH_SCALE;

    energyCore.scale.set(

        breathe,

        breathe,

        breathe

    );

    /*
    --------------------------------------------------
    Floating
    --------------------------------------------------
    */

    energyCore.position.y =

        Math.sin(

            elapsed *

            ENERGY.FLOAT_SPEED

        ) *

        ENERGY.FLOAT_HEIGHT;

    /*
    --------------------------------------------------
    Rotation
    --------------------------------------------------
    */

    energyCore.rotation.y +=

        delta *

        ENERGY.ROTATION_SPEED *

        0.60;

    /*
    --------------------------------------------------
    Glow
    --------------------------------------------------
    */

    const pulse =

        Math.sin(

            elapsed *

            3 *

            visual.energyPulseSpeed

        ) * 0.35;

    energyCore.material.emissiveIntensity =

        ENERGY.EMISSIVE_INTENSITY *

        visual.energyBrightness +

        pulse;

    /*
    --------------------------------------------------
    Hue
    --------------------------------------------------
    */

    const hue =

        visual.energyHue +

        Math.sin(

            elapsed * 0.15

        ) * 0.01;

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