import { useEffect, useState, useCallback, useContext, useRef } from "react";
import Line from "./Line";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import My from "./My.jsx"
import { AnimaePause } from "../AnimePause.jsx";
import { IntenalContext } from "../../Provider/InternalProvider.jsx";
import { animationSteps, StatesMenu } from "../../models/StateMenu.jsx";
import { ExternalContext } from "../../Provider/ExternalProvider.jsx";



export function LinesList() {
  const { menu, setMenu, config3d } = useContext(IntenalContext);
  const { externalMenu, setExternalMenu } = useContext(ExternalContext);
  const { nodes } = useGLTF(config3d.models + "scene.gltf");
  const alphaMap = useTexture(config3d.assets + "img/mask.jpg");


  const [size, setSize] = useState({});
  const [lineMesh, setLineMesh] = useState(null);
  const [showText, setShowText] = useState(false);
  const [offset, setOffset] = useState(1);
  const [widthScale, setWidthScale] = useState(1.5)
  const [offsetInit, setOffisetInit] = useState(animationSteps.opening.init);
  const [offsetFinal, setOffisetFinal] = useState(animationSteps.opening.final);

  const [currentPg, setCurrentPg] = useState(menu.currentPg);
  const [nextPg, setNextPag] = useState(null);
  const [upDatePage, setUpDatePage] = useState(false);

  const [showMy, setShowMy] = useState(false);


  const alphaOffset =  useRef(animationSteps.opening.init)
  

  useEffect(() => {
    const box = new THREE.Box3();
    box.expandByObject(nodes.lines);
    const newSize = box.getSize(new THREE.Vector3());
    newSize.x *= widthScale;
    setSize(newSize);
    setLineMesh(nodes.lines)

    alphaMap.repeat.set(1, 0.28)
    alphaMap.center.set(0.5, 0.09)
    alphaMap.name = 'teste'
    alphaMap.center.set(0, offsetInit)
  }, []);




  useEffect(() => { 
    setNextPag(menu.currentPg)
    if(showMy){
      setAnimation(animationSteps.closing.init, animationSteps.closing.final);
      setExternalMenu({ ...externalMenu, content: StatesMenu.closing })
    }
  }, [menu])


  useEffect(() => { 
    console.log(nextPg)
    if(nextPg !=  null){
      const newCPg =  [...nextPg];
      setCurrentPg(newCPg)
      setNextPag(null);
      setUpDatePage(false);
    }
  }, [upDatePage])





  useFrame((_, delta) => {

    if (externalMenu.content == StatesMenu.opening || externalMenu.content == StatesMenu.closing) {
      if (offsetInit < offsetFinal) {
        let newOffset = offsetInit + animationSteps.steps * delta
        newOffset = newOffset > offsetFinal ? offsetFinal : newOffset;
        setOffisetInit(newOffset);
        alphaOffset.current =  newOffset

      }
      else {
        setShowMy(true)
        if (externalMenu.content == StatesMenu.opening) {
          setExternalMenu({ ...externalMenu, content: StatesMenu.open })
        } else if (externalMenu.content == StatesMenu.closing) {

          if (typeof nextPg == "object") {
            setAnimation(animationSteps.opening.init, animationSteps.opening.final);
            setExternalMenu({ ...externalMenu, content: StatesMenu.opening })
            setUpDatePage(true);
          } else if (typeof nextPg == "string") {
            console.log('load')
            window.location.href = nextPg;
          } else {
            console.log('voltar')
            setMenu({ ...menu, currentPg: nextPg })
          }
        }
      }
    }
  });




  const handleSetPage = (current) => {
    setAnimation(animationSteps.closing.init, animationSteps.closing.final);
    setExternalMenu({ ...externalMenu, content: StatesMenu.closing })

    if (current.page) {
      setNextPag(current.page)
    } else {
      setAnimation(animationSteps.closing.init, animationSteps.closing.final);

      const newList = [...current.pagesList];
      setNextPag(newList);

      const newExtr = { ...externalMenu };
      newExtr.btnSubmenu = true;
      newExtr.content = StatesMenu.closing;
      setAnimation(animationSteps.closing.init, animationSteps.closing.final);
      setExternalMenu(newExtr)
    }
  }

  const handleSetBlur = (show, selMesh) => {
    // const newMesh = show ? selMesh : null;
    // setSelBlur(newMesh);
  }


  const resetWidth = () => {
    return currentPg.length * size.x * -0.5 + (size.x / 2);
  }


  const setAnimation = (init, final) => {
    setOffisetInit(init);
    setOffisetFinal(final);
  }

  console.log(externalMenu);

  return (
    <>
      <group dispose={null}>
        <meshBasicMaterial map={alphaMap} />
        <group position-x={resetWidth()}  >
          {currentPg.map((current, index) => {
            return (
              <group key={index}>
                {current.show && lineMesh && (
                  <Line
                    current={current}
                    lineMeshInput={lineMesh}
                    width={size.x}
                    showText={showText}
                    mask={alphaMap}
                    alphaOffset={alphaOffset}
                    onClick={() => handleSetPage(current)}
                    setSelBlur={(e) => handleSetBlur(e, lineMesh)}
                    widthScale={widthScale}
                  />
                )}
              </group>
            );
          })}
        </group>
      </group>
      {externalMenu.menu !=  "close"  && (
        <My menu={menu} />
      )}
      <ambientLight intensity={2} />
    </>);
}

useGLTF.preload(menu_data.path_model + 'scene.gltf')
