import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */

const group = new THREE.Group();
group.position.y = 1;
group.position.x = 1;
group.scale.y = 1;
group.rotation.y = 12;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: "red"})
);
cube1.position.set(0,0,0)

group.add(cube1);


const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: "green"})
);

cube2.position.set(2,0,0)

group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: "blue"})
);

cube3.position.set(4,0,0)

group.add(cube3);



/**
 * Cube Mesh
 */
const cube = new THREE.Mesh(
    // Geometry 
    new THREE.BoxGeometry(1, 1, 1), 
    // Material  
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
)

// Set position of cube by x,y,z coordinates
cube.position.set(0.7, -0.6,1);

scene.add(cube)

/**
 * Mesh Position
 */
// distance between the center of the scene 
// console.log(cube.position.length());

// distance from another Vector3
// console.log(cube.position.distanceTo(camera.position));

// distance between the object to the camera 
// console.log(cube.position.distanceTo(new THREE.Vector3(0,1,2)));

// take the cube vector length and reduce it to 1 
// console.log(cube.position.normalize());


/**
 * Scale Object
 */

// Scaling objects
cube.scale.x = 1;
cube.scale.y = 1;
cube.scale.z = 2;
cube.scale.set(2, 0.5, 0.5);


/**
 * Rotate Object  (rotation) Euler 
 * Rotation using PI equation to do half a rotation
 * Use reorder to coordinates avoid gimbal lock
 */ 

cube.rotation.reorder('YXZ');
cube.rotation.x = Math.PI * 0.25;
cube.rotation.y = Math.PI * 0.25;
cube.rotation.z = Math.PI * 0.25;

/**
 * Scene Graph
 * put objects inside groups and use position, rotation, quaternion and scale on those groups using the Group class
 */


/**
 * Axes Helper
 */

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);


/**
 * Camera
 */
// Base camera
/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// Set position of camera by x,y,z coordinates
camera.position.set(4,2,5);
// Takes in a Vector3 Object
camera.lookAt(cube.position);

scene.add(camera)



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()