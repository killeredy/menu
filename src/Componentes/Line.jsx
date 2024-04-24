/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 line.gltf --transfor 
*/
import { useLoader, useFrame } from "@react-three/fiber";
import { useContext, useRef, useState } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function Line({
  lineMeshInput,
  current,
  width,
  setMeshSel,
  centerImg,
  setAnimaControl,
  animaControl,
  showText,
  setShowText,menu , setMenu 

}) {
  const [showBrilho, setShowBrilho] = useState(false);
  const [centerBrilho, setCenterBrilho] = useState(3);
  const lineMesh = lineMeshInput.geometry.clone();
  lineMesh.name = current.slug;

  const centerBrilhoStart = 3;
  const centerBrilhoEnd = 3.6;

  const maskPath = "./assets/img/mask.jpg";
  const maskPathBirlho = "./assets/img/maskBrilho.jpg";

  const maskImg = useLoader(THREE.TextureLoader, maskPath);
  const maskImgBrilho = useLoader(THREE.TextureLoader, maskPathBirlho);

  const animationBrilho = useRef();

  useFrame((_, delta) => {
      if (showBrilho) {
        if (centerBrilho <= centerBrilhoEnd) {
          setCenterBrilho(centerBrilho + 5 * delta);
        }
      } else {
        setCenterBrilho(centerBrilhoStart);
      }   
  });

  const handlesShow = (e) => {
    e.stopPropagation();
    setShowBrilho(true);
    // setMeshSel(animationBrilho);
  };
  const handlesHide = (e) => {
    e.stopPropagation();
    setShowBrilho(false);
    // setMeshSel(null);
  };

  const handleFish = (page_id) => {
    const call = page_id == 0 ? "openSubPage" : "openPage";
    setMenu({...menu, callback: call, current_index: current.id})
    setShowText(false)
    setCenterBrilho(centerBrilhoStart);
    setAnimaControl({...animaControl, view: true});
  };

  const refObj = useRef();

  const newMaterialImage = new THREE.MeshBasicMaterial();
  newMaterialImage.name = current.slug;
  const mask = maskImg.clone();
  mask.offset.set(1, 0.76);
  mask.repeat.set(1, 0.25);
  mask.name = current.slug + "Mask";
  newMaterialImage.alphaMap = mask;
  newMaterialImage.transparent = true;

  const newMaterialBrilho = new THREE.MeshBasicMaterial();
  newMaterialBrilho.color = new THREE.Color("rgb(255,180,0)");
  const maskBrilho = maskImgBrilho.clone();
  maskBrilho.offset.set(0, -2);
  maskBrilho.repeat.set(0, 0.26);
  maskBrilho.name = current.slug + "MaskBrilho";
  maskBrilho.center.set(1, centerBrilho);

  newMaterialBrilho.alphaMap = maskBrilho;
  newMaterialBrilho.transparent = true;
  newMaterialBrilho.opacity = 1;
  newMaterialBrilho.name = current.slug + "Brilho";
  newMaterialBrilho.alphaMap.center.set(1, centerBrilho);

  let imgPath = current.img_d;
  let texture;

  if (imgPath) {
    const textureLoader = new THREE.TextureLoader();
    // texture = textureLoader.load(imgPath);
    texture = textureLoader.setCrossOrigin("*").load(imgPath);
    texture.rotation = Math.PI;
    texture.center = new THREE.Vector2(0.5, 0.5);
  } else {
    texture = useLoader(THREE.TextureLoader, "./assets/img/maskEmission.jpg");
  }

  const maskPathEmission = "./assets/img/maskEmission.jpg";
  const maskImgEmission = useLoader(THREE.TextureLoader, maskPathEmission);

  texture.name = current.slug + "Texture";

  newMaterialImage.map = texture;
  newMaterialImage.alphaMap.center.set(2, centerImg);

  newMaterialImage.lightMap = maskImgEmission;
  newMaterialImage.color = new THREE.Color("rgb(255,240,255)");
  newMaterialImage.lightMapIntensity = 1;
  const posX = current.index * width;

  return (
    <group position-x={posX}>
      <group>
        <mesh
          ref={refObj}
          name={current.slug}
          geometry={lineMesh}
          material={newMaterialImage}
          onPointerDown={(e) => handleFish(current.page_id)}
          onPointerLeave={(e) => handlesHide(e)}
          onPointerEnter={(e) => handlesShow(e)}
        />
        <mesh
          ref={animationBrilho}
          geometry={lineMesh}
          material={newMaterialBrilho}
        />
      </group>
      {showText && (
        <>
          <Text position={[0, 0.7, 0.01]} scale={0.07} color={"0x00000"}>
            {current.title}
          </Text>
          <Text position={[0, 0.5, 0.01]} scale={0.04} lineHeight={1.4}>
            {current.desc}
          </Text>
        </>
      )}
    </group>
  );
}


