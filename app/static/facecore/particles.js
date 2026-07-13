/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
particles.js

Responsibility

Creates and animates
HUDI's surrounding energy particles.

Author:
Project HUDI
==========================================================
*/

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";

import {

    PARTICLES

} from "./config.js";

/*
==========================================================
Particle Group
==========================================================
*/

let particleGroup;

let particleSystem;

let positions;

let elapsed = 0;

/*
==========================================================
Create
==========================================================
*/

export function createParticles(scene) {

    particleGroup = new THREE.Group();

    //-----------------------------------------
    // Geometry
    //-----------------------------------------

    const geometry =
        new THREE.BufferGeometry();

    positions =
        new Float32Array(

            PARTICLES.COUNT * 3

        );

    for (let i = 0; i < PARTICLES.COUNT; i++) {

        const radius =

            PARTICLES.CLOUD_RADIUS *

            (0.7 + Math.random() * 0.6);

        const theta =

            Math.random() *

            Math.PI * 2;

        const phi =

            Math.acos(

                2 * Math.random() - 1

            );

        positions[i * 3 + 0] =

            radius *

            Math.sin(phi) *

            Math.cos(theta);

        positions[i * 3 + 1] =

            radius *

            Math.cos(phi);

        positions[i * 3 + 2] =

            radius *

            Math.sin(phi) *

            Math.sin(theta);

    }

    geometry.setAttribute(

        "position",

        new THREE.BufferAttribute(

            positions,

            3

        )

    );

    //-----------------------------------------
    // Material
    //-----------------------------------------

    const material =
        new THREE.PointsMaterial({

            color: 0x66bbff,

            size: PARTICLES.SIZE,

            transparent: true,

            opacity: 0.55,

            depthWrite: false,

            blending:

                THREE.AdditiveBlending

        });

    //-----------------------------------------
    // System
    //-----------------------------------------

    particleSystem =
        new THREE.Points(

            geometry,

            material

        );

    particleGroup.add(

        particleSystem

    );

    scene.add(

        particleGroup

    );

}

/*
==========================================================
Update
==========================================================
*/

export function updateParticles(delta) {

    if (!particleGroup)
        return;

    elapsed += delta;

    //-----------------------------------------
    // Slow rotation
    //-----------------------------------------

    particleGroup.rotation.y +=

        delta *

        PARTICLES.ROTATION_SPEED;

    particleGroup.rotation.x =

        Math.sin(

            elapsed * 0.15

        ) * 0.08;

    //-----------------------------------------
    // Gentle breathing
    //-----------------------------------------

    const scale =

        1 +

        Math.sin(

            elapsed * 0.8

        ) * 0.02;

    particleGroup.scale.set(

        scale,

        scale,

        scale

    );

    //-----------------------------------------
    // Opacity pulse
    //-----------------------------------------

    particleSystem.material.opacity =

        0.45 +

        Math.sin(

            elapsed * 2

        ) * 0.10;

}

/*
==========================================================
Access
==========================================================
*/

export function getParticles() {

    return particleGroup;

}