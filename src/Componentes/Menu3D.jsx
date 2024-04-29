import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import {
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";

import closeIcon from "../assets/img/icon-close.svg";
import closeBack from "../assets/img/icon-back.svg";
import "../index.css";
import { LinesList } from "./LinesList.jsx";
import { Stats, OrbitControls } from '@react-three/drei'





export default function Menu3D({ menu, setMenu, }) {
  const [actionControl, setActionControl] = useState(isHome ? 'idle' : "waitMenu");
  const [showBack, setShowBack] = useState(false);



  const handleChangeMenu = () => {
    const status = actionControl == "waitMenu" ? "openLines" : 'hideMenu';
    setActionControl(status)
  }

  return (
    <>
      {actionControl == 'idle' ? (
        <div className="home-pictures">
          <button onClick={() => setActionControl('openMenu')}>
            <h2>Start</h2>
          </button>
        </div>
      ) : (
        <>
          <div className={`menu-3d-content ${actionControl != 'waitMenu' ? "show" : ""}`}>
            <Canvas frameloop="demand">
              <PerspectiveCamera
                makeDefault={true}
                far={100}
                near={0.1}
                fov={45}
                position={[0, 0.04, 2.85]}
                rotation={[0.21, 0, 0]}
              />

              <LinesList menu={menu} setMenu={(e) => setMenu(e)} actionControl={actionControl} setActionControl={(e) => setActionControl(e)} setShowBack={(e) => setShowBack(e)} />

              <Environment preset="city" background blur={2} />
              <Stats showPanel={0} />
              <gridHelper />
            </Canvas>
          </div>
          <div className="btn-content">
            <button className={`back ${showBack ? "show" : ""}`} onClick={() => setActionControl('gotoHome')}>
              <img src={closeBack} />
            </button>
            <button className="open" onClick={() => handleChangeMenu()}>
              <img src={closeIcon} />
            </button>
          </div>
        </>
      )}
    </>
  )
}



