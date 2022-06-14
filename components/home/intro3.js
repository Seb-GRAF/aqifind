import { useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Intro2() {
  useEffect(() => {
    gsap.from('#intro3-text', {
      scrollTrigger: {
        trigger: '#intro3-text',
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3',
    })
  }, [])

  return (
    <>
      <section className='py-28 md:pb-40 px-[5vw] flex flex-col items-center justify-center bg-white relative mx-auto text-lg'>
        <div
          id='intro3-text'
          className='flex flex-col items-center justify-center gap-6 max-w-[60rem]'>
          <h3 className='text-3xl text-left md:text-center'>
            Lockdowns cause global air pollution to decline
          </h3>
          <p className=''>
            The global response to the COVID-19 pandemic has resulted in
            unprecedented reductions in economic activity. We find that, after
            accounting for meteorological variations, lockdown events have
            reduced the population-weighted concentration of nitrogen dioxide
            and particulate matter levels by about 60% and 31% in 34 countries,
            with mixed effects on ozone. Reductions in transportation sector
            emissions are largely responsible for the NO2 anomalies.
          </p>
        </div>
      </section>
    </>
  )
}
