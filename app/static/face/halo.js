import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164/build/three.module.js";

export let halo;

export function createHalo(scene){

    const geometry =
        new THREE.SphereGeometry(
            1.15,
            128,
            128
        );

    const material =
        new THREE.ShaderMaterial({

        transparent:true,

        depthWrite:false,

        blending:THREE.AdditiveBlending,

        side:THREE.BackSide,

        uniforms:{

            glowColor:{
                value:new THREE.Color(0x66dfff)
            }

        },

        vertexShader:`

            varying vec3 vNormal;
            varying vec3 vView;

            void main(){

                vec4 mvPosition =
                    modelViewMatrix *
                    vec4(position,1.0);

                vNormal =
                    normalize(normalMatrix*normal);

                vView =
                    normalize(-mvPosition.xyz);

                gl_Position =
                    projectionMatrix *
                    mvPosition;

            }

        `,

        fragmentShader:`

            uniform vec3 glowColor;

            varying vec3 vNormal;
            varying vec3 vView;

            void main(){

                float intensity =
                    pow(
                        1.0-dot(vNormal,vView),
                        2.2
                    );

                gl_FragColor =
                    vec4(
                        glowColor,
                        intensity*0.35
                    );

            }

        `

    });

    halo =
        new THREE.Mesh(
            geometry,
            material
        );

    scene.add(halo);

}