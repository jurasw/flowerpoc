import { Bounds, Environment, Html, OrbitControls, useGLTF, useProgress } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Group } from 'three'

interface RoseSceneProps {
  className?: string
  autoRotate?: boolean
}

function RoseLoader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <p className="text-sm text-rose-200/80">
        Loading rose… {Math.round(progress)}%
      </p>
    </Html>
  )
}

function RoseModel({ autoRotate }: { autoRotate: boolean }) {
  const { scene } = useGLTF('/red_rose.glb')
  const groupRef = useRef<Group>(null)

  const model = useMemo(() => {
    return scene
  }, [scene])

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  )
}

function SceneContent({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight args={['#ffdfe5', '#1a0a10', 0.7]} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} castShadow />
      <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#ff8fa3" />
      <spotLight position={[0, 6, 2]} angle={0.5} penumbra={1} intensity={1.4} />

      <Suspense fallback={<RoseLoader />}>
        <Bounds fit clip observe margin={1.2}>
          <RoseModel autoRotate={autoRotate} />
        </Bounds>
        <Environment preset="sunset" />
      </Suspense>

      <OrbitControls
        autoRotate={false}
        enablePan={false}
        enableZoom={false}
        makeDefault
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.9}
      />
    </>
  )
}

export function RoseScene({ className, autoRotate = true }: RoseSceneProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    void useGLTF.preload('/red_rose.glb')
  }, [])

  if (!mounted) {
    return (
      <div
        className={`flex h-full min-h-[360px] w-full items-center justify-center ${className ?? ''}`}
      >
        <p className="text-sm text-rose-200/70">Loading rose...</p>
      </div>
    )
  }

  return (
    <div className={`relative h-full min-h-[360px] w-full ${className ?? ''}`}>
      <Canvas
        className="h-full w-full"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        style={{ width: '100%', height: '100%' }}
        camera={{ fov: 40, near: 0.01, far: 100, position: [0, 0.5, 5] }}
      >
        <SceneContent autoRotate={autoRotate} />
      </Canvas>
    </div>
  )
}
