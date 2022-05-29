import { useRef, useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import * as THREE from 'three'
import gsap from 'gsap'

import globeVertexShader from '../shaders/globe/vertex.glsl'
import globeFragmentShader from '../shaders/globe/fragment.glsl'
import atmosphereVertexShader from '../shaders/atmosphere/vertex.glsl'
import atmosphereFragmentShader from '../shaders/atmosphere/fragment.glsl'

import Prism from './prism'

import { useThree } from '@react-three/fiber'

function Globe({ radius }) {
  const globeTexture = useLoader(TextureLoader, '/textures/globe3.jpg')
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
  const [radius, setRadius] = useState(1)
  const { camera } = useThree()

  const onWindowResize = () => {
    const width = window.innerWidth
    // camera.zoom = width < 768 ? width / 2 : Math.min(width / 5, 250)
    setRadius(
      width < 640
        ? width / 500
        : width < 768
        ? width / 600
        : Math.min(width / 1300, 1)
    )
  }

  useEffect(() => {
    window.addEventListener('resize', onWindowResize, false)

    return () => window.removeEventListener('resize', onWindowResize, false)
  }, [])

  useEffect(() => {
    const onMouseMove = (event) => {
      const { clientX, clientY } = event
      gsap.set('#tooltip', {
        x: clientX,
        y: clientY,
      })
    }
    addEventListener('mousemove', onMouseMove)

    return () => {
      removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <group
      ref={earthRef}
      onPointerOver={(e) => {
        e.stopPropagation()
      }}>
      <Globe radius={radius} />
      <Atmosphere radius={radius} />
      {data
        ? data.map((el, i) => (
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
        : ''}
    </group>
  )
}

export default Earth
