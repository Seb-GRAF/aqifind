import { useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'

gsap.registerPlugin(ScrollTrigger)

export default function Divider2() {
  return (
    <>
      <section className='relative px-[5vw] flex flex-col items-center bg-white mx-auto text-lg'>
        <div className='absolute top-0 left-0 w-full h-[20rem] sm:h-[25rem] lg:h-[30rem] bg-neutral-100 pointer-events-none'></div>

        <div className='relative z-10 flex flex-col-reverse justify-between items-center md:flex-row w-full max-w-[80rem] h-[26rem] sm:h-[35rem] md:h-[50rem] lg:h-[60rem]'>
          <h2 className='absolute left-0 top-0 text-3xl w-full md:w-1/2 lg:w-2/5 self-start text-center'>
            <b className='font-serif opacity-50'>“ </b>Covid19 showed part of
            the world what it&apos;s like living with fresh air
            <b className='font-serif opacity-50'> „</b>
          </h2>
          <div className='md:w-4/5 absolute right-0'>
            <ReactCompareSlider
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
