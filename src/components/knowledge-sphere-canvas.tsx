import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { KnowledgeSphere } from './knowledge-sphere';

export default function KnowledgeSphereCanvas() {
  return (
    <div className="w-full h-full relative z-10" style={{ cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <KnowledgeSphere />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            rotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
