import { Canvas } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import  {LinesList } from "./LinesList.jsx";
import { Bloom,  EffectComposer } from "@react-three/postprocessing";
import {  KernelSize, Resolution } from 'postprocessing'
import Line from "./Line.jsx";



export default function MenuDesktop() {

  
  return (
    
      <Canvas >
        <PerspectiveCamera
          makeDefault={true}
          far={100}
          near={0.1}
          fov={45}
          position={[0, 0.04, 2.85]}
          rotation={[0.21, 0, 0]}
        />
        <LinesList />
        <EffectComposer>
          <Environment preset="city" blur={1} />
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
    
  )
}



