import { useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Intro2() {
  return (
    <>
      <section className='py-28 md:pb-40 px-[5vw] flex flex-col items-center justify-center bg-white relative mx-auto text-lg'>
        <div className='md:min-h-[40rem] flex flex-col-reverse items-center gap-24 md:gap-0 md:flex-row w-full max-w-[80rem]'></div>
      </section>
    </>
  )
}
