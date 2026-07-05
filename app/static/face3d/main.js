import * as THREE from "three";

const scene = new THREE.Scene();

scene.background=new THREE.Color(0x060913);

const camera=new THREE.PerspectiveCamera(

45,

window.innerWidth/window.innerHeight,

0.1,

1000

);

camera.position.z=5;

const renderer=new THREE.WebGLRenderer({

antialias:true

});

renderer.setSize(

window.innerWidth,

window.innerHeight

);

document

.getElementById("scene")

.appendChild(renderer.domElement);



const geometry=new THREE.TorusGeometry(

1.2,

0.03,

32,

200

);

const material=new THREE.MeshBasicMaterial({

color:0xffd34d

});

const ring=new THREE.Mesh(

geometry,

material

);

scene.add(ring);



function animate(){

requestAnimationFrame(animate);

renderer.render(scene,camera);

}

animate();



window.addEventListener(

"resize",

()=>{

camera.aspect=

window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(

window.innerWidth,

window.innerHeight

);

}

);