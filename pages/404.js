import { useEffect } from 'react'
import Head from 'next/head'
import Nav from '../components/layout/nav'
import Scene from '../components/home/scene'
import Link from 'next/link'

export default function Home() {
  const setHeight = () => {
    const wrapper = document.querySelector('#error-page')
    wrapper.style.height = `${window.innerHeight}px`
  }

  useEffect(() => {
    setHeight()
    window.addEventListener('resize', setHeight)
    return () => {
      window.removeEventListener('resize', setHeight)
    }
  }, [])

  return (
    <>
      <Head>
        <title>AqiFind | 404</title>
      </Head>

      <div
        id='error-page'
        className='relative h-screen w-full overflow-hidden bg-black'>
        <Scene />
        <div className='absolute bottom-1/2 translate-y-1/2 left-0 w-full text-center flex flex-col gap-6 justify-center items-center pointer-events-none'>
          <h1 className=' text-white text-4xl'>404 | Page not found</h1>
          <Link href='/'>
            <a className='bg-emerald-400 w-fit pointer-events-auto py-3 px-8 rounded-full transition-all hover:bg-emerald-500 text-xl font-medium'>
              Home
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
