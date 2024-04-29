import { Html, Text } from "@react-three/drei";
import LineTexture from "./LineTexture";
import * as THREE from "three";


import LineBrilho from "./LineBrilho";
import { useEffect, useState } from "react";

export default function Line({
  lineMeshInput,
  current,
  width,
  showText,
  mask,
  onClick,
  setSelBlur,
  widthScale
}) {
  const lineMesh = lineMeshInput.geometry.clone();
  lineMesh.name = current.slug;
  

  useEffect(()=>{console.log("teste")},[])

  const posX = width ? current.index * width : 0;


  const handleMouseOver = () => {
    setSelBlur(false)
  }

  const handleMouseEnter = () => {
    setSelBlur(true)
  }


  return (
    <group position-x={posX} >
      <group  scale-x={widthScale} >
        <mesh name={current.slug} onPointerDown={(e) => onClick(current.page_id)} onPointerLeave={(e) => handleMouseOver()} onPointerEnter={(e) => handleMouseEnter()}  >
          <primitive object={lineMeshInput.geometry} />
          <meshBasicMaterial color={'black'}  alphaMap={mask} transparent={true} />

          
{/*       
            <Html color={'black'} position={[0, 1.24, 0]}  wrapperClass="text-container" occlude  transform distanceFactor={1} prepend   >
              <div className={`texts ${showText ?  "show" :  ""}`}>
                <div className="img-show" style={{ backgroundImage: `url(${current.img_d}})`} } ></div>
                <h2>{current.title}</h2>
                <div className="desc">
                {current.desc}
                </div>
              </div>
        </Html> */}
      
      

        </mesh>
        <LineBrilho lineMesh={lineMesh} />
      </group>



    </group>
  );
}


