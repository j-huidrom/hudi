import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";

import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export const renderer = new THREE.WebGLRenderer({

    antialias: true,

    alpha: true,

    powerPreference: "high-performance"

});

renderer.setPixelRatio(

    Math.min(window.devicePixelRatio,2)

);

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.toneMapping = THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.25;

renderer.physicallyCorrectLights = true;

document
.getElementById("app")
.appendChild(renderer.domElement);

export let composer;

export function setupPostProcessing(scene,camera){

    composer = new EffectComposer(renderer);

    composer.addPass(

        new RenderPass(scene,camera)

    );

    const bloom = new UnrealBloomPass(

        new THREE.Vector2(

            window.innerWidth,

            window.innerHeight

        ),

        1.0,

        0.35,

        0.85

    );

    composer.addPass(bloom);

}