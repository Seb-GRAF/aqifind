import { useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from 'react-compare-slider'

gsap.registerPlugin(ScrollTrigger)

export default function Divider2() {
  useEffect(() => {
    gsap.from('#divider2-text', {
      scrollTrigger: {
        trigger: '#divider2-text',
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3',
    })
  }, [])

  return (
    <>
      <section className='relative px-[5vw] flex flex-col items-center bg-white mx-auto text-lg'>
        <div className='absolute top-0 left-0 w-full h-[70%] bg-neutral-200 pointer-events-none'></div>

        <div className='relative z-10 flex flex-col justify-between items-center gap-28 w-full max-w-[60rem]'>
          <h2
            id='divider2-text'
            className='text-3xl w-full md:w-1/2 lg:w-2/5 self-start text-center'>
            <b className='font-serif opacity-50'>“ </b>Covid19 showed part of
            the world what it&apos;s like living with fresh air
            <b className='font-serif opacity-50'> „</b>
          </h2>
          <div className='relative md:w-4/5 self-end before:absolute before:content-[""] before:w-full before:h-full before:-top-2 before:-left-2 before:outline before:outline-black/5'>
            <ReactCompareSlider
              handle={
                <ReactCompareSliderHandle
                  buttonStyle={{
                    WebkitBackdropFilter: undefined,
                    backdropFilter: undefined,
                    backgroundColor: 'white',
                    border: 0,
                    boxShadow: undefined,
                    color: '#444',
                  }}
                  linesStyle={{ opacity: 0.5 }}
                />
              }
              position={20}
              itemOne={
                <ReactCompareSliderImage
                  src='/pictures/before.jpg'
                  alt='Image one'
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src='/pictures/after.jpg'
                  alt='Image two'
                  className='after:absolute after:bottom-0 after:left-0 after:content-["BEFORE"] after:w-full after:h-full after:text-white'
                />
              }
            />
          </div>
        </div>
      </section>
    </>
  )
}
