"use client";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    // renderer.physicallyCorrectLights = true;
    camera.position.setZ(8);
    camera.position.setY(4);
    renderer.render(scene, camera);




    //Creating light sources
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(25, 15, 5);
    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 10, 10);
    const ambientLight = new THREE.AmbientLight(0x6b0219);
    scene.add(pointLight, pointLight2, ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    //Importing GPU model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/RTX3090/RTX3090.glb",
      (gltf) => {
        scene.add(gltf.scene);
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
      }, // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
      }
    );
    let xDirection = "POSITIVE";
    let yDirection = "POSITIVE";
    let zDirection = "POSITIVE";


    function animate() {
      requestAnimationFrame(animate);


      console.log(scene.children)
      //GPU rotation, array index needs to be adjusted if more assets are added
      if (scene.children[3]) {
        if (scene.children[3].rotation.x > 0.8) xDirection = "NEGATIVE";
        else if (scene.children[3].rotation.x < 0) xDirection = "POSITIVE";

        if (xDirection === "POSITIVE") scene.children[3].rotation.x += 0.0015;
        else scene.children[3].rotation.x -= 0.0015;

        if (scene.children[3].rotation.y > 0.8) yDirection = "NEGATIVE";
        else if (scene.children[3].rotation.y < 0) yDirection = "POSITIVE";

        if (yDirection === "POSITIVE") scene.children[3].rotation.y += 0.001;
        else scene.children[3].rotation.y -= 0.001;

        if (scene.children[3].rotation.z > 0.8) zDirection = "NEGATIVE";
        else if (scene.children[3].rotation.z < 0) zDirection = "POSITIVE";

        if (zDirection === "POSITIVE") scene.children[3].rotation.z += 0.0005;
        else scene.children[3].rotation.z -= 0.0005;
      }
      controls.update();
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <canvas
      id="bg"
      className=" radial-gradient-background"
    ></canvas>
  );
};

export default ThreeCanvas;
