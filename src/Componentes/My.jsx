import React, { memo, useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, Text, Html} from '@react-three/drei'
import * as THREE from "three";


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
    changeAnimacao(animacao);
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
              <button onClick={(e) => handleSetSobre(e)} style={{display: "block", margin: "auto"}} > <h3> { sobre.title }</h3></button>              
              <div className='btns-social-media'>
                {(sobre.social_media.length > 0) && (
                  <div key={0} style={{display: 'flex', gap: '0.8rem', marginTop: "0.5rem"}}>
                    {sobre.social_media.map((elem, index) =>{
                      return(
                        <div key={index} >
                          <a  href={elem.url} target={"_blank"} rel="noopener noreferrer">
                            <img src={elem.img} alt="" title={elem.label} height={'50'} />
                          </a>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
          </Html>         
        )}
      </group>
    </group>
  )
}


export default  memo(My);

useGLTF.preload( menu_data.path_model + 'my.gltf')
