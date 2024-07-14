import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment,  PerspectiveCamera } from "@react-three/drei";
import { LinesList } from "./LinesList.jsx";
import { AnimaePause } from "../AnimePause.jsx";
import BtnStart from "../BtnStart.jsx";
import BtnOpenClose from "../BtnOpenClose.jsx";
import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing'



export default function MenuDesktop({ menu, setMenu, }) {
  const officePause =  AnimaePause();
  const [actionControl, setActionControl] = useState(menu_data.is_home ? 'idle' : "waitMenu");
  const [showBack, setShowBack] = useState(false);
  const [startAnima, setStartAnima ] =  useState(true);
  const [pause, SetPause] =  useState(officePause.idle)
  const [showText, setShowText] =  useState(false);
  const [openMenu, setOpenMenu] = useState(true)
  const [subMenu, setSubMenu] =  useState(false);


  const handleChangeMenu = () => {
    const status = actionControl == "waitMenu" ? "openLines" : 'hideMenu';
    setStartAnima(true);
    setActionControl(status);
    setShowText(false);
    setOpenMenu(!openMenu)
  }

  const handleBackMenu = () => {
    setActionControl('gotoHome')
    setStartAnima(true);
    setShowText(false);
  }


  return (
    <>
      {actionControl == 'idle' ? (
          <BtnStart  setActionControl={(e) => setActionControl(e)} />
      ) : (
        <>
          <div className={`menu-3d-content ${actionControl != 'waitMenu' ? "show" : ""}  ${subMenu ? "menu-principal" :  "menu-sub"}`}>
            
            <Canvas >            
              <PerspectiveCamera
                makeDefault={true}
                far={100}
                near={0.1}
                fov={45}
                position={[0, 0.04, 2.85]}
                rotation={[0.21, 0, 0]}
              />
              <LinesList 
                  menu={menu} 
                  setMenu={(e) => setMenu(e)} 
                  actionControl={actionControl}
                  setActionControl={(e) => setActionControl(e)}
                  setShowBack={(e) => setShowBack(e)}
                  startAnima={startAnima}
                  setStartAnima={(e) => setStartAnima(e)}
                  pause={pause}
                  SetPause={(e) => SetPause(e)}
                  showText={showText}
                  setShowText={(e)=> setShowText(e)}
                  />   
                  <EffectComposer>
                  <Environment preset="city" blur={1}  />
                      <Bloom 
                            intensity={1.0} 
                            blurPass={undefined} 
                            kernelSize={KernelSize.LARGE} 
                            luminanceThreshold={0.9} 
                            luminanceSmoothing={0.025} 
                            mipmapBlur={false} 
                            resolutionX={Resolution.AUTO_SIZE} 
                            resolutionY={Resolution.AUTO_SIZE} 
                      />
                  </EffectComposer>  
                  
            </Canvas>
          </div>
          <BtnOpenClose showBack={showBack} handleBackMenu={(e)=>handleBackMenu(e) } openMenu={openMenu} handleChangeMenu={(e)=>handleChangeMenu(e)} />
        </>
      )}
    </>
  )
}



