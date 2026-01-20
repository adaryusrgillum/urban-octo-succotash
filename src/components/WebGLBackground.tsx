import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Create particle system
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.005
      });
      
      // Red color variation
      colors[i3] = 1.0; // R
      colors[i3 + 1] = Math.random() * 0.3; // G
      colors[i3 + 2] = Math.random() * 0.2; // B
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    camera.position.z = 5;

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      const positionsArray = geometry.attributes.position.array as Float32Array;
      
      // Update particle positions
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positionsArray[i3] += velocities[i].x;
        positionsArray[i3 + 1] += velocities[i].y;
        positionsArray[i3 + 2] += velocities[i].z;
        
        // Boundary check
        if (Math.abs(positionsArray[i3]) > 10) velocities[i].x *= -1;
        if (Math.abs(positionsArray[i3 + 1]) > 10) velocities[i].y *= -1;
        if (Math.abs(positionsArray[i3 + 2]) > 5) velocities[i].z *= -1;
      }
      
      geometry.attributes.position.needsUpdate = true;
      
      // Update connections
      const linePositionsArray = lineGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      const maxDistance = 2;
      const maxConnections = 3;
      
      for (let i = 0; i < particleCount; i++) {
        let connections = 0;
        for (let j = i + 1; j < particleCount && connections < maxConnections; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          
          const dx = positionsArray[i3] - positionsArray[j3];
          const dy = positionsArray[i3 + 1] - positionsArray[j3 + 1];
          const dz = positionsArray[i3 + 2] - positionsArray[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < maxDistance) {
            linePositionsArray[lineIndex++] = positionsArray[i3];
            linePositionsArray[lineIndex++] = positionsArray[i3 + 1];
            linePositionsArray[lineIndex++] = positionsArray[i3 + 2];
            linePositionsArray[lineIndex++] = positionsArray[j3];
            linePositionsArray[lineIndex++] = positionsArray[j3 + 1];
            linePositionsArray[lineIndex++] = positionsArray[j3 + 2];
            connections++;
          }
        }
      }
      
      // Clear remaining line positions
      for (let i = lineIndex; i < linePositionsArray.length; i++) {
        linePositionsArray[i] = 0;
      }
      
      lineGeometry.attributes.position.needsUpdate = true;
      
      // Mouse influence on camera
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      
      // Rotate particle system slowly
      particles.rotation.y = time * 0.05;
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default WebGLBackground;
