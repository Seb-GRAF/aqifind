import { Suspense, useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Earth from './earth'
import { GizmoHelper } from '@react-three/drei'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Scene({ data }) {
  const [frameLoop, setFrameLoop] = useState('always')

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
    // disables globe animation when past the first section
    ScrollTrigger.create({
      trigger: '#canvas-container',
      start: 'bottom top+=20%',
      end: 'bottom top+=20%',
      onEnter: () => {
        setFrameLoop('demand')
      },

      onEnterBack: () => {
        setFrameLoop('always')
      },
    })

    gsap.to('#canvas-container', {
      duration: 3,
      opacity: '1',
      ease: 'power3.out',
    })

    gsap.set('#preloader', {
      opacity: '0',
      onComplete: () => {
        if (document.querySelector('#preloader'))
          document.querySelector('#preloader').style.pointerEvents = 'none'
      },
    })

    addEventListener('mousemove', onMouseMove)

    return () => {
      removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div
      className='h-full cursor-pointer origin-center opacity-0'
      id='canvas-container'>
      <Canvas
        frameloop={frameLoop}
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
