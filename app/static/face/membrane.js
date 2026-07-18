import * as THREE from "three";
import { HUDI } from "./behavior.js";

let membrane;
let material;
let clock = new THREE.Clock();

export function createMembrane(scene) {

    const geometry = new THREE.SphereGeometry(1.02, 128, 128);

    material = new THREE.ShaderMaterial({

        transparent: true,
        depthWrite: false,

        uniforms: {

            uTime: { value: 0 },
            uGlow: { value: 1 },
            uBreath: { value: 1 },
            uRipple: { value: 0 },

            uColor: {
                value: new THREE.Color("#4FC3FF")
            }

        },

        vertexShader: `

            uniform float uTime;
            uniform float uBreath;
            uniform float uRipple;

            varying vec3 vNormal;
            varying vec3 vPosition;

            void main(){

                vNormal = normalize(normalMatrix * normal);

                vec3 pos = position;

                float breathe =
                    sin(uTime * 0.8) * 0.01 * uBreath;

                float ripple =
                    sin(
                        position.y * 20.0 +
                        uTime * 3.0
                    ) * 0.004 * uRipple;

                pos += normal * (breathe + ripple);

                vPosition = pos;

                gl_Position =
                    projectionMatrix *
                    modelViewMatrix *
                    vec4(pos,1.0);

            }

        `,

        fragmentShader: `

            uniform float uGlow;
            uniform vec3 uColor;

            varying vec3 vNormal;

            void main(){

                float fresnel = pow(
                    1.0-abs(vNormal.z),
                    3.5
                );

                vec3 color =
                    uColor *
                    fresnel *
                    uGlow;

                gl_FragColor =
                    vec4(
                        color,
                        1.0
                    );

            }

        `

    });

    membrane = new THREE.Mesh(
        geometry,
        material
    );

    scene.add(membrane);

}

export function updateMembrane(){

    const t = clock.getElapsedTime();

    material.uniforms.uTime.value = t;

    material.uniforms.uGlow.value =
        HUDI.membrane.glow;

        material.uniforms.uColor.value.set(
            HUDI.membrane.color
        );

    material.uniforms.uBreath.value =
        HUDI.membrane.breathe;

    switch(HUDI.state){

        case "idle":

            material.uniforms.uRipple.value = 0.2;
            break;

        case "listening":

            material.uniforms.uRipple.value = 0.6;
            break;

        case "thinking":

            material.uniforms.uRipple.value = 1.6;
            break;

        case "speaking":

            material.uniforms.uRipple.value = 1.0;
            break;

    }

}