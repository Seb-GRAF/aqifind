import { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Divider() {
  useEffect(() => {
    // gsap.from('#divider img', {
    //   scrollTrigger: {
    //     trigger: '#divider',
    //   },
    //   scale: 1.2,
    //   duration: 3,
    //   ease: 'power3',
    // })

    gsap.to('#card', {
      scrollTrigger: {
        trigger: '#card',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
      },
      y: '-50%',
    })
  }, [])

  return (
    <section
      id='divider'
      className='relative w-full flex items-center justify-center py-16 md:py-28 bg-white'>
      <div className='z-10 relative flex items-center justify-center w-[90vw] h-[25rem] sm:h-[40rem] max-w-[80rem] margin-auto'>
        <div className='w-10/12 h-full sm:h-5/6 absolute left-0 top-0 '>
          <figure
            id='divider'
            className='relative w-full h-full max-h-full max-w-full '>
            <Image
              src='/pictures/1.jpg'
              alt='air pollution'
              layout='fill'
              objectFit='cover'
              priority={true}
            />
          </figure>
        </div>
        <div
          id='card'
          className='absolute -bottom-16 sm:bottom-8 md:-bottom-16 right-0 md:w-1/2 w-10/12 bg-emerald-400 flex flex-col gap-4 sm:gap-8 items-center justify-between py-6 px-8 shadow-xl
  '>
          <p className='leading-8 leading font-medium text-lg sm:text-xl self-start sm:mr-8 mr-4'>
            Air pollution is one of the world’s leading risk factors for health.
            <br />
            It is attributed to 11.65% of death globally, which equates to
            millions of people each year.
          </p>
          <cite className='self-end ml-8'>
            <a
              href='https://ourworldindata.org/air-pollution'
              target='_blank'
              rel='noreferrer'>
              ourworldindata.org
            </a>
          </cite>
        </div>
      </div>
      <figure className='absolute left-0 top-0 w-full h-full bg-blue text-blue opacity-10 pointer-events-none'>
        <Image
          src='/svg/shadows.svg'
          alt='decoration'
          layout='fill'
          width={96}
          height={96}
          objectFit='cover'
          priority={true}
          className='max-w-full'
        />
      </figure>
    </section>
  )
}
