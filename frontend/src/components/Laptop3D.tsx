import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/**
 * 3D Laptop Component - Creates an animated laptop model
 * Features: Auto-rotation, responsive design, neon glow effects
 */
const LaptopMesh: React.FC = () => {
  const laptopRef = useRef<THREE.Group>(null);

  // Auto-rotation animation
  useFrame((state) => {
    if (laptopRef.current) {
      laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      laptopRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    }
  });

  return (
    <group ref={laptopRef} position={[0, 0, 0]}>
      {/* Laptop Base */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.2, 2]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          emissive="#00f5ff"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      {/* Laptop Screen */}
      <mesh position={[0, 0.9, -0.9]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[2.8, 1.8, 0.1]} />
        <meshStandardMaterial 
          color="#0a0a0f"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Screen Display */}
      <mesh position={[0, 0.9, -0.85]} rotation={[-0.2, 0, 0]}>
        <planeGeometry args={[2.6, 1.6]} />
        <meshStandardMaterial 
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, 0.02, 0.3]}>
        <boxGeometry args={[2.4, 0.02, 1.2]} />
        <meshStandardMaterial 
          color="#2a2a4e"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, 0.03, 0.8]}>
        <boxGeometry args={[0.8, 0.01, 0.6]} />
        <meshStandardMaterial 
          color="#1a1a2e"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      {/* Ambient glow effect */}
      <pointLight 
        position={[0, 0.9, -0.8]} 
        color="#00f5ff" 
        intensity={0.5} 
        distance={3}
      />
    </group>
  );
};

/**
 * Main 3D Laptop Component with Canvas wrapper
 */
const Laptop3D: React.FC = () => {
  const [hasError, setHasError] = React.useState(false);

  // Fallback component if WebGL fails
  if (hasError) {
    return (
      <motion.div 
        className="w-full h-full relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">3D Laptop</h3>
          <p className="text-muted-foreground">Interactive 3D Model</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="w-full h-full relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <React.Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading 3D Model...</p>
          </div>
        </div>
      }>
        <Canvas
          shadows
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
            preserveDrawingBuffer: false,
            premultipliedAlpha: false
          }}
          className="w-full h-full"
          onCreated={({ gl }) => {
            // Make background transparent to match hero background
            gl.setClearColor(0x000000, 0);
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
            gl.setClearAlpha(0);
          }}
          onError={(error) => {
            console.error('Canvas error:', error);
            setHasError(true);
          }}
        >
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.4} color="#00f5ff" />
        <pointLight position={[5, -5, -5]} intensity={0.3} color="#ff00aa" />
        

        
        {/* 3D Laptop Model */}
        <LaptopMesh />
        
        {/* Interactive Controls */}
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
          rotateSpeed={0.5}
        />
        </Canvas>
      </React.Suspense>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-secondary rounded-full animate-pulse-glow delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-pulse-glow delay-500" />
      </div>
    </motion.div>
  );
};

export default Laptop3D;