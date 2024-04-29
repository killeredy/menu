import * as THREE from "three";

export default function LineTexture (imgPath = "./assets/img/mask.jpg" ){
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.setCrossOrigin("*").load(imgPath);
    texture.flipY = false;  

    texture.center = new THREE.Vector2(0.5, 0.5);
    return texture;
}