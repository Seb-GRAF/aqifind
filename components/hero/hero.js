import Head from 'next/head'
import { useState } from 'react'
import Scene from './scene'
import Link from 'next/link'
import Image from 'next/image'

import Autocomplete from 'react-google-autocomplete'

export default function Hero() {
  const [searchLink, setSearchLink] = useState('/')

  return (
    <>
      <section className='flex items-center justify-center bg-gradient-to-br from-[#3F0040] via-[#000519] to-[#000519] w-full h-screen max-h-[45rem] md:max-h-[80vh] md:h-[80vh] overflow-hidden'>
        <div className='relative max-w-[100rem] h-full flex flex-col md:flex-row'>
          {/*-- CTA --*/}

          <div className='z-10 md:h-full w-full md:w-1/2 px-8 sm:px-16 md:px-20 py-8 text-white flex items-start md:items-center pt-16 '>
            <div className='flex flex-col items-start gap-4 text-lg'>
              <h1 className='text-4xl md:text-5xl'>
                How polluted is your air?
              </h1>
              <p className='opacity-80'>
                Discover the current AQI (Air Quality Index) of the closest
                station to your city.
              </p>
              <form className='relative h-12 flex gap-4 flex-shrink w-full sm:max-w-[16rem]'>
                <Autocomplete
                  apiKey={process.env.GOOGLE_API_KEY}
                  language={'en'}
                  onPlaceSelected={(place) => {
                    console.log(place)
                    setSearchLink(
                      `/search?q=${place.address_components[0].long_name}`
                    )
                  }}
                  onChange={(e) => setSearchLink(`/search?q=${e.target.value}`)}
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
              </form>
            </div>
          </div>
          {/*--- EARTH --*/}

          <div className='absolute md:relative top-1/3 md:top-0 left-0 h-full min-h-[50rem] md:min-h-full w-full md:w-1/2'>
            <div
              id='tooltip'
              className=' hidden pointer-events-none z-10 fixed flex-col gap-4 top-0 -left-60 md:-left-80 w-60 md:w-80 p-4 text-white bg-emerald-400/50 backdrop-blur rounded-2xl border-solid border-black shadow-lg leading-4'>
              <p id='tooltip-name'></p>
              <p id='tooltip-aqi'></p>
              <p id='tooltip-time'></p>
            </div>
            <Scene className='w-full' />
          </div>
        </div>
      </section>
    </>
  )
}

//AIzaSyD8TeXQEXdigtrGSJfoZa-H7TdK3-NJaYk
