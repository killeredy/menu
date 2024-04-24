import { useContext, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import {
  SelectiveBloom,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { Resizer, KernelSize } from "postprocessing";

import closeIcon from "../assets/img/icon-close.svg";
import "../index.css";
import Line from "./Line.jsx";
import * as THREE from "three";

export default function Menu3D({menu, setMenu}) {
  
  const [selMesh, setSelMesh] = useState([]);  
  const [showText, setShowText] =  useState(false);
  const lightRef1 = useRef(null);
  const [animaControl, setAnimaControl] =  useState({ view: false, play: true });  

  // console.log(animaControl)
 
  const handleGotoPage = () => {
    console.log('abrir url')
    console.log(menu)
    // window.location.href = menu.currentPage.page;
  };

  const handleLoadSubPage = () => {
    console.log('carrregar sub paginas')
    const pages = menu.filter((item) => {return item.id == menu.current_id });
    console.log(pages);
    setMenu({...menu, paginasCurrent:pages  })
    console.log(menu);
    
  };

   const handleChangeStatus = () => {
    console.log('comando para fechar menu')
    setShowText(false);
    setAnimaControl({...animaControl, view: true})
    console.log(menu);
  };

  const setCloseMenu =() =>{
    console.log('fechar menu')
    setMenu({...menu, showMenuPage: false})
  }



  const handleSetMeshSel = (obj) => {
    if (obj == null) {
      setSelMesh([]);
    } else {
      setSelMesh([obj]);
    }
  };  


  const callBackControl = () => {
    switch (menu.callback) {
      case "openPage":
        handleGotoPage();
        break;
      case "openSubPage":
        handleLoadSubPage();
        break;

        
        default:
        setCloseMenu();
        break;
    }
  };



  return (
    <>
      <Canvas>
        <PerspectiveCamera
          makeDefault={true}
          far={100}
          near={0.1}
          fov={45}
          // position={[0, 2, 10]}
          position={[0, 0.1, 2.5]}
          // lookAt={[0, 0, -10]}
          lookAt={[0, 0.57, 0]}
          rotation={[0.15, 0, 0]}
        />
        <ambientLight intensity={100} ref={lightRef1} />
        <Objects3D menu={menu} setMenu={(e)=>setMenu(e)} showText={showText} setShowText={(e)=>setShowText(e)} animaControl={animaControl} setAnimaControl={setAnimaControl}  callBack={(e) => callBackControl(e) } />
        {/* <EffectComposer>
          {selMesh.length > 0 && (
            <SelectiveBloom
              lights={[lightRef1]}
              selection={selMesh}
              selectionLayer={2}
              intensity={2.0}
              blurPass={undefined}
              width={Resizer.AUTO_SIZE} // render width
              height={Resizer.AUTO_SIZE} // render height
              kernelSize={KernelSize.LARGE} // blur kernel size
              luminanceThreshold={0.1} // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing={0.025}
            />
          )}
          <Vignette eskil={false} offset={0.1} darkness={1} />
        </EffectComposer> */}
      </Canvas>
      {/* <div>
        <h2 style={{ position: "fixed", top: "50%", left: "44%" }}>
          {`status = ${menu.animaState}`}
        </h2>
        <h2 style={{ position: "fixed", top: "60%", left: "44%" }}>
          {`stage= ${menu.stage}`}
        </h2>
      </div> */}
      <div className="btn-content">
        <button onClick={() => handleChangeStatus()}>
          <img src={closeIcon} />
        </button>
      </div>
    </>
  )}

  export function Objects3D({callBack, showText, setShowText, animaControl, setAnimaControl, menu, setMenu}) {
    const centerStart = -1.8;
    const centerMiddle = -0.75;
    const centerEnd = 3.6;
    const centerSpeed = 5;

    
    const [centerImg, setCenterImage ]=  useState(centerStart);
    const [width, setWidth] = useState(null);
    
    const { nodes } = useGLTF("assets/models/scene.gltf");
    const lineMesh = useState(nodes.line_all)[0];
  

    const box = new THREE.Box3();
    box.expandByObject(nodes.line_all);
    const size = box.getSize(new THREE.Vector3());

    useEffect(() => {
      setWidth(menu.paginasCurrent.length * size.x);
    }, []);


    const materialBg = new THREE.MeshBasicMaterial();
    materialBg.color = new THREE.Color("rgb(100, 100, 100)");
    materialBg.name = "materialBg";
  
    materialBg.transparent = true;
    materialBg.opacity = 0.2;
    materialBg.side = THREE.BackSide;
  
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("assets/bg.png");
    texture.rotation = Math.PI / 2;
    materialBg.map = texture;
    
    
    const handleCallBack = ()=>{
      callBack()
      setAnimaControl({...animaControl, play: false, view: false});
    }

   
    useFrame((_, delta) => {
      if (animaControl.play || animaControl.view ) {
        
        if ( centerMiddle <= centerImg ) {
          // console.log('pausa ', [centerMiddle, centerImg]);
          // console.log(animaControl);
          setAnimaControl({...animaControl, play: false});
          setShowText(true);
        } 
     
        if( centerEnd <= centerImg){
          // console.log('final anima', [centerEnd, centerImg]);
          setAnimaControl({...animaControl, play: false, view: false});
          handleCallBack ();
        }
        
        setCenterImage(centerImg + centerSpeed * delta);
      } 
    }) 
    return <>
      <group dispose={null}>
        <mesh
          geometry={nodes.bg.geometry}
          material={materialBg}
          position={[-0.02, 0, 0]} />

        <group position-x={(width / 2) * -1 + 0.29}>
          {menu.paginasCurrent
            .filter((current) => {
              return current.show;
            })
            .map((current, index) => {
              return (
                <Line
                  key={index}
                  current={current}
                  lineMeshInput={lineMesh}
                  width={size.x}
                  // setMeshSel={(mesh) => handleSetMeshSel(mesh)}
                  centerImg={centerImg}
                  setAnimaControl={(e)=>setAnimaControl(e)}
                  animaControl={animaControl}
                  showText={showText}
                  setShowText={(e) => setShowText(e)}
                  menu={menu}
                  setMenu={(e)=>setMenu(e)}
                 />
              );
            })}
        </group>
      </group>
    </>;
  }

