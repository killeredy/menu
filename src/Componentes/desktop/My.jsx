import React, { memo, useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Text, Html} from '@react-three/drei'
import * as THREE from "three";
import Sobre from '../Sobre';


function My({sobreData, setSobre, animacao = "pouso" }){
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(menu_data.path_model + 'my.gltf')
  const { actions, names, mixer } = useAnimations(animations, group)
  const [showSobre, setShowSobre] =  useState(false);
  const { sobre } = sobreData;
  const [fade, SetFade] = useState(0.1)
  const [pz, setPz] = useState(10);

  

  
  useEffect(()=>{
    materials.caracte.roughness = 0.4
    console.log("show mey")
    
    
    setTimeout(() => {
      changeAnimacao(animacao);
    }, 1500);


  },[])
  

  const changeAnimacao =(anim)=>{
    if(anim){
      if(anim ==  "pouso"){
        actions[anim].clampWhenFinished = true
        actions[anim].loop = THREE.LoopOnce;
        setPz(0);
      }

      if(actions[anim]){
        console.log(fade)
        actions[anim]?.reset()?.fadeIn(fade)?.play();    
        mixer.addEventListener('finished', (e) =>{
          SetFade(0.5)
          setShowSobre(true);    
          actions.ide.reset().fadeIn(0.5).play();
        });
      }
  

    }
  }

  if(animacao != 'pouso'){
    changeAnimacao(animacao);
  }


  const handleSetSobre =()=>{
    if(setSobre){
      setSobre();
    }
  }



  return (
    <group ref={group} dispose={null} position={[0,pz,1]} onPointerDown={(e)=> handleSetSobre()} >
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />          
          <skinnedMesh 
            name="body" 
            geometry={nodes.body.geometry} 
            material={materials.caracte} 
            skeleton={nodes.body.skeleton}  

            />
        </group>
        {showSobre && (
           <Html position={[0, 0, 0]} wrapperClass="sobre-container" transform distanceFactor={1.0}   >              
            {/* <Sobre /> */}
          </Html>         
        )}
      </group>
    </group>
  )
}


export default  memo(My);

useGLTF.preload( menu_data.path_model + 'my.gltf')
