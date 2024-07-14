import { Html, Text } from "@react-three/drei";
import LineTexture from "./LineTexture";
import * as THREE from "three";


import LineBrilho from "./LineBrilho";
import { memo, useCallback, useEffect, useState } from "react";
import StringToText from "../StringToText";

function Line({
  lineMeshInput,
  current,
  width,
  showText,
  mask,
  onClick,
  setSelBlur,
  widthScale
}) {
  const [line, setLine] = useState();
  const [myHover, setMyHover] = useState(false);
  const [posX, setPosX] = useState();

  useEffect(() => {
    const lineMesh = lineMeshInput.geometry.clone();
    lineMesh.name = current.slug;
    setLine(lineMesh)
    setPosX(width ? current.index * width : 0);
  }, [width])



  const handleMouseOver = () => {
    setSelBlur(false)
    setMyHover(false);
  }

  const handleMouseEnter = () => {
    setSelBlur(true)
    setMyHover(true);
  }




  return (
    <group position-x={posX} >
      <group scale-x={widthScale} >
        <mesh name={current.slug} onPointerDown={(e) => onClick(current.page_id)} onPointerLeave={(e) => handleMouseOver()} onPointerEnter={(e) => handleMouseEnter()}  >
          <primitive object={lineMeshInput.geometry} />
          <meshBasicMaterial color={'black'} alphaMap={mask} transparent={true} />
        </mesh>
        <LineBrilho lineMesh={line} />
        <Html color={'black'} position={[0, 1.24, 0]} wrapperClass="text-container" transform distanceFactor={1.0}   >
            <div className={`texts ${showText ? "show" : ""} `}>
              <div className={`img-show ${myHover ? "show" : ""}`} style={{ backgroundImage: `url(${current.img_d}})` }} ></div>
              <div className={`img-body ${  current.pagesList  ? "menu-principal" : "menu-sub" }`}  >
                <h2>{current.title}</h2>
                <div className="desc">
                  <StringToText text={current.desc} />
                </div>
              </div>
            </div>
          </Html>
      </group>
    </group>
  );
}


export default memo(Line);