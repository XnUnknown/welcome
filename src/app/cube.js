"use client";

import { use, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import gsap from "gsap";
const ThreeScene = () => {
  const [mixer, setMixer] = useState(null);
  const mountRef = useRef(null);
  const mixerRef = useRef(null); // Store mixer without re-rendering
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const cubeRef = useRef(null);
  let isMouseOver = false;

  useEffect(() => {
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const aspect = 912.08 /593;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.z = 4;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias:true ,premultipliedAlpha: true }); // Enable transparency
    renderer.setSize(912.08, 593);
    renderer.setClearColor(0x000000, 0); // Set background color to transparent
    mountRef.current.appendChild(renderer.domElement);
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.outputEncoding = THREE.SRGBColorSpace;
    // const hdrLoader = new RGBELoader();
    // hdrLoader.load("nice.hdr", (texture) => {
    // texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.environment = texture; // Adds realistic reflections // Sets HDRI as scene background
    // });

    // Add Ambient and Directional Light

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight1.position.set(-2, 3, -4);
    scene.add(directionalLight1);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight1.position.set(2, 3, -4);
    scene.add(directionalLight2);
    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight1.position.set(2, -3, -4);
    scene.add(directionalLight3);
    let md;
    const loader = new GLTFLoader();
    loader.load("cube1.glb", (gltf) => {
      const model = gltf.scene;
      md = gltf.scene.children[0];
      scene.add(model);
      const mixer = new THREE.AnimationMixer(model);
      setMixer(mixer);
      md.position.z = 1;
      // Setup Animation Mixer
      // Play first animation by default
    });
    
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
      if (md) {
        if (isMouseOver) {
          md.rotation.y += 0.01;
          md.rotation.x += 0.01;
          // gsap.to(md.rotation, {
          //   x: Math.PI / 6,
          //   y: Math.PI / 6,
          //   duration: 2,
          //   ease: "power2.out",
          // });
          md.position.y += Math.sin(clock.getElapsedTime()) * 0.001;
        } else {
          // gsap.to(md.rotation, {
          //   x: 1,
          //   y: 0.5,
          //   duration: 2,
          //   ease: "power2.out",
          // });
          // md.rotation.y += 0.01;
          // md.rotation.x += 0.01;
          md.position.y += Math.sin(clock.getElapsedTime()) * 0.001;
        }
      }
    };
    animate();
    const onMouseMove = (event) => {
      // Convert mouse position to NDC (-1 to +1 range)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.current.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast to check if mouse is over the cube
      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(md, true);
      isMouseOver = intersects.length > 0;
    };
    window.addEventListener("mousemove", onMouseMove);
    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove); // Stop animations
      renderer.dispose();
    };
  }, []); // ✅ No dependency on `mixer`
  return <div ref={mountRef} />;
};
export default ThreeScene;