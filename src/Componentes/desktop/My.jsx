import React, { memo, useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Text, Html} from '@react-three/drei'
import * as THREE from "three";
import Sobre from '../Sobre';


function My({ menu, animacao = "pouso" }){
  
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(menu_data.path_model + 'my.gltf')
  const { actions, names, mixer } = useAnimations(animations, group)
  const [showSobre, setShowSobre] =  useState(false);
  const [fade, SetFade] = useState(0.1)
  const [pz, setPz] = useState(10);
  
  useEffect(()=>{
    materials.caracte.roughness = 0.4   
    setTimeout(() => {
      changeAnimacao(animacao);
    }, 500);

 },[])
  

  const changeAnimacao =(anim)=>{
    if(anim){
      if(anim ==  "pouso"){
        actions[anim].clampWhenFinished = true
        actions[anim].loop = THREE.LoopOnce;
        setPz(0);
      }

      if(actions[anim]){
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





  return (
    <group ref={group} dispose={null} position={[0,pz,1]}  >
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
            <Sobre menu={menu} />
          </Html>         
        )}
      </group>
    </group>
  )
}


export default  memo(My);

useGLTF.preload( menu_data.path_model + 'my.gltf')
