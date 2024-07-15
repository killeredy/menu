import { Html, Text, useTexture } from "@react-three/drei";
import LineTexture from "./LineTexture";
import * as THREE from "three";


import LineBrilho from "./LineBrilho";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import StringToText from "../StringToText";
import { IntenalContext } from "../../Provider/InternalProvider";
import { animationSteps, StatesMenu } from "../../models/StateMenu";

function Line({
  lineMeshInput,
  current,
  width,
  showText,
  onClick,
  setSelBlur,
  widthScale,
  alphaOffset = 0
}) {
  const { config3d } = useContext(IntenalContext);
  const alphaMap = useTexture(config3d.assets + "img/mask.jpg");

  const [line, setLine] = useState();
  const [myHover, setMyHover] = useState(false);
  const [posX, setPosX] = useState();
  

  useEffect(() => {
    const lineMesh = lineMeshInput.geometry.clone();
    lineMesh.name = current.slug;
    setLine(lineMesh)
    const larg =  width ? current.index * width : 0;
    setPosX(larg);
  }, [width])


  useEffect(() => {
    alphaMap.repeat.set(1, 0.28)
    alphaMap.center.set(0.5, 0.09)
    alphaMap.name = 'teste'
  }, [])


  
  alphaMap.center.set(0, alphaOffset.current)

  const handleMouseOver = () => {
    setSelBlur(false)
    setMyHover(false);
  }

  const handleMouseEnter = () => {
    setSelBlur(true)
    setMyHover(true);
  }


  return (
    <>
      {line  && (
        <>
        <group position-x={posX} >
          <group scale-x={widthScale} >
            <mesh name={current.slug} onPointerDown={(e) => onClick(current.page_id)} onPointerLeave={(e) => handleMouseOver()} onPointerEnter={(e) => handleMouseEnter()}  >
              <primitive object={lineMeshInput.geometry} />
              <meshBasicMaterial color={'black'} alphaMap={alphaMap} transparent={true} />
            </mesh>
            <LineBrilho lineMesh={line} />
            <Html color={'black'} position={[0, 1.24, 0]} wrapperClass="text-container" transform distanceFactor={1.0}   >
              <div className={`texts ${showText ? "show" : ""} `}>
                <div className={`img-show ${myHover ? "show" : ""}`} style={{ backgroundImage: `url(${current.img_d}})` }} ></div>
                <div className={`img-body ${current.pagesList ? "menu-principal" : "menu-sub"}`}  >
                  <h2>{current.title}</h2>
                  <div className="desc">
                    <StringToText text={current.desc} />
                  </div>
                </div>
              </div>
            </Html>
          </group>
        </group>
        </>
      )}
    </>
  );
}


export default memo(Line);