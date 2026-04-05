import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';
import { portfolioData } from '../../constants/portfolioData';
import '../../styles/portfolio.css';

const FloatingText = ({ position, text, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.2}
          height={0.05}
          curveSegments={12}
        >
          {text}
          <meshStandardMaterial
            color={hovered ? '#FFD700' : color}
            metalness={0.5}
            roughness={0.2}
          />
        </Text3D>
      </mesh>
    </Float>
  );
};

const LoadingFallback = () => (
  <div style={{ 
    position: 'absolute', 
    top: '50%', 
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    color: 'white',
    fontSize: '1.2rem'
  }}>
    Chargement de la scène 3D...
  </div>
);

const PortfolioScene = ({ onClose }) => {
  const skillColors = ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#9370DB', '#20B2AA'];
  const serviceColors = ['#FF4500', '#FF6347', '#FF7F50', '#FF8C00', '#FFA07A'];

  return (
    <div className="portfolio-scene-container">
      <div className="scene-buttons">
        <button className="close-3d-btn" onClick={onClose}>
          Fermer la vue 3D
        </button>
        <button className="ai-assistant-btn">
          Assistance AI
        </button>
      </div>
      <div style={{ width: '100%', height: '100vh' }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            
            {/* Compétences */}
            {portfolioData.skills.map((skill, index) => (
              <Suspense key={`skill-${skill.name}`} fallback={null}>
                <FloatingText
                  position={[
                    Math.cos(index * Math.PI / 3) * 3,
                    Math.sin(index * Math.PI / 3) * 2,
                    Math.cos(index * Math.PI / 3) * 2
                  ]}
                  text={skill.name}
                  color={skillColors[index % skillColors.length]}
                />
              </Suspense>
            ))}

            {/* Services */}
            {portfolioData.services.map((service, index) => (
              <Suspense key={`service-${service.title}`} fallback={null}>
                <FloatingText
                  position={[
                    Math.cos(index * Math.PI / 3) * 3,
                    Math.sin(index * Math.PI / 3) * 2 - 1,
                    Math.cos(index * Math.PI / 3) * 2
                  ]}
                  text={service.title}
                  color={serviceColors[index % serviceColors.length]}
                />
              </Suspense>
            ))}

            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={0.6}
              panSpeed={0.5}
              rotateSpeed={0.4}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default PortfolioScene; 