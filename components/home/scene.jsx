import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Earth from './earth'
import { GizmoHelper } from '@react-three/drei'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Scene({ data }) {
  // Resize for responsive threejs
  const onWindowResize = () => {
    const width = window.innerWidth
    setRadius(
      width < 640
        ? width / 500
        : width < 768
        ? width / 600
        : Math.min(width / 1300, 1)
    )
  }
  // Listener for mouse movement
  const onMouseMove = (event) => {
    const tooltip = document.querySelector('#tooltip')
    const { clientX, clientY } = event

    if (tooltip)
      gsap.set(tooltip, {
        x: clientX - tooltip.offsetWidth - 15,
        y: clientY - tooltip.offsetHeight / 2,
      })
  }

  useEffect(() => {
    // gsap.from('#canvas-container', {
    //   duration: 3,
    //   opacity: 0,
    //   ease: 'power2',
    //   delay: 1,
    // })

    addEventListener('mousemove', onMouseMove)

    return () => {
      removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className='h-full cursor-pointer origin-center' id='canvas-container'>
      <Canvas
        // frameloop='demand'
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
}
