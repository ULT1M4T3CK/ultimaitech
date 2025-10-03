import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Text, Sphere, Box } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#8049cc"
        emissive="#2d1b69"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

const FloatingCubes = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Box
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
            args={[0.5, 0.5, 0.5]}
          >
            <meshStandardMaterial
              color={`hsl(${200 + i * 30}, 70%, 60%)`}
              emissive={`hsl(${200 + i * 30}, 70%, 20%)`}
            />
          </Box>
        </Float>
      ))}
    </>
  )
}

const ThreeScene = () => {
  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8049cc" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6643c5" />

        {/* 3D Objects */}
        <AnimatedSphere />
        <FloatingCubes />

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2 neon-text">
            Interactive 3D Scene
          </h3>
          <p className="text-light/70 text-sm">
            Drag to rotate • Scroll to zoom • Auto-rotating
          </p>
        </div>
      </div>
    </div>
  )
}

export default ThreeScene
