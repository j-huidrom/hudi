import * as THREE from "three";

export let head;
export let ring;
export let leftEye;
export let rightEye;
export let mouth;

export function createFace(scene) {

    //-------------------------------------------------------
    // Root group
    //-------------------------------------------------------

    head = new THREE.Group();
    scene.add(head);

    //-------------------------------------------------------
    // Face Ring
    //-------------------------------------------------------

    const ringGeometry = new THREE.TorusGeometry(
        1.7,
        0.045,
        32,
        220
    );

    const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd54d,
        emissive: 0xffd54d,
        emissiveIntensity: 1.4,
        metalness: 0.2,
        roughness: 0.3
    });

    ring = new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );

    head.add(ring);

    //-------------------------------------------------------
    // Left Eye
    //-------------------------------------------------------

    const eyeGeometry = new THREE.SphereGeometry(
        0.11,
        32,
        32
    );

    const eyeMaterial = new THREE.MeshStandardMaterial({

        color:0xffd54d,

        emissive:0xffd54d,

        emissiveIntensity:4,

        metalness:0,

        roughness:0.1

    });

    leftEye = new THREE.Mesh(
        eyeGeometry,
        eyeMaterial
    );

    leftEye.position.set(
        -0.45,
        0.25,
        0.05
    );

    head.add(leftEye);

    //-------------------------------------------------------
    // Right Eye
    //-------------------------------------------------------

    rightEye = new THREE.Mesh(
        eyeGeometry,
        eyeMaterial
    );

    rightEye.position.set(
        0.45,
        0.25,
        0.05
    );

    head.add(rightEye);

    //-------------------------------------------------------
    // Mouth
    //-------------------------------------------------------

    const mouthGeometry = new THREE.CapsuleGeometry(

        0.05,

        0.42,

        8,

        16

    );

    const mouthMaterial = new THREE.MeshStandardMaterial({

        color:0xffd54d,

        emissive:0xffd54d,

        emissiveIntensity:3,

        metalness:0,

        roughness:0.15

    });

    mouth = new THREE.Mesh(
        mouthGeometry,
        mouthMaterial
    );

    mouth.rotation.z = Math.PI / 2;

    mouth.position.set(
        0,
        -0.48,
        0.05
    );

    head.add(mouth);

    //-------------------------------------------------------
    // Face Position
    //-------------------------------------------------------

    head.position.set(

        0,

        0,

        0

    );

}