import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { usePlacesWidget } from 'react-google-autocomplete'

export default function Nav() {
  const [path, setPath] = useState('/')
  const [searchLink, setSearchLink] = useState('/search?city=')
  const router = useRouter()

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
          className={`relative h-10 flex gap-4 flex-shrink w-full max-w-[12rem] sm:max-w-[13rem]`}>
          <input
            aria-label='enter the name of your city'
            id='search-field'
            ref={ref}
            type='text'
            onChange={(e) => setSearchLink(`/search?city=${e.target.value}`)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                searchLink.replace(/ /g, '') !== '/search?city='
              ) {
                router.push(searchLink)
              }
            }}
            className='pl-11 pr-7 placeholder-black/50 text-black w-full rounded-full overflow-hidden outline-none bg-neutral-200 hover:pl-12 transition-all'
          />
          {searchLink !== '/search?city=' && (
            <button
              className='absolute right-0 top-0 w-8 h-full'
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#search-field').value = ''
                setSearchLink('/search?city=')
              }}>
              ×
            </button>
          )}
          <Link
            href={
              searchLink.replace(/ /g, '') === '/search?city=' ? '' : searchLink
            }>
            <button
              aria-label='search'
              className='absolute bg-emerald-400 pointer-events-auto h-3/4 left-[.4rem] top-1/2 -translate-y-1/2 leading-[0] aspect-square rounded-full transition-all hover:bg-emerald-500'
              onClick={(e) => {
                if (searchLink.replace(/ /g, '') === '/search?city=')
                  e.preventDefault()
              }}>
              <Image
                aria-hidden='true'
                focusable='false'
                src='/search.png'
                alt='search icon in the shape of a magnifying glass'
                width={18}
                height={18}
              />
            </button>
          </Link>
        </form>
      </div>
    </nav>
  )
}
