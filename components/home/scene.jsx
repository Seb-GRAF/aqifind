import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Earth from './earth'
import { GizmoHelper } from '@react-three/drei'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Scene() {
  const [data, setData] = useState()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch(
      `https://api.waqi.info/v2/map/bounds?latlng=-85,-180,85,180&networks=all&token=${process.env.NEXT_PUBLIC_AQICN_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res.data)
      })
      .then(() => {
        setLoaded(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    loaded && (
      <div
        className='h-full cursor-pointer origin-center'
        id='canvas-container'>
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
            <Earth data={data} />
          </Suspense>
        </Canvas>
      </div>
    )
  )
}
