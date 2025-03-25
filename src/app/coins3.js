"use client"; // Required for Next.js App Router
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const aspect = 912.08 / 593;
    const camera = new THREE.PerspectiveCamera(
        75,
        aspect,
        0.1,
        1000
      );
    camera.position.z = 4;
    const renderer = new THREE.WebGLRenderer({ alpha: true,antialias:true }); // Enable transparency
    renderer.setSize(912.08, 593);
    renderer.setClearColor(0x000000, 0); // Set background color to transparent
    mountRef.current.appendChild(renderer.domElement);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // White light, full intensity
    directionalLight.position.set(1, 2, 1); // Set light position (X, Y, Z)
    scene.add(directionalLight);
    const loader = new GLTFLoader();
    loader.load("c2.glb", function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.position.z = 2;
    });
    fetch("metallic.json")
      .then((response) => response.json())
      .then((data) => {
        const material = new THREE.MeshStandardMaterial(data);
        // Create a Cube with the Loaded Material
        const geometry = new THREE.BoxGeometry();
        const cube = new THREE.Mesh(geometry, material);
        const cube2 = new THREE.Mesh(geometry, material);
        scene.add(cube);
        scene.add(cube2);
        cube2.position.x = -2;
        cube.position.x = -2;
        // Animation Loop
        const animate = () => {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          scene.children[3].rotation.x += 0.004;
          scene.children[3].rotation.y += 0.004;
          renderer.render(scene, camera);
        };
        animate();
      })
      .catch((error) => console.error("Error loading material:", error));
    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};
export default ThreeScene;