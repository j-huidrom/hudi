import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export let scene;
export let camera;
export let renderer;
export let clock;

export function initScene() {

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x01040c);

    //---------------------------------------
    // Camera
    //---------------------------------------

    camera = new THREE.PerspectiveCamera(

        38,

        window.innerWidth / window.innerHeight,

        0.1,

        100

    );

    camera.position.set(0,0,6.8);

    //---------------------------------------
    // Renderer
    //---------------------------------------

    renderer = new THREE.WebGLRenderer({

        antialias:true

    });

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure = 1.25;

    renderer.physicallyCorrectLights = true;

    document
        .getElementById("scene-container")
        .appendChild(renderer.domElement);

    //---------------------------------------
    // Clock
    //---------------------------------------

    clock = new THREE.Clock();

    //---------------------------------------
    // Ambient Light
    //---------------------------------------

    scene.add(

        new THREE.AmbientLight(

            0xffffff,

            0.25

        )

    );

    //---------------------------------------
    // Sun Light
    //---------------------------------------

    const sun =
        new THREE.DirectionalLight(

            0xffffff,

            8

        );

    sun.position.set(

        8,

        5,

        8

    );

    scene.add(sun);

    //---------------------------------------
    // Blue Fill Light
    //---------------------------------------

    const fill =
        new THREE.PointLight(

            0x4da6ff,

            30,

            50

        );

    fill.position.set(

        -6,

        -4,

        6

    );

    scene.add(fill);

    //---------------------------------------

    window.addEventListener(

        "resize",

        onResize

    );

}

function onResize(){

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );

}

export function render(){

    renderer.render(

        scene,

        camera

    );

}