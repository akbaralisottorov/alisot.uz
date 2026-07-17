import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Billboard } from '@react-three/drei';
import * as THREE from 'three';

const NODES = ['Marketing', 'Brand Strategy', 'Consumer Psychology', 'Behavioral Economics', 'Political Science', 'Books'];

export function KnowledgeSphere() {
  const groupRef = useRef<THREE.Group>(null);
  
  const positions = useMemo(() => {
    const pts = [];
    const offset = 2 / NODES.length;
    const increment = Math.PI * (3 - Math.sqrt(5)); // Fibonacci increment
    
    for (let i = 0; i < NODES.length; i++) {
        const y = ((i * offset) - 1) + (offset / 2);
        const r = Math.sqrt(1 - Math.pow(y, 2));
        
        const phi = ((i + 1) % NODES.length) * increment;
        
        const x = Math.cos(phi) * r;
        const z = Math.sin(phi) * r;
        
        // Scale by radius 2.6
        pts.push(new THREE.Vector3(x * 2.6, y * 2.6, z * 2.6));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
       // Slow rotation
       groupRef.current.rotation.y += 0.002;
       
       // Mouse interaction
       const targetX = (state.pointer.x * Math.PI) / 8;
       const targetY = (state.pointer.y * Math.PI) / 8;
       
       groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
       groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {NODES.map((text, i) => (
        <Float
          key={text}
          speed={2} 
          rotationIntensity={0.5} 
          floatIntensity={1}
          position={positions[i]}
        >
          <Billboard>
            <Text
              fontSize={0.4}
              letterSpacing={0.1}
              color="#FF6B35"
              font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkGpu8PNMs46ig-JWWph2k.woff"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.03}
              outlineColor="rgba(10, 10, 10, 0.8)"
            >
              {text}
            </Text>
          </Billboard>
        </Float>
      ))}
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial color="#FF6B35" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}
