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

  const [suggestions, setSuggestions] = useState()
  const [searchLink, setSearchLink] = useState('/')
  const [data, setData] = useState()
  const [topTen, setTopTen] = useState([])
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

      if (Object.keys(place).length === 1) goToSearch(place.name)
      if (Object.keys(place).length > 1)
        goToSearch(place.address_components[0].long_name, lat, lon)
    },
  })

  // Fetch closest city name for geo loc
  const fetchTopTen = (sortedData) => {
    let fetches = []
    let topTenArray = []

    sortedData.slice(0, 10).forEach((item) => {
      const { lat, lon } = item

      fetches.push(
        fetch(
          `http://api.positionstack.com/v1/reverse?access_key=${process.env.NEXT_PUBLIC_POSITIONSTACK_API_KEY}&query=${lat},${lon}`
        )
          .then((res) => res.json())
          .then((res) => {
            topTenArray.push({
              label: res.data[0].label,
              lat: item.lat,
              lon: item.lon,
              aqi: item.aqi,
            })
          })
          .catch((err) => console.error(err))
      )
    })

    Promise.all(fetches).then(() => {
      setTopTen(topTenArray.sort((a, b) => b.aqi - a.aqi))
    })
  }
  // Sort data by AQI level
  const sortData = (data) => {
    let sortedData = data
      .filter((e) => !Number.isNaN(parseInt(e.aqi)))
      .sort((a, b) => parseInt(b.aqi) - parseInt(a.aqi))

    setData(sortedData)
    // fetchTopTen(sortedData)
  }
  // Push route
  const goToSearch = (city, lat, lon) => {
    if (lat && lon) {
      setSearchLink(`/search?city=${city}&lat=${lat}&lon=${lon}`)
      router.push(`/search?city=${city}&lat=${lat}&lon=${lon}`)
    } else {
      setSearchLink(`/search?city=${city}`)
      router.push(`/search?city=${city}`)
    }
  }
  // Aqi fetch
  useEffect(() => {
    fetch(
      `https://api.waqi.info/v2/map/bounds?latlng=-85,-180,85,180&networks=official&token=${process.env.NEXT_PUBLIC_AQICN_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        sortData(res.data)
      })
      .catch((error) => {
        console.error(error)
      })

    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom-=20% top',
      end: 'bottom-=20% top',
      onEnter: () => {
        gsap.to('nav', {
          translateY: 0,
          duration: 1,
          ease: 'power3',
          overwrite: true,
        })
      },
      onEnterBack: () => {
        gsap.to('nav', {
          translateY: '-100%',
          duration: 1,
          ease: 'power3',
          overwrite: true,
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <>
      <section
        id='hero'
        className='flex items-center justify-center w-full h-[80vh] max-h-[45rem] md:max-h-[80vh] md:h-[80vh] overflow-hidden
          bg-gradient-to-b from-[#272D41] via-[#000519] to-[#0e1516]
          after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-3/4 after:bg-gradient-to-t after:from-[#000000] after:to-transparent after:pointer-events-none'>
        <div className='relative w-full max-w-[80rem] h-full flex flex-col md:flex-row '>
          {/*-- CTA --*/}

          <div
            id='cta'
            className='absolute md:relative bottom-0 left-0 z-10 md:h-full w-full md:w-1/2 pl-[5vw] pr-8 sm:pr-0 md:pr-0 text-white flex items-start md:items-center pb-12 '>
            <div className='flex flex-col items-start gap-4 text-lg'>
              <h1 className='text-4xl md:text-5xl'>
                How polluted is your air?
              </h1>
              <p className='opacity-70'>
                Discover the current AQI (Air Quality Index) of the closest
                station to your city.
              </p>
              <div className='flex gap-4 relative'>
                <div
                  id='search'
                  className='z-50 relative h-12 flex gap-4 flex-shrink w-full sm:max-w-[16rem] bottom-0 right-0'>
                  <input
                    type='text'
                    ref={ref}
                    onChange={(e) =>
                      setSearchLink(`/search?city=${e.target.value}`)
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        router.push(searchLink)
                      }
                    }}
                    className='px-4 pr-14 placeholder-black text-black w-full rounded-full overflow-hidden outline-none hover:pl-6 transition-all'
                  />
                  <Link href={searchLink}>
                    <button className='absolute bg-emerald-500 pointer-events-auto h-full right-0 leading-[0] aspect-square rounded-full transition-all hover:bg-emerald-400'>
                      <Image
                        src='/search.png'
                        alt='search icon'
                        width={24}
                        height={24}
                      />
                    </button>
                  </Link>
                </div>
                {suggestions && (
                  <div
                    id='search-suggestions'
                    className='absolute top-[120%] left-0 w-full h-16 overflow-y-scroll bg-white'>
                    {suggestions.map((item) => {
                      return (
                        <p
                          className='text-black'
                          key={item.uid}
                          onClick={() => goToSearch(item.name)}>
                          {item.station.name}
                        </p>
                      )
                    })}
                  </div>
                )}
                <button
                  onClick={() => goToSearch('here')}
                  className='leading-[0] opacity-90 transition-all hover:scale-110'>
                  <Image
                    src='/geoloc.svg'
                    alt='geo location'
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>
          </div>
          {/*--- EARTH --*/}
          {data && (
            <div className='absolute md:relative bottom-0 md:top-0 left-0 h-[110%] md:h-full  md:min-h-full w-full md:w-1/2'>
              <div
                id='tooltip'
                className=' hidden pointer-events-none z-10 fixed flex-col gap-2 top-0 left-0 w-60 md:w-80 p-4 text-black bg-emerald-400 rounded-2xl border-solid border-black shadow-lg leading-4 invisible sm:visible

              before:block before:content-[""] before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-[8px] before:w-0 before:h-0 before:pointer-events-none before:border-y-8 before:border-l-8 before:border-solid before:border-y-transparent before:border-l-emerald-400 before:shadow-lg
              '>
                <p id='tooltip-name'></p>
                <p id='tooltip-aqi' className='font-bold'></p>
                <p id='tooltip-time' className='text-sm'></p>
              </div>

              <Scene className='w-full' data={data} />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
