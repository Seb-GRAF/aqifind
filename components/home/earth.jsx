import { useRef, useEffect, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import * as THREE from 'three'
import gsap from 'gsap'

import globeVertexShader from '../../shaders/globe/vertex.glsl'
import globeFragmentShader from '../../shaders/globe/fragment.glsl'
import atmosphereVertexShader from '../../shaders/atmosphere/vertex.glsl'
import atmosphereFragmentShader from '../../shaders/atmosphere/fragment.glsl'

import Prism from './prism'

import { useThree } from '@react-three/fiber'

function Globe({ radius }) {
  const globeTexture = useLoader(TextureLoader, '/textures/globe.jpg')
  return (
    <mesh rotation={[0, -Math.PI / 2, 0]}>
      <sphereBufferGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        receiveShadow
        attach='material'
        args={[
          {
            vertexShader: globeVertexShader,
            fragmentShader: globeFragmentShader,
            uniforms: {
              globeTexture: { value: globeTexture },
            },
          },
        ]}
      />
    </mesh>
  )
}

function Atmosphere({ radius }) {
  return (
    <mesh>
      <sphereBufferGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        attach='material'
        args={[
          {
            vertexShader: atmosphereVertexShader,
            fragmentShader: atmosphereFragmentShader,
            side: THREE.BackSide,
            transparent: true,
          },
        ]}
      />
    </mesh>
  )
}

function Earth({ data }) {
  const earthRef = useRef()
  const [radius, setRadius] = useState(
    window.innerWidth < 640
      ? window.innerWidth / 500
      : window.innerWidth < 768
      ? window.innerWidth / 600
      : Math.min(window.innerWidth / 1300, 1)
  )

  // Resize for responsive
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

  // Listener for mouse movement and resize events
  useEffect(() => {
    const onMouseMove = (event) => {
      const { clientX, clientY } = event
      gsap.set('#tooltip', {
        x: clientX,
        y: clientY,
      })
    }

    addEventListener('mousemove', onMouseMove)
    addEventListener('resize', onWindowResize, false)

    return () => {
      removeEventListener('mousemove', onMouseMove)
      removeEventListener('resize', onWindowResize, false)
    }
  }, [])

  useFrame(() => {
    earthRef.current.rotation.y += 0.0001
  })

  return (
    <group
      ref={earthRef}
      onPointerOver={(e) => {
        e.stopPropagation()
      }}>
      <Globe radius={radius} />
      <Atmosphere radius={radius} />

      {
        // Map through the data array to create prism
        data &&
          data.map((el, i) => (
            <Prism
              radius={radius}
              key={el.station.name + i}
              lat={el.lat}
              long={el.lon}
              aqi={el.aqi}
              info={{
                name: el.station.name,
                aqi: el.aqi,
                time: el.station.time,
              }}
            />
          ))
      }
    </group>
  )
}

export default Earth
