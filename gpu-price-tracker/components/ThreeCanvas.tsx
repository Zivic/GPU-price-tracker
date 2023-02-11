"use client";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useEffect } from "react";
import { Vector3 } from "three";

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
    camera.position.setZ(30);

    renderer.render(scene, camera);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.y = -20;

    scene.add(torus);

    const pointLight = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(25, 15, 5);
    const pointLight2 = new THREE.PointLight(0xffffff, 3);
    pointLight.position.set(0, 10, 10);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(pointLight,pointLight2, ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    // const loader = new FBXLoader();
    // loader.load("/models/GPU/source/model.fbx", (object) => {
    //   scene.add(object),
    //     (xhr: ProgressEvent<EventTarget>) => {
    //       console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //     },
    //     () => {
    //       console.error("error");
    //     };
    // });
    var model: any

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      "/models/RTX3090/RTX3090.glb",
      (gltf) => {
        model = gltf;
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

    function animate() {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.005;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.002;

      // if(model && model.rotation){
      //   model.rotation.x += 0.005;
      //   model.rotation.y += 0.005;
      //   model.rotation.z += 0.002;
      // }
      if(scene.children[4]){
      scene.children[4].rotation.x += 0.005;
      scene.children[4].rotation.y += 0.005;
      scene.children[4].rotation.z += 0.0005;
      }
      controls.update();

      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <canvas
      id="bg"
      className="bg-gradient-to-b from-cyan-400  to-purple-700"
    ></canvas>
  );
};

export default ThreeCanvas;
