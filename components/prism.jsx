import { useLoader, useFrame, useThree } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import moment from 'moment'

const colors = {
  hazardous: 0xaa74cf,
  veryUnhealthy: 0x978ed1,
  unhealthy: 0x83a9d4,
  high: 0x70c3d6,
  moderate: 0x5cded9,
  good: 0x49f8db,
}

export default function Prism({ lat, long, aqi, info, radius }) {
  const prismRef = useRef()
  let [properties, setProperties] = useState({
    height: 0,
    width: 0,
    color: colors.good,
    x: Math.cos((lat / 180) * Math.PI) * Math.sin((long / 180) * Math.PI),
    y: Math.sin((lat / 180) * Math.PI),
    z: Math.cos((lat / 180) * Math.PI) * Math.cos((long / 180) * Math.PI),
  })

  // Set parameters of mesh based on data
  const setParameters = () => {
    if (aqi === NaN || aqi === undefined || aqi === '-') return

    setProperties((prevState) => ({
      ...prevState,
      height: Math.min(aqi / 2000, 0.1 + Math.random() * 0.1),

      width:
        aqi >= 301
          ? 0.017
          : aqi >= 201
          ? 0.013
          : aqi >= 151
          ? 0.011
          : aqi >= 101
          ? 0.01
          : aqi >= 51
          ? 0.008
          : 0.006,

      color:
        aqi >= 301
          ? colors.hazardous
          : aqi >= 201
          ? colors.veryUnhealthy
          : aqi >= 151
          ? colors.unhealthy
          : aqi >= 101
          ? colors.high
          : aqi >= 51
          ? colors.moderate
          : colors.good,
    }))

    prismRef.current.lookAt(0, 0, 0)
    prismRef.current.name = info.name
    prismRef.current.aqi = info.aqi
    prismRef.current.time = info.time

    if (prismRef.current) {
      const prism = prismRef.current
      gsap.from(prism.scale, {
        duration: 1,
        z: 0,
        ease: 'power2',
        onComplete: () => {
          gsap.to(prism.scale, {
            duration: 2,
            z: 1.4,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut',
            delay: Math.random(),
          })
        },
      })
    }
  }
  // Displays tooltip
  const onPointerEnter = (e) => {
    const { name, aqi, time } = e.object
    document.querySelector('#tooltip-name').innerHTML = `Station: ${name}`
    document.querySelector('#tooltip-aqi').innerHTML = `${aqi} AQI (${
      aqi >= 301
        ? 'Hazardous'
        : aqi >= 201
        ? 'Very unhealthy'
        : aqi >= 151
        ? 'Unhealthy'
        : aqi >= 101
        ? 'High'
        : aqi >= 51
        ? 'Moderate'
        : 'Good'
    }) `
    document.querySelector('#tooltip-time').innerHTML = `${moment(time).format(
      'hh:mm A - MMMM DD YYYY'
    )}`

    gsap.set('#tooltip', {
      display: 'flex',
    })
  }
  // Hides tooltip
  const onPointerLeave = (e) => {
    gsap.set('#tooltip', {
      display: 'none',
    })
  }

  useEffect(setParameters, [])
  return (
    <mesh
      position={[
        radius * properties.x,
        radius * properties.y,
        radius * properties.z,
      ]}
      ref={prismRef}
      onPointerOver={onPointerEnter}
      onPointerOut={onPointerLeave}>
      <boxBufferGeometry
        args={[
          radius * properties.width,
          radius * properties.width,
          radius * properties.height,
        ]}
      />
      <meshStandardMaterial
        color={properties.color}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  )
}
