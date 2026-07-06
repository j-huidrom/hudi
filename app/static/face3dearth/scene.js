import * as THREE from "https://unpkg.com/three@0.179.1/build/three.module.js";

export let scene;
export let camera;
export let renderer;
export let clock;

export function initScene() {

    //----------------------------------------------------
    // Scene
    //----------------------------------------------------

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x02040d);

    //----------------------------------------------------
    // Camera
    //----------------------------------------------------

    camera = new THREE.PerspectiveCamera(

        42,

        window.innerWidth / window.innerHeight,

        0.1,

        1000

    );

    camera.position.set(0,0,7);

    //----------------------------------------------------
    // Renderer
    //----------------------------------------------------

    renderer = new THREE.WebGLRenderer({

        antialias:true,

        alpha:false

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

    renderer.toneMappingExposure = 1.15;

    document
        .getElementById("scene-container")
        .appendChild(renderer.domElement);

    //----------------------------------------------------
    // Lighting
    //----------------------------------------------------

    const ambient =
        new THREE.AmbientLight(
            0xffffff,
            .35
        );

    scene.add(ambient);

    //----------------------------------------------------

    const sun =
        new THREE.DirectionalLight(
            0x8bd6ff,
            3.2
        );

    sun.position.set(

        4,

        2,

        5

    );

    scene.add(sun);

    //----------------------------------------------------

    const rim =
        new THREE.PointLight(

            0x3f8cff,

            18,

            30

        );

    rim.position.set(

        -5,

        -1,

        4

    );

    scene.add(rim);

    //----------------------------------------------------

    clock =
        new THREE.Clock();

    //----------------------------------------------------

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