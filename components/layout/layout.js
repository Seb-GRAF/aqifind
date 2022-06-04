import { useEffect } from 'react'
import Nav from './nav'
import Head from 'next/head'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Layout({ children }) {
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    gsap.to('#scroll-to-top', {
      scrollTrigger: {
        trigger: 'html',
        start: 'top+=200 top',
        end: 'top+=201 top',
        scrub: 2,
      },
      bottom: '1rem',
      ease: 'power3',
    })
  }, [])

  return (
    <>
      <Head>
        <title>Air quality</title>
      </Head>

      <Nav />
      <button
        id='scroll-to-top'
        onClick={scrollToTop}
        className=' z-50 fixed -bottom-full right-4 w-12 h-12 text-xl bg-emerald-400 text-black p-2 rounded-full leading-0 shadow-md'>
        <Image
          src='/up.svg'
          alt='scroll to top icon'
          // layout='fill'
          // objectFit='contain'
          height={50}
          width={50}
        />
      </button>
      {children}
    </>
  )
}
