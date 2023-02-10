"use client";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
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

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(25, 5, 5);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    const loader = new FBXLoader();
    loader.load(
      "/models/GPU/source/model.fbx",
      (object) => {
        scene.add(object),
          (xhr: ProgressEvent<EventTarget>) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          () => {
            console.error("error");
          };
      }
    );

    function animate() {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      controls.update();

      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <canvas id="bg"></canvas>;
};

export default ThreeCanvas;
