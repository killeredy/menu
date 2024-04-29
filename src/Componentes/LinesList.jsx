import {  useEffect, useState, useRef } from "react";
import Line from "./Line";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import MaskLine from "./MaskLine";
import { useFrame } from "@react-three/fiber";
import My from "./My.jsx"

import {
    SelectiveBloom,
  } from "@react-three/postprocessing";
  import { Resizer, KernelSize } from "postprocessing";



export function LinesList({menu, actionControl, setActionControl, setShowBack}) {
    const offsetStart = -0.95;
    const offsetIddle = 0;
    const offsetEnd = 0.95;
    const steps = 1;
    
    const [offset, setOffset ]=  useState(offsetStart);
    const [width, setWidth] = useState(null);
    const [listPages, setListPages] = useState(menu.paginasCurrent);
    const [nextListPages, setNextListPages] = useState([]);
    const [urlPage, setUrlPage] = useState('');
    const [showText, setShowText] = useState(false);
    const [selBlur, setSelBlur] = useState(null);
    const [animacao, setAnimacao] = useState('wait');

    const lightRef1 = useRef(null);
    const widthScale =  1.5;

    
    const { nodes } = useGLTF("models/scene.gltf");
    const lineMesh = useState(nodes.lines)[0];
    const box = new THREE.Box3();
    box.expandByObject(nodes.lines);
    const size = box.getSize(new THREE.Vector3());
    size.x *= widthScale;


    
  const masckTexture = MaskLine(0);
  masckTexture.repeat.set(1, 0.28)
  masckTexture.center.set(0.5, 0.09)
  masckTexture.offset.set(1, offset)


  useFrame((_, delta) => {
    if(actionControl){
        switch (actionControl) {
            case 'closeMenu':
                setOffset((offset) => offsetIddle)
                CloseMenu(delta, "closeMenu");
                break;

            case 'gotoHome':
              gotoHome(delta, "waitMenu");
                break;
                
            case 'hideMenu':
                CloseMenu(delta, "waitMenu");
                break;

            case 'openLines':
                setOffset((offset) => offsetStart)
                OpenLines(delta);
                break;

            case 'openSubPage':
                OpenSubPage(delta);
                break;

            case 'openPage':
                OpenPage(delta);
                break;
        
            default:
                break;
        }
    }
    
  });

  const gotoHome = (delta) =>{
    if(offset <=  offsetEnd){
        setOffset(offset + steps * delta);
    }else{
        setOffset(offsetStart);
        setListPages(menu.listPaginas)
        setActionControl('openLines');
        setShowBack(false);
    }
}

    const OpenLines = (delta) =>{
        if(offset <=  offsetIddle){
            setOffset(offset + steps * delta);
        }else{
            setOffset(offsetIddle);
            setActionControl('wait')
            setAnimacao("pouso");
            setShowText(true);
        }
    }


    const CloseMenu = (delta, nextAction) =>{
      if(offset <=  offsetEnd){
            setOffset(offset + steps * delta);
        }else{
            setOffset(offsetStart);
            setActionControl(nextAction)
            setShowBack(false);
        }
    }

    const OpenSubPage = (delta) =>{
        if(offset <=  offsetEnd){
            setOffset(offset + steps * delta);
        }else{
            setOffset(offsetStart);
            setListPages(nextListPages)
            setActionControl('openLines');
            setShowBack(true);
            setShowText(true);
        }
    }

    const OpenPage = (delta) =>{
        if(offset <=  offsetEnd){
            setOffset(offset + steps * delta);
        }else{
            setActionControl('waitOpenPage')
            window.location.href = urlPage;
            setShowBack(false);
        }
    }

    

    useEffect(() => {
      const newWidth =  (menu.paginasCurrent.length - 1) * (size.x )
      setWidth(newWidth);
      setTimeout(()=>{
        setOffset(offsetStart);
        setActionControl('openLines');
      }, 200)
    }, []);

    const resetWidth =() =>{
      return listPages.length   * size.x  * -0.5 + (size.x / 2) ;
    }


   const handleSetPage = (target)=>{
      setShowText(false);
      setAnimacao("lookAraond")
      if(target.page_id == 0){
          setNextListPages(target.pagesList);
          setActionControl('openSubPage');
          
      }else{
          setUrlPage(target.page);
          setActionControl('openPage');
      }
   }

   const handleSetBlur =(show, selMesh)=>{
        const newMesh =  show ? selMesh :  null;
        setSelBlur(newMesh);
   }  
   
   
   const handleSobre = (sobre)=>{
    setShowText(false);
    setUrlPage(sobre.page);
    setActionControl('openPage');
 }


    return (
    <>
      <group dispose={null}>
        <group position-x={resetWidth()}  >
          {listPages
            .map((current, index) => {
              return (
                <group key={index}>
                {current.show && (
                  <Line
                    
                    current={current}
                    lineMeshInput={lineMesh}
                    width={size.x}
                    showText={showText}
                    mask={masckTexture}
                    onClick={() => handleSetPage( current) }
                    setSelBlur={(e)=> handleSetBlur(e, lineMesh)}
                    widthScale={widthScale}
                   />


                )}
                </group>
              );
            })}
        </group>
      </group>
      {/* {animacao != 'wait' && (
        <My sobreData={menu}  setSobre={(e)=> handleSobre(menu.sobre) } animacao={animacao} setAnimacao={(e)=> setAnimacao(e)} />
      )} */}
      <ambientLight intensity={2} ref={lightRef1} />
      {selBlur && (
        <>
        {/* //   <SelectiveBloom
        //               lights={[lightRef1]}
        //               selection={[selBlur]}
        //               selectionLayer={2}
        //               intensity={2.0}
        //               blurPass={undefined}
        //               width={Resizer.AUTO_SIZE} // render width
        //               height={Resizer.AUTO_SIZE} // render height
        //               kernelSize={KernelSize.LARGE} // blur kernel size
        //               luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
        //               luminanceSmoothing={0.025}
        //           /> */}
        </>
      )}
    </>);
  }