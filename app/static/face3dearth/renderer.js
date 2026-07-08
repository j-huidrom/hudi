import * as THREE from "three";

export let scene;
export let camera;
export let renderer;

export function initScene() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060913);

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

    camera.position.set(0, 0, 8);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const container = document.getElementById("scene");
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    //---------------------------------------
    // Lighting
    //---------------------------------------

    const ambient = new THREE.AmbientLight(
        0xffffff,
        0.45
    );

    scene.add(ambient);

    const keyLight = new THREE.PointLight(
        0xffd54d,
        10,
        30
    );

    keyLight.position.set(0, 0, 6);

    scene.add(keyLight);

    const fillLight = new THREE.PointLight(
        0x4466ff,
        1.5,
        25
    );

    fillLight.position.set(-5, 4, 5);

    scene.add(fillLight);

    //---------------------------------------
    // Resize
    //---------------------------------------

    window.addEventListener("resize", onResize);

}

function onResize() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}

export function render() {

    renderer.render(scene, camera);

}