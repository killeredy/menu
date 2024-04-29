import { useLoader, useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import LineTexture from "./LineTexture";

export default function LineBrilho({lineMesh}){
    const endAnimate =  -0.6;
    const startAnimte =  -2;
    const steps = 2;


    const [showBrilho, setShowBrilho] = useState(false);
    const [posBrilho, setPosBrilho] = useState(startAnimte);
    

    const maskImgBrilho =  LineTexture("./assets/img/mask.jpg");
    maskImgBrilho.name = "text-brilho";
    

    useFrame((_, delta) => {
          if (startAnimte <=  posBrilho && posBrilho <= endAnimate) {
            const animaSteps =  showBrilho ? steps :  (steps * -1);
            let anima =  posBrilho + animaSteps * delta;
            anima  = endAnimate < anima  ?  endAnimate :  anima;
            anima  = anima < startAnimte ?  startAnimte :  anima;
            setPosBrilho(anima);
          }       
    });

    const updateTexture =(texture)=>{
        texture.offset.set(0, posBrilho );
        texture.repeat.set(1, 0.5 );
        return texture
    }


    return (
    <mesh 
        geometry={lineMesh}
        onPointerLeave={() => setShowBrilho(false)}
        onPointerEnter={() => setShowBrilho(true)}
        position={[0,0,0.01]}
        >
            <meshBasicMaterial 
                color={'orange'}
                transparent={true}
                opacity={0.3}
                repeat={[0,0]}
                alphaMap={updateTexture(maskImgBrilho)}

            />
      </mesh>
    )
  
}