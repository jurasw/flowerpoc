import { Html, OrbitControls, useGLTF, useProgress } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { Group } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

import {
  fitRoseModelToViewport,
  resetRoseModelTransform,
} from '#/lib/fitRoseModel'
import {
  getRoseFrameSettings,
  getRoseInitialOrientation,
  getRoseEntranceScale,
  roseEntranceDurationSeconds,
  type RoseFrameSettings,
} from '#/lib/roseFrame'
import { roseModelUrl } from '#/lib/roseModel'

export interface RoseSceneCanvasProps {
  className?: string
  autoRotate?: boolean
  fillRatio?: number
  verticalFocus?: number
  frameSettings?: RoseFrameSettings
}

useGLTF.preload(roseModelUrl)

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

function RoseModel({
  autoRotate,
  frame,
}: {
  autoRotate: boolean
  frame: RoseFrameSettings
}) {
  const { scene } = useGLTF(roseModelUrl)
  const groupRef = useRef<Group>(null)
  const targetScaleRef = useRef(1)
  const entranceProgressRef = useRef(0)
  const isEntranceCompleteRef = useRef(false)
  const hasInitialOrientationRef = useRef(false)
  const { viewport } = useThree()

  useLayoutEffect(() => {
    const group = groupRef.current
    if (!group) {
      return
    }

    fitRoseModelToViewport(scene, group, viewport, frame)
    targetScaleRef.current = group.scale.x

    if (!hasInitialOrientationRef.current) {
      const { leanX, leanZ, startYaw } = getRoseInitialOrientation()
      group.rotation.set(leanX, startYaw, leanZ)
      hasInitialOrientationRef.current = true
    }

    if (isEntranceCompleteRef.current) {
      group.scale.setScalar(targetScaleRef.current)
    } else {
      group.scale.setScalar(
        getRoseEntranceScale(
          entranceProgressRef.current,
          targetScaleRef.current,
        ),
      )
    }

    return () => {
      resetRoseModelTransform(scene, group)
      hasInitialOrientationRef.current = false
    }
  }, [scene, viewport, frame])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (!group) {
      return
    }

    if (!isEntranceCompleteRef.current) {
      entranceProgressRef.current = Math.min(
        1,
        entranceProgressRef.current + delta / roseEntranceDurationSeconds,
      )
      group.scale.setScalar(
        getRoseEntranceScale(
          entranceProgressRef.current,
          targetScaleRef.current,
        ),
      )

      if (entranceProgressRef.current >= 1) {
        isEntranceCompleteRef.current = true
        group.scale.setScalar(targetScaleRef.current)
      }
    }

    if (autoRotate) {
      group.rotation.y += delta * 0.35
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

function RoseOrbitControls() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const { azimuthAngle, polarAngle } = getRoseInitialOrientation()

  useLayoutEffect(() => {
    const controls = controlsRef.current
    if (!controls) {
      return
    }

    controls.setAzimuthalAngle(azimuthAngle)
    controls.setPolarAngle(polarAngle)
    controls.update()
  }, [azimuthAngle, polarAngle])

  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={false}
      enablePan={false}
      enableZoom={false}
      makeDefault
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.9}
      target={[0, 0, 0]}
    />
  )
}

function SceneContent({
  autoRotate,
  frame,
}: {
  autoRotate: boolean
  frame: RoseFrameSettings
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <hemisphereLight args={['#ffdfe5', '#1a0a10', 0.7]} />
      <directionalLight position={[4, 6, 4]} intensity={2.2} />
      <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#ff8fa3" />
      <spotLight position={[0, 6, 2]} angle={0.5} penumbra={1} intensity={1.4} />

      <Suspense fallback={<RoseLoader />}>
        <RoseModel autoRotate={autoRotate} frame={frame} />
      </Suspense>

      <RoseOrbitControls />
    </>
  )
}

function useRoseFrameSettings(
  frameSettings?: RoseFrameSettings,
  fillRatio?: number,
  verticalFocus?: number,
) {
  const [responsiveFrame, setResponsiveFrame] = useState(() =>
    getRoseFrameSettings(false),
  )

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')

    const update = () => {
      setResponsiveFrame(getRoseFrameSettings(media.matches))
    }

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const baseFrame = frameSettings ?? responsiveFrame
  const resolvedFillRatio = fillRatio ?? baseFrame.fillRatio
  const resolvedVerticalFocus = verticalFocus ?? baseFrame.verticalFocus

  return useMemo(
    () => ({
      fillRatio: resolvedFillRatio,
      verticalFocus: resolvedVerticalFocus,
    }),
    [resolvedFillRatio, resolvedVerticalFocus],
  )
}

export function RoseSceneCanvas({
  className,
  autoRotate = true,
  fillRatio,
  verticalFocus,
  frameSettings,
}: RoseSceneCanvasProps) {
  const frame = useRoseFrameSettings(frameSettings, fillRatio, verticalFocus)
  const rootClassName = ['relative h-full w-full', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootClassName}>
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        camera={{ fov: 32, near: 0.01, far: 100, position: [0, 0, 3.1] }}
      >
        <SceneContent autoRotate={autoRotate} frame={frame} />
      </Canvas>
    </div>
  )
}
