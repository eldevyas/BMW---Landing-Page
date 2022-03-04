import * as THREE from "three";
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { BloomEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";

/**
 * Variables
 */

// Main Settings
const settings = {
    xThreshold: 20,
    yThreshold: 35,
    originalImagePath: 'https://assets.codepen.io/122136/dog-photo.jpg',
    depthImagePath: 'https://assets.codepen.io/122136/dog-depth-map.jpg',
}

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Image Details
let originalImage = null
let depthImage = null
const originalImageDetails = {
    width: 0,
    height: 0,
    aspectRatio: 0,
}

// Geometries and Material
let planeGeometry = null
let planeMaterial = null
let plane = null

// Cursor Settings
const cursor = {
    x: 0,
    y: 0,
    lerpX: 0,
    lerpY: 0,
}


/**
 * Base
 */

// Debug

// Canvas
const canvas = document.querySelector('canvas')

// Scene
const scene = new THREE.Scene()


/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0.7
scene.add(camera)

let fovY = camera.position.z * camera.getFilmHeight() / camera.getFocalLength();


/**
 * Images
 */

const textureLoader = new THREE.TextureLoader()

const loadImages = () => {

    if (originalImage !== null || depthImage !== null) {
        originalImage.dispose()
        depthImage.dispose()
    }
    depthImage = textureLoader.load('src/img/bmw_depth.png')

    originalImage = textureLoader.load('src/img/bmw.jpg', function(tex) {
        originalImageDetails.width = tex.image.width;
        originalImageDetails.height = tex.image.height;
        originalImageDetails.aspectRatio = tex.image.height / tex.image.width;

        create3dImage();
        resize();
    });

}

loadImages()


/**
 * Create 3D Image
 */

const create3dImage = () => {

    // Cleanup Geometry for GUI
    if (plane !== null) {
        planeGeometry.dispose()
        planeMaterial.dispose()
        scene.remove(plane)
    }

    planeGeometry = new THREE.PlaneBufferGeometry(1, 1);

    planeMaterial = new THREE.ShaderMaterial({
        uniforms: {
            originalTexture: { value: originalImage },
            depthTexture: { value: depthImage },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uThreshold: { value: new THREE.Vector2(20, 20) },
        },
        fragmentShader: `
      precision mediump float;
      uniform sampler2D originalTexture; 
      uniform sampler2D depthTexture; 
      uniform vec2 uMouse;
      uniform vec2 uThreshold;

      varying vec2 vUv;

      vec2 mirrored(vec2 v) {
        vec2 m = mod(v,2.);
        return mix(m,2.0 - m, step(1.0 ,m));
      }

      void main() {
        vec4 depthMap = texture2D(depthTexture, mirrored(vUv));
        vec2 fake3d = vec2(vUv.x + (depthMap.r - 0.5) * uMouse.x / uThreshold.x, vUv.y + (depthMap.r - 0.5) * uMouse.y / uThreshold.y);

        gl_FragColor = texture2D(originalTexture,mirrored(fake3d));
      }
    `,
        vertexShader: `
      varying vec2 vUv; 

      void main() {
        vUv = uv; 

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
    `
    });

    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    scene.add(plane);
}
create3dImage();



/**
 * Resize
 */

const resize = () => {

    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update Image Size
    if (sizes.height / sizes.width < originalImageDetails.aspectRatio) {
        plane.scale.set((fovY * camera.aspect), ((sizes.width / sizes.height) * originalImageDetails.aspectRatio), 1);
    } else {
        plane.scale.set((fovY / originalImageDetails.aspectRatio), fovY, 1);
    }

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

window.addEventListener('resize', () => {
    resize()
})


/**
 * Cursor
 */

document.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

document.addEventListener('mouseout', (event) => {
    cursor.x = 0
    cursor.y = 0
})
document.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    cursor.x = touch.pageX / sizes.width - 0.5;
    cursor.y = touch.pageY / sizes.height - 0.5;
})

document.addEventListener('touchend', (event) => {
    cursor.x = 0
    cursor.y = 0
})


/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

const clock = new THREE.Clock()
let previousTime = 0


const composer = new EffectComposer(renderer);

composer.addPass(new RenderPass(scene, camera));
composer.addPass(new EffectPass(camera, new BloomEffect()));


const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Set Cursor Variables
    const parallaxX = cursor.x * 1
    const parallaxY = -cursor.y * 1

    cursor.lerpX += (parallaxX - cursor.lerpX) * 5 * deltaTime;
    cursor.lerpY += (parallaxY - cursor.lerpY) * 5 * deltaTime;

    // Mouse Positioning Uniform Values
    planeMaterial.uniforms.uMouse.value = new THREE.Vector2(cursor.lerpX, cursor.lerpY)

    // Render
    renderer.render(scene, camera)

    composer.render();


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick();