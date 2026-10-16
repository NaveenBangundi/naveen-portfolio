import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070913, 0.002);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Floating 3D Wireframe Icosahedron Core
    const icoGeometry = new THREE.IcosahedronGeometry(22, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    icoMesh.position.set(30, 5, -20);
    mainGroup.add(icoMesh);

    // Inner glowing core
    const innerGeo = new THREE.OctahedronGeometry(12, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x9d4edd,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    icoMesh.add(innerMesh);

    // 2. Secondary Floating Tech Ring / Torus Knot
    const torusGeo = new THREE.TorusGeometry(18, 1.2, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x4facfe,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-35, -15, -30);
    torusMesh.rotation.x = Math.PI / 3;
    mainGroup.add(torusMesh);

    // 3. Stardust Particle Cloud
    const particleCount = 1200;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f2fe);
    const purpleColor = new THREE.Color(0x9d4edd);
    const blueColor = new THREE.Color(0x4facfe);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 240;
      posArray[i + 1] = (Math.random() - 0.5) * 200;
      posArray[i + 2] = (Math.random() - 0.5) * 160;

      const pick = Math.random();
      const chosenColor = pick < 0.4 ? cyanColor : pick < 0.7 ? purpleColor : blueColor;
      colorArray[i] = chosenColor.r;
      colorArray[i + 1] = chosenColor.g;
      colorArray[i + 2] = chosenColor.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    mainGroup.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f2fe, 2, 100);
    pointLight.position.set(0, 0, 40);
    scene.add(pointLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate meshes
      icoMesh.rotation.x = elapsedTime * 0.15;
      icoMesh.rotation.y = elapsedTime * 0.2;
      innerMesh.rotation.y = -elapsedTime * 0.3;

      torusMesh.rotation.z = elapsedTime * 0.1;
      torusMesh.rotation.y = elapsedTime * 0.08;

      particlesMesh.rotation.y = elapsedTime * 0.02;

      // Parallax effect on main group
      mainGroup.rotation.y = targetX * 0.25;
      mainGroup.rotation.x = -targetY * 0.2;

      // Interactive Point Light tracking
      pointLight.position.x = targetX * 40;
      pointLight.position.y = targetY * 40;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      icoGeometry.dispose();
      icoMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div id="webgl-canvas-container" ref={containerRef} />;
}
