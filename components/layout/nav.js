import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { usePlacesWidget } from 'react-google-autocomplete'

export default function Nav() {
  const [path, setPath] = useState('/')
  const [searchLink, setSearchLink] = useState('/')
  const router = useRouter()

  const reload = () => {
    router.reload()
  }

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    language: 'en',

    onPlaceSelected: (place) => {
      if (place === undefined) return

      let lat, lon

      if (place.geometry) {
        lat = place.geometry.location.lat()
        lon = place.geometry.location.lng()
      }

      if (Object.keys(place).length === 1) {
        setSearchLink(`/search?city=${place.name.toLowerCase()}`)
        router.push(
          `/search?city=${place.name.toLowerCase()}&lat=${lat}&lon=${lon}`
        )
      }

      if (Object.keys(place).length > 1) {
        setSearchLink(
          `/search?city=${place.address_components[0].long_name.toLowerCase()}&lat=${lat}&lon=${lon}`
        )
        router.push(
          `/search?city=${place.address_components[0].long_name.toLowerCase()}&lat=${lat}&lon=${lon}`
        )
      }
    },
  })

  useEffect(() => {
    setPath(location.pathname)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 z-20 w-full bg-white ${
        path === '/' && 'translate-y-[-100%]'
      } `}>
      <div className='max-w-[70rem] flex justify-between items-center w-full max-w-[70rem] px-[5vw] py-4 mx-auto my-0'>
        <Link href='/'>
          <a className='text-xl'>AqiFind</a>
        </Link>

        <form
          className={`relative h-10 flex gap-4 flex-shrink w-full max-w-[12rem] sm:max-w-[16rem]`}>
          <input
            aria-label='enter the name of your city'
            id='search-field'
            ref={ref}
            type='text'
            onChange={(e) => setSearchLink(`/search?city=${e.target.value}`)}
            className='px-4 pr-14 placeholder-black text-black w-full rounded-full overflow-hidden outline-none bg-neutral-200 hover:pl-6 transition-all'
          />
          <Link href={searchLink}>
            <button
              aria-label='search'
              className='absolute bg-emerald-400 pointer-events-auto h-full right-0 leading-[0] aspect-square rounded-full transition-all hover:bg-emerald-500'>
              <Image
                aria-hidden='true'
                focusable='false'
                src='/search.png'
                alt='search icon in the shape of a magnifying glass'
                width={20}
                height={20}
              />
            </button>
          </Link>
        </form>
      </div>
    </nav>
  )
}
