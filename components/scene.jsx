import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Earth from './earth'
import { GizmoHelper } from '@react-three/drei'

export default function Scene() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch(
      `https://api.waqi.info/v2/map/bounds?latlng=-85,-180,85,180&networks=all&token=653c9ff7e44ce4612d2d1472a0f142f5859e1e28`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className='h-full' id='canvas-container'>
      <Canvas
        orthographic
        camera={{
          zoom: 250,
          position: [0, 2, 5],
        }}>
        <GizmoHelper alignment='bottom-right' />
        <OrbitControls
          dampingFactor={0.1}
          enablePan={false}
          rotateSpeed={0.5}
          enableZoom={false}
        />
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          {/* <pointLight position={[0, 0, 4]} intensity={2} color='violet' /> */}
          <directionalLight
            castShadow
            shadow-mapSize-height={512}
            shadow-mapSize-width={512}
            position={[0, 0, 4]}
            intensity={2}
            color='violet'
          />
          <Earth data={data} />
        </Suspense>
      </Canvas>
    </div>
  )
}
