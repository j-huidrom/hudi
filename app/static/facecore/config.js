/*
==========================================================
HUDI FaceCore 1.0
----------------------------------------------------------
Module:
config.js

Responsibility:
Global configuration shared across all FaceCore modules.

This file contains NO rendering logic.

Every visual parameter used by FaceCore should
eventually come from here.

Author:
Project HUDI
==========================================================
*/

/*
==========================================================
Application
==========================================================
*/

export const APP = {

    NAME: "HUDI FaceCore",

    VERSION: "1.0.0"

};

/*
==========================================================
Renderer
==========================================================
*/

export const RENDERER = {

    ANTIALIAS: true,

    ALPHA: true,

    MAX_PIXEL_RATIO: 2,

    POWER_PREFERENCE: "high-performance"

};

/*
==========================================================
Camera
==========================================================
*/

export const CAMERA = {

    FOV: 35,

    NEAR: 0.1,

    FAR: 100,

    POSITION: {

        x: 0,

        y: 0,

        z: 4

    }

};

/*
==========================================================
Orb
==========================================================
*/

export const ORB = {

    RADIUS: 1.0,

    SEGMENTS: 128,

    COLOR: 0x66bbff,

    TRANSMISSION: 0.98,

    ROUGHNESS: 0.03,

    THICKNESS: 0.80,

    IOR: 1.45,

    ROTATION_SPEED: 0.12,

    BREATH_SPEED: 1.5,

    BREATH_SCALE: 0.03

};

/*
==========================================================
Energy Core
==========================================================
*/

export const ENERGY = {

    RADIUS: 0.72,

    COLOR: 0x33bbff,

    EMISSIVE: 0x1188ff,

    EMISSIVE_INTENSITY: 2.2,

    FLOAT_HEIGHT: 0.03,

    FLOAT_SPEED: 0.7,

    ROTATION_SPEED: 0.18,

    BREATH_SPEED: 1.4,

    BREATH_SCALE: 0.04

};

/*
==========================================================
Particles
==========================================================
*/

export const PARTICLES = {

    COUNT: 2500,

    SIZE: 0.025,

    CLOUD_RADIUS: 1.55,

    ROTATION_SPEED: 0.05

};

/*
==========================================================
Lighting
==========================================================
*/

export const LIGHTING = {

    AMBIENT: 1.6,

    KEY: 18,

    RIM: 8

};

/*
==========================================================
HUDI Runtime States
==========================================================
*/

export const STATE = {

    BOOT: "boot",

    READY: "ready",

    LISTENING: "listening",

    THINKING: "thinking",

    SPEAKING: "speaking",

    GOODBYE: "goodbye"

};

/*
==========================================================
State Multipliers

These values influence visualstate.js
==========================================================
*/

export const STATE_PROFILE = {

    READY: {

        glow: 1.0,

        particles: 1.0,

        rotation: 1.0

    },

    LISTENING: {

        glow: 1.25,

        particles: 1.2,

        rotation: 0.8

    },

    THINKING: {

        glow: 0.85,

        particles: 0.6,

        rotation: 0.4

    },

    SPEAKING: {

        glow: 1.45,

        particles: 1.6,

        rotation: 1.3

    },

    GOODBYE: {

        glow: 0.3,

        particles: 0.2,

        rotation: 0.5

    }

};