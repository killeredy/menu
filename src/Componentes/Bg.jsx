/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.14 line.gltf --transfor 
*/
import { useLoader, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";

export default function Bg({ nodes, materials, finalizar, start }) {
  useFrame((_, delta) => {});

  return <mesh geometry={nodes.bg.geometry} material={materials.Material} />;
}
