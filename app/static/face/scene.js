import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020610);

export const camera = new THREE.PerspectiveCamera(

    35,

    window.innerWidth/window.innerHeight,

    0.1,

    100

);

camera.position.set(

    0,

    0,

    3.2

);

/* ---------- Ambient ---------- */

const ambient = new THREE.AmbientLight(

    0xffffff,

    0.10

);

scene.add(ambient);

/* ---------- Main Blue ---------- */

const blueLight = new THREE.PointLight(

    0x74dfff,

    120,

    20

);

blueLight.position.set(

    -2,

    2,

    3

);

scene.add(blueLight);

/* ---------- Secondary Blue ---------- */

const blueLight2 = new THREE.PointLight(

    0x57c7ff,

    70,

    20

);

blueLight2.position.set(

    2,

    -1,

    3

);

scene.add(blueLight2);

/* ---------- Back White ---------- */

const backLight = new THREE.PointLight(

    0xffffff,

    60,

    30

);

backLight.position.set(

    0,

    0,

    -8

);

scene.add(backLight);

/* ---------- Rim ---------- */

const rim = new THREE.DirectionalLight(

    0xffffff,

    2

);

rim.position.set(

    5,

    5,

    5

);

scene.add(rim);