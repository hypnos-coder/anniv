// js/main.js
import { initScene } from './SceneSetup.js';
import { createGiftBox } from './GiftBox.js';
import { createRose } from './Rose.js';

let scene, camera, renderer, innerLight, particles;
let giftBoxGroup, lid;
let roses = [];
let isOpened = false;
let clock = new THREE.Clock();

function init() {
    const setup = initScene();
    scene = setup.scene;
    camera = setup.camera;
    renderer = setup.renderer;
    innerLight = setup.innerLight;
    particles = setup.particles;

    const giftBoxObj = createGiftBox(scene);
    giftBoxGroup = giftBoxObj.giftBox;
    lid = giftBoxObj.lid;

    // Initial fade in
    setTimeout(() => {
        document.getElementById('topTitle').style.opacity = '1';
    }, 500);

    // Bind click event
    document.getElementById('interactionHint').addEventListener('click', openGift);

    animate();
}

function openGift() {
    if (isOpened) return;
    isOpened = true;
    
    document.getElementById('interactionHint').style.display = 'none';
    
    const messageBox = document.getElementById('message-box');
    messageBox.style.display = 'block';
    
    // Add neon glow class to the text
    document.getElementById('hbdText').classList.add('neon-text');

    // Create lavender roses
    for(let i=0; i<20; i++) {
        roses.push(createRose(scene));
    }
}

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Hover effect for box
    if (!isOpened) {
        giftBoxGroup.position.y = Math.sin(time) * 0.2 - 1; // centered at -1
        giftBoxGroup.rotation.y += 0.005; // Gentle rotation like original
    } else {
        // Lid flies off
        if (lid.position.y < 10) { 
            lid.position.y += 0.15; 
            lid.rotation.x += 0.05;
            lid.rotation.z += 0.02;
            lid.scale.multiplyScalar(0.99); // Shrink it slightly as it flies away like original
        }

        // Increase inner light intensity
        if (innerLight.intensity < 2) {
            innerLight.intensity += 0.05;
        }

        // Roses popping out
        roses.forEach(rose => {
            rose.position.y += rose.userData.speedY;
            rose.position.x += rose.userData.speedX;
            rose.position.z += rose.userData.speedZ;
            rose.rotation.y += rose.userData.rotSpeed;
            
            // Gentle swaying
            rose.position.x += Math.sin(time + rose.position.y) * 0.01;
        });

        // Zoom camera out slowly for reveal
        if (camera.position.z < 12) camera.position.z += 0.01;
    }

    // Particle movement
    particles.rotation.y += 0.001;
    particles.position.y -= 0.005;
    if (particles.position.y < -5) particles.position.y = 5;

    renderer.render(scene, camera);
}

window.onload = init;
