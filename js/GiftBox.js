// js/GiftBox.js

export function createGiftBox(scene) {
    const giftBox = new THREE.Group();

    // Deep Velvet Red / Purple
    const baseMat = new THREE.MeshPhongMaterial({ color: 0x4a0e4a, shininess: 10 });
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 });

    // Base
    const baseGeo = new THREE.BoxGeometry(3, 2.5, 3);
    const base = new THREE.Mesh(baseGeo, baseMat);
    giftBox.add(base);

    // Lid
    const lidGeo = new THREE.BoxGeometry(3.2, 0.6, 3.2);
    const lid = new THREE.Mesh(lidGeo, baseMat);
    lid.position.y = 1.5;
    giftBox.add(lid);

    // Ribbons
    const hRibbonGeo = new THREE.BoxGeometry(3.05, 0.3, 3.3);
    const hRibbon = new THREE.Mesh(hRibbonGeo, ribbonMat);
    hRibbon.position.y = 0;
    giftBox.add(hRibbon);

    const vRibbonGeo = new THREE.BoxGeometry(3.3, 2.5, 0.3);
    const vRibbon = new THREE.Mesh(vRibbonGeo, ribbonMat);
    giftBox.add(vRibbon);

    // Bow
    const bowGroup = new THREE.Group();
    const bowGeo = new THREE.TorusGeometry(0.4, 0.1, 8, 20);
    const bowL = new THREE.Mesh(bowGeo, ribbonMat);
    bowL.rotation.y = Math.PI / 2;
    bowL.position.x = -0.3;
    const bowR = new THREE.Mesh(bowGeo, ribbonMat);
    bowR.rotation.y = Math.PI / 2;
    bowR.position.x = 0.3;
    bowGroup.add(bowL, bowR);
    bowGroup.position.y = 1.8;
    lid.add(bowGroup);

    scene.add(giftBox);
    return { giftBox, lid };
}
