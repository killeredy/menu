import { useEffect, useState, useCallback } from "react";
import Line from "./Line";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import My from "../My.jsx"
import { AnimaePause } from "../AnimePause.jsx";



export function LinesList({
  menu,
  actionControl,
  setActionControl,
  setShowBack,
  startAnima,
  setStartAnima,
  pause,
  SetPause,
  showText,
  setShowText

}) {
  const officePause =  AnimaePause();

  const steps = 1;
  

  const [offset, setOffset] = useState(officePause.start);
  // const [width, setWidth] = useState(null);
  const [listPages, setListPages] = useState(menu.paginasCurrent);
  const [nextListPages, setNextListPages] = useState([]);
  const [urlPage, setUrlPage] = useState('');
  const [selBlur, setSelBlur] = useState(null);
  const [animacao, setAnimacao] = useState('wait');
  const [size, setSize] = useState({});
  

  
  const widthScale = 1.5;

  const { nodes } = useGLTF( menu_data.path_model +  "scene.gltf");
  const lineMesh = useState(nodes.lines)[0];

  const alphaMap = useTexture( menu_data.path_assets + "img/mask.jpg");
  alphaMap.repeat.set(1, 0.28)
  alphaMap.center.set(0.5, 0.09)
  alphaMap.offset.set(1, offset)
  
  
  useFrame((_, delta) => {

    if (startAnima) {
      if (offset <= pause) {
        setOffset(offset + steps * delta);
      } else {
        setStartAnima(false);
        switch (actionControl) {
          case 'closeMenu':
            CloseMenu("closeMenu");
            break;

          case 'gotoHome':
            gotoHome("waitMenu");
            break;

          case 'hideMenu':
            CloseMenu("waitMenu");
            break;

          case 'openLines':
            OpenLines();
            break;

          case 'openSubPage':
            OpenSubPage();
            break;

          case 'openPage':
            OpenPage();
            break;

          default:
            break;
        }

      }

    }

  });

  const gotoHome = () => {
  
    setOffset(officePause.start);
    SetPause(officePause.idle);
    setStartAnima(true);
    
    setShowBack(false);
    setListPages(menu.listPaginas)
    setActionControl('openLines');
  }

  const OpenLines = () => {
    setOffset(officePause.idle);
    SetPause(officePause.end);

    setActionControl('wait')
    setAnimacao("pouso");
    setShowText(true);
  }


  const CloseMenu = (nextAction) => {
    startResetAnimation(false)

    setShowText(false);
    setActionControl(nextAction)
  }

  const OpenSubPage = () => {
    setOffset(officePause.start);
    SetPause(officePause.idle);
    setStartAnima(true);
    setListPages(nextListPages)
    setActionControl('openLines');
    setShowBack(true);
  }

  const OpenPage = () => {
    setStartAnima(true);
    setActionControl('waitOpenPage')
    window.location.href = urlPage;
    setShowBack(false);
  }



  useEffect(() => {
    const box = new THREE.Box3();
    box.expandByObject(nodes.lines);
    const newSize = box.getSize(new THREE.Vector3());
    newSize.x *= widthScale;
    const newWidth = (menu.paginasCurrent.length - 1) * (newSize.x)


    setWidth(newWidth);
    setSize(newSize);
    setTimeout(() => {
      setOffset(pause);
      setStartAnima(true);
      setActionControl('openLines');
    }, 200)
  }, []);


  

  const resetWidth = () => {
    return listPages.length * size.x * -0.5 + (size.x / 2);
  }

  const startResetAnimation = (reset) => {
    setOffset(officePause.start);
    SetPause(officePause.idle);

    if (reset) {
      setStartAnima(false);
    }

  }


  const handleSetPage = (target) => {
    SetPause(officePause.end)
    setOffset(officePause.idle)
    setShowText(false);
    setAnimacao("lookAraond")
    setStartAnima(true);
    if (target.page_id == 0) {
      setNextListPages(target.pagesList);
      setActionControl('openSubPage');

    } else {
      setUrlPage(target.page);
      setActionControl('openPage');
    }
  }

  const handleSetBlur = (show, selMesh) => {
    const newMesh = show ? selMesh : null;
    setSelBlur(newMesh);
  }


  const handleSobre = (sobre) => {
    setStartAnima(true);
    setShowText(false);
    setUrlPage(sobre.page);
    setActionControl('openPage');
  };

  const handleAnimacao = useCallback((e) => {
    setAnimacao(e)
  }, [animacao]);

  return (
    <>
      <group dispose={null}>
        <meshBasicMaterial map={alphaMap} />
        <group position-x={resetWidth()}  >
          {listPages
            .map((current, index) => {
              return (
                <group key={index}>
                  {current.show && (
                    <Line
                      current={current}
                      lineMeshInput={lineMesh}
                      // width={size.x}
                      showText={showText}
                      mask={alphaMap}
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
      {animacao != 'wait' && (
        <My sobreData={menu} setSobre={(e) => handleSobre(menu.sobre)} animacao={animacao} setAnimacao={handleAnimacao} />
      )}
      <ambientLight intensity={2}  />
    </>);
}


useGLTF.preload( menu_data.path_model + 'scene.gltf')