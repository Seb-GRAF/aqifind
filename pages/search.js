import { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import Chart from '../components/search/chart'
import gsap from 'gsap'
import Layout from '../components/layout/layout'
import Weather from '../components/search/weather'
import NotFound from '../components/search/notFound'
import AqiMap from '../components/search/aqiMap'
import RandomFacts from '../components/search/randomFacts'

import { useRouter } from 'next/router'

export default function Search() {
  const [count, setCount] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState()
  const [weatherData, setWeatherData] = useState()
  const [pictures, setPictures] = useState()
  const [picture, setPicture] = useState()
  const [cityName, setCityName] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [refreshMap, setRefreshMap] = useState(false)
  const [coordinates, setCoordinates] = useState()

  const router = useRouter()

  const polluants = {
    no2: 'NO2',
    pm25: 'PM2.5',
    pm10: 'PM10',
    o3: 'O3',
    so2: 'SO2',
    co: 'CO',
  }

  // transform url params to readable string
  const getURLParameter = (sParam) => {
    var sPageURL = window.location.search.substring(1)
    var sURLVariables = sPageURL.split('&')
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=')
      if (sParameterName[0] == sParam) {
        return sParameterName[1]
      }
    }
  }
  // polluant filter function
  const filterPolluants = (item) => {
    for (let key in polluants) {
      if (item === key) return true
    }
  }
  // fetch picture from unsplash api
  const fetchImages = (name) => {
    let randomPage = Math.floor(Math.random() * 5) + 1

    const nameArray = name.split(' ')
    const twoWordsName = nameArray.slice(0, 2).join(' ')

    fetch(
      `https://api.unsplash.com/search/photos?&per_page=10&query=${twoWordsName}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API}`
    )
      .then((res) => res.json())
      .then((res) => {
        setPictures(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  // fetch aqi from aqicn api
  const fetchData = () => {
    setRefreshMap(true)
    const name = decodeURIComponent(getURLParameter('city'))
    name.replace('%20', '-')
    setCityName(name)
    const lat = getURLParameter('lat')
    const lon = getURLParameter('lon')
    // aqi api fetch
    fetch(
      lat && lon
        ? `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${process.env.NEXT_PUBLIC_AQICN_API_KEY}`
        : `https://api.waqi.info/feed/${name}/?token=${process.env.NEXT_PUBLIC_AQICN_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setRefreshMap(false)
        setData(res)
        // if geo location : fetch city name based on lat/lon
        if (name === 'here') {
          setCityName(res.data.city.name)
          fetchImages(res.data.city.name)
          fetchSuggestions(res.data.city.name)
        } else {
          fetchImages(name)
          fetchSuggestions(name)
          fetchWeather(lat, lon)
        }
        if (lat && lon) {
          fetchWeather(lat, lon)
          setCoordinates({ lat: Number(lat), lon: Number(lon) })
        } else {
          fetchWeather(res.data.city.geo[0], res.data.city.geo[1])
          setCoordinates({
            lat: Number(res.data.city.geo[0]),
            lon: Number(res.data.city.geo[1]),
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }
  // fetch suggestion when city not found
  const fetchSuggestions = (name) => {
    if (name.length < 3) return

    fetch(
      `https://api.waqi.info/v2/search/?keyword=${name}&token=${process.env.NEXT_PUBLIC_AQICN_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setSuggestions(res.data)
      })
  }
  // fetch weather data
  const fetchWeather = (lat, lon) => {
    if (lat && lon) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          setWeatherData(res)
        })
    }
  }
  // cycles through pictures
  const changePicture = () => {
    count < pictures.results.length - 1 ? setCount(count + 1) : setCount(0)
    setPicture(pictures.results[count])
  }

  // event listener first load
  useEffect(() => {
    gsap.set('nav', {
      translateY: 0,
      overwrite: true,
    })

    fetchData()
    setLoaded(true)
  }, [])

  // when the route changes, check that the name is different
  useEffect(() => {
    const name = getURLParameter('city')
    if (name) name.replace('%20', '-').toLowerCase()
    if (loaded && name !== cityName) {
      fetchData()
    }
  }, [router])

  // count for pictures switch
  useEffect(() => {
    if (pictures) {
      if (pictures.total > 0) {
        setPicture(
          pictures.results[Math.floor(Math.random() * pictures.results.length)]
        )
      } else
        setPicture({
          urls: { regular: '/pictures/sky.jpg' },
          links: { html: 'https://unsplash.com/photos/1h2Pg97SXfA' },
          user: { name: 'Kenrick Mills' },
        })
    }
  }, [pictures])

  return (
    <Layout>
      <section className='w-full bg-neutral-50'>
        <div className='my-0 mx-auto flex flex-col px-[5vw] pt-24 pb-6 md:pt-28 md:pb-28 max-w-[70rem] min-h-screen bg-neutral-50'>
          {data && data.status === 'ok' ? (
            // --- CITY FOUND ---
            <>
              {/* --- TITLE SECTION --- */}
              {cityName !== 'here' ? (
                <div className='flex flex-col gap-2'>
                  <h1 className=' text-3xl font-bold tracking-wider'>
                    Air quality in{' '}
                    <b className='capitalize font-bold tracking-wider'>
                      {decodeURIComponent(cityName)}
                    </b>
                  </h1>
                  <div className='flex flex-col'>
                    <p className='opacity-70'>
                      Air quality index (AQI) and other relevant air pollution
                      data in{' '}
                      <b className='capitalize font-normal'>{cityName}</b>.
                    </p>
                    <p className='opacity-70'>
                      Closest AQI station: {data.data.city.name}.
                    </p>
                  </div>
                  <p className='opacity-70 text-sm mt-3'>
                    Last updated {moment(data.data.time.iso).fromNow()}
                  </p>
                </div>
              ) : (
                ''
              )}
              {/* --- CITY IMAGE AND AQI --- */}
              <div className='flex flex-col md:flex-row gap-6 mt-12'>
                <div className='flex flex-col gap-6 w-full md:w-1/2 overflow-hidden '>
                  <div
                    className={`flex h-fit p-4 rounded-md ${
                      data.data.aqi >= 301
                        ? 'bg-[#A159FF]'
                        : data.data.aqi >= 201
                        ? 'bg-[#9866F2]'
                        : data.data.aqi >= 151
                        ? 'bg-[#9073E6]'
                        : data.data.aqi >= 101
                        ? 'bg-[#8780D9]'
                        : data.data.aqi >= 51
                        ? 'bg-[#759BBF]'
                        : data.data.aqi >= 0
                        ? 'bg-[#5BC299]'
                        : 'bg-[#d96a6a]'
                    }`}>
                    <div className='flex flex-col items-center justify-center p-4 bg-black/10 rounded-md'>
                      <p>AQI</p>
                      <p>{data.data.aqi}</p>
                    </div>
                    <div className='w-full text-center flex gap-1 items-center justify-center'>
                      <p className='text-md'>Aqi index is </p>
                      <p className='text-xl font-bold'>
                        {data.data.aqi >= 301
                          ? 'Hazardous'
                          : data.data.aqi >= 201
                          ? 'Very unhealthy'
                          : data.data.aqi >= 151
                          ? 'Unhealthy'
                          : data.data.aqi >= 101
                          ? 'High'
                          : data.data.aqi >= 51
                          ? 'Moderate'
                          : data.data.aqi >= 0
                          ? 'Good'
                          : 'No data'}
                      </p>
                    </div>
                  </div>

                  <figure
                    id='search-picture'
                    className={`relative h-64 md:h-full flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none ${
                      data.data.aqi >= 301
                        ? 'bg-[#A159FF]'
                        : data.data.aqi >= 201
                        ? 'bg-[#9866F2]'
                        : data.data.aqi >= 151
                        ? 'bg-[#9073E6]'
                        : data.data.aqi >= 101
                        ? 'bg-[#8780D9]'
                        : data.data.aqi >= 51
                        ? 'bg-[#759BBF]'
                        : data.data.aqi >= 0
                        ? 'bg-[#5BC299]'
                        : 'bg-[#d96a6a]'
                    }`}>
                    {picture && (
                      <Image
                        src={picture.urls.regular}
                        alt={'random picture of ' + cityName}
                        layout='fill'
                        objectFit='cover'
                        priority={true}
                      />
                    )}
                    <figcaption className='z-10 text-sm absolute bottom-0 text-white mb-2 ml-3'>
                      Picture by{' '}
                      <a
                        className='underline'
                        href={picture && picture.links.html}>
                        {picture && picture.user.name}
                      </a>
                    </figcaption>
                    <button
                      onClick={changePicture}
                      className='z-10 absolute bottom-0 right-0 mb-2 mr-3 text-white'>
                      ↺
                    </button>
                  </figure>
                </div>
                {/* --- POLLUANTS ---*/}
                <div className='flex flex-col gap-6 w-full h-fit md:w-1/2'>
                  {data.data.forecast && data.data.forecast.daily && (
                    <div className='flex flex-col gap-4 p-4 w-full bg-neutral-200 rounded-md'>
                      <h3 className='w-full text-center opacity-70 text-lg'>
                        Polluants
                      </h3>
                      {Object.keys(data.data.forecast.daily)
                        .filter(filterPolluants)
                        .sort()
                        .map((keyName, index) => {
                          return (
                            <Chart
                              key={keyName + index}
                              data={data.data.forecast.daily[keyName]}
                              name={polluants[keyName]}
                              currentIaqi={
                                data.data.iaqi[keyName]
                                  ? data.data.iaqi[keyName].v
                                  : data.data.forecast.daily[keyName][0].avg
                              }
                            />
                          )
                        })}
                    </div>
                  )}
                  <div
                    id='tooltip'
                    className='z-50 fixed hidden w-64 text-sm p-2 rounded-md top-0 left-0 backdrop-blur border-solid border-black shadow-lg pointer-events-none text-black bg-emerald-400 leading-4                  '></div>
                </div>
              </div>
              {/* --- WEATHER ---*/}
              <Weather weatherData={weatherData} />
              {!refreshMap && (
                <AqiMap refreshMap={refreshMap} coordinates={coordinates} />
              )}
              <RandomFacts
                bg={
                  data.data.aqi >= 301
                    ? 'bg-[#A159FF]/50'
                    : data.data.aqi >= 201
                    ? 'bg-[#9866F2]/50'
                    : data.data.aqi >= 151
                    ? 'bg-[#9073E6]/50'
                    : data.data.aqi >= 101
                    ? 'bg-[#8780D9]/50'
                    : data.data.aqi >= 51
                    ? 'bg-[#759BBF]/50'
                    : data.data.aqi >= 0
                    ? 'bg-[#5BC299]/50'
                    : 'bg-[#d96a6a]/50'
                }
              />
            </>
          ) : // --- CITY NOT FOUND ---
          data && data.status === 'error' ? (
            <NotFound cityName={cityName} suggestions={suggestions} />
          ) : (
            // --- LOADING ---
            <p>Loading...</p>
          )}
        </div>
      </section>
    </Layout>
  )
}
