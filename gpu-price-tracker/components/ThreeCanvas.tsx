"use client"
import * as THREE from "three";
import React, { useEffect } from "react";
const ThreeCanvas = () => {
  useEffect(() => {
    //Initialization of ThreeJS canvas
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg")!,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    renderer.render(scene, camera);
  }, []);

  return(
    <canvas id="bg">
    </canvas>)
};

export default ThreeCanvas;
