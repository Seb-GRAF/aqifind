import { useEffect, useState } from 'react'
import Nav from './nav'
import Head from 'next/head'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Layout({ children }) {
  const [path, setPath] = useState('/')
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    setPath(location.pathname)
    gsap.from('#scroll-to-top', {
      scrollTrigger: {
        trigger: 'html',
        start: 'top+=200 top',
        end: 'top+=201 top',
        scrub: true,
      },
      bottom: '-5rem',
      ease: 'power3',
    })
  }, [])

  return (
    <>
      <Head>
        <title>
          {path === '/'
            ? 'AqiFind | Home'
            : path === '/search'
            ? 'AqiFind | Search'
            : 'AqiFind | 404'}
        </title>
        <meta
          name='description'
          content='Find ou the AQI of a city or a country'
        />
      </Head>

      <Nav />
      <button
        id='scroll-to-top'
        onClick={scrollToTop}
        className=' z-50 fixed bottom-4 right-4 w-12 h-12 text-xl bg-emerald-400 text-black p-2 rounded-full leading-0 shadow-md transition-all hover:scale-105'>
        <Image src='/up.svg' alt='scroll to top icon' height={50} width={50} />
      </button>
      {children}
      <footer>
        <div className='h-20 flex flex-col items-center justify-center p-4 bg-neutral-200'>
          <p className='text-center text-black text-sm'>
            Website by{' '}
            <a
              href='
              https://www.seb-graf.com
              '
              target='_blank'
              rel='noopener noreferrer'
              className='text-black text-sm underline'>
              seb graf
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}
