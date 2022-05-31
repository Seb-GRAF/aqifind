import { useState, useEffect } from 'react'
import Scene from './scene'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { usePlacesWidget } from 'react-google-autocomplete'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const router = useRouter()
  const [searchLink, setSearchLink] = useState('/')

  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    language: 'en',

    onPlaceSelected: (place) => {
      if (place === undefined) return
      else if (Object.keys(place).length === 1) {
        goToSearch(place.name)
      } else if (Object.keys(place).length > 1) {
        goToSearch(place.address_components[0].long_name)
      }
    },
  })

  const goToSearch = (city) => {
    setSearchLink(`/search?q=${city}`)
    router.push(`/search?q=${city}`)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section
        id='hero'
        className='flex items-center justify-center w-full h-[80vh] max-h-[45rem] md:max-h-[80vh] md:h-[80vh] overflow-hidden
          bg-gradient-to-br from-[#272d41] via-[#000519] to-[#0e1516]
          after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-3/4 after:bg-gradient-to-t after:from-[#000000] after:to-transparent after:pointer-events-none'>
        <div className='relative w-full max-w-[80rem] h-full flex flex-col md:flex-row '>
          {/*-- CTA --*/}

          <div
            id='cta'
            className='absolute md:relative bottom-0 left-0 z-10 md:h-full w-full md:w-1/2 px-8 sm:px-16 md:px-20 text-white flex items-start md:items-center pb-12 '>
            <div className='flex flex-col items-start gap-4 text-lg'>
              <h1 className='text-4xl md:text-5xl'>
                How polluted is your air?
              </h1>
              <p className='opacity-70'>
                Discover the current AQI (Air Quality Index) of the closest
                station to your city.
              </p>
              <div className='relative h-12 flex gap-4 flex-shrink w-full sm:max-w-[16rem]'>
                <input
                  type='text'
                  ref={ref}
                  onChange={(e) => setSearchLink(`/search?q=${e.target.value}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      router.push(searchLink)
                    }
                  }}
                  className='px-4 pr-14 placeholder-black text-black w-full rounded-full overflow-hidden outline-none'
                />
                <Link href={searchLink}>
                  <button className='absolute bg-emerald-500 pointer-events-auto h-full right-0 leading-[0] aspect-square rounded-full'>
                    <Image
                      src='/search.png'
                      alt='search icon'
                      width={24}
                      height={24}
                    />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/*--- EARTH --*/}

          <div className='absolute md:relative top-0 md:top-0 left-0 h-full  md:min-h-full w-full md:w-1/2'>
            <div
              id='tooltip'
              className=' hidden pointer-events-none z-10 fixed flex-col gap-2 top-0 -left-60 md:-left-80 w-60 md:w-80 p-4 text-black bg-emerald-400 rounded-2xl border-solid border-black shadow-lg leading-4 invisible sm:visible'>
              <p id='tooltip-name'></p>
              <p id='tooltip-aqi' className='font-bold'></p>
              <p id='tooltip-time' className='text-sm'></p>
            </div>
            <Scene className='w-full' />
          </div>
        </div>
      </section>
    </>
  )
}

//AIzaSyD8TeXQEXdigtrGSJfoZa-H7TdK3-NJaYk
