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

      if (Object.keys(place).length === 1) {
        setSearchLink(`/search?q=${place.name.toLowerCase()}`)
        router.push(`/search?q=${place.name.toLowerCase()}`)
      }

      if (Object.keys(place).length > 1) {
        setSearchLink(
          `/search?q=${place.address_components[0].long_name.toLowerCase()}`
        )
        router.push(
          `/search?q=${place.address_components[0].long_name.toLowerCase()}`
        )
      }
    },
  })

  useEffect(() => {
    setPath(location.pathname)
  }, [])

  return (
    <nav
      className={`z-20 flex justify-between items-center w-full max-w-[100rem] px-[5vw] py-4 mx-auto my-0 ${
        path === '/' ? 'hidden' : 'text-black'
      } `}>
      <Link href='/'>
        <a className='text-xl'>Home</a>
      </Link>

      <form
        className={`relative h-10 flex gap-4 flex-shrink w-full max-w-[12rem] sm:max-w-[16rem] ${
          path === '/' ? 'invisible' : ''
        }`}>
        <input
          ref={ref}
          type='text'
          onChange={(e) => setSearchLink(`/search?q=${e.target.value}`)}
          className='px-4 pr-14 placeholder-black text-black w-full rounded-full overflow-hidden outline-none bg-slate-200'
        />
        <Link href={searchLink}>
          <button className='absolute bg-emerald-400 pointer-events-auto h-full right-0 leading-[0] aspect-square rounded-full'>
            <Image src='/search.png' alt='search icon' width={20} height={20} />
          </button>
        </Link>
      </form>
    </nav>
  )
}
