import { useLoader, useFrame } from "@react-three/fiber";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import LineTexture from "./LineTexture";

 function LineBrilho({lineMesh}){
    const endAnimate =  -0.3;
    // const endAnimate =  -0.8;
    const startAnimte =  -2;
    const steps = 5;
    const color = 'darkorange';
    
    const [showBrilho, setShowBrilho] = useState(false);
    const controls = useRef();

    const newMaskImgBrilho =  LineTexture( menu_data.path_assets + "/img/mask.jpg");
    newMaskImgBrilho.name = "text-brilho";
    newMaskImgBrilho.repeat.set(1, 0.2 );
    newMaskImgBrilho.offset.set(1, startAnimte );

    
    useFrame((_, delta) => { 
        if( controls.current && controls.current.alphaMap ){
            if (startAnimte <= controls.current.alphaMap.offset.y && controls.current.alphaMap.offset.y <= endAnimate) {
                const animaSteps =  showBrilho ? steps :  (steps * -1);
                controls.current.alphaMap.offset.y += animaSteps * delta;
            } 
        }
    });


    return (
    <mesh 
        geometry={lineMesh}
        onPointerLeave={() => setShowBrilho(false)}
        onPointerEnter={() => setShowBrilho(true)}
        scale={5,1,1}
        position={[0,0,0.01]}
        >
            <meshBasicMaterial 
                ref={controls}
                color={color}
                transparent={true}
                opacity={0.7}
                repeat={[0,0]}
                alphaMap={newMaskImgBrilho}
                emissiveIntensity={5} 
                toneMapped={false}
                // emissive={color}
                // emissiveIntensity={4} 
                // toneMapped={false}

            />
      </mesh>
    )
  
}


export default memo(LineBrilho)