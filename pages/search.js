import { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import Chart from '../components/search/chart'
import gsap from 'gsap'
import Layout from '../components/layout/layout'
import Weather from '../components/search/weather'

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

  const router = useRouter()

  const polluants = {
    pm25: 'PM2.5',
    pm10: 'PM10',
    o3: 'O3',
    no2: 'NO2',
    so2: 'SO2',
    co: 'CO',
  }
  const weather = {
    p: 'Pressure',
    t: 'Temperature',
    h: 'Humidity',
    w: 'Wind',
    dew: 'Dew point',
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
  // weather filter function
  const filterWeather = (item) => {
    for (let key in weather) {
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
        setPictures(res.results)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  // fetch aqi from aqicn api
  const fetchData = () => {
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
        setData(res)
        // if geo location : fetch city name based on lat/lon
        if (name === 'here') {
          setCityName(res.data.city.name)
          fetchImages(res.data.city.name)
          fetchSuggestions(res.data.city.name)
        } else {
          fetchImages(name)
          fetchSuggestions(name)
        }
        fetchWeather(lat, lon)
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
          console.log(res)
          setWeatherData(res)
        })
    }
  }
  // cycles through pictures
  const changePicture = () => {
    setPicture(pictures[Math.floor(Math.random() * pictures.length)])
  }

  // event listener for tooltip
  useEffect(() => {
    const onMouseMove = (event) => {
      const tooltip = document.querySelector('#tooltip')
      const { clientX, clientY } = event
      if (tooltip)
        gsap.set('#tooltip', {
          x: clientX - tooltip.offsetWidth / 2,
          y: clientY - tooltip.offsetHeight - 15,
        })
    }
    addEventListener('mousemove', onMouseMove)

    fetchData()
    setLoaded(true)

    return () => {
      removeEventListener('mousemove', onMouseMove)
    }
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
      count < pictures.length - 1 ? setCount(count + 1) : setCount(0)
      setPicture(pictures[count])
    }
  }, [pictures])

  return (
    <Layout>
      <section className='my-0 mx-auto min-h-screen flex flex-col p-[5vw] max-w-[80rem] pt-4'>
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
                    data in <b className='capitalize font-normal'>{cityName}</b>
                  </p>
                  <p className='opacity-70'>
                    Closest AQI station: {data.data.city.name}
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
            <div className='flex flex-col md:flex-row gap-4 mt-12'>
              <div className='flex flex-col gap-4 w-full md:w-1/2 overflow-hidden '>
                <div
                  className={`flex h-fit gap-4 p-4 rounded-md ${
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
                  <div className='w-full text-center pr-16 flex gap-1 items-center justify-center'>
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
                {picture && (
                  <figure
                    className={`relative h-52 md:h-full flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none ${
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
                    <Image
                      src={picture.urls.regular}
                      alt={cityName}
                      layout='fill'
                      objectFit='cover'
                      priority={true}
                    />
                    <figcaption className='z-10 text-sm absolute bottom-0 text-white mb-2 ml-3'>
                      Picture by{' '}
                      <a className='underline' href={picture.links.html}>
                        {picture.user.name}
                      </a>
                    </figcaption>
                    <button
                      onClick={changePicture}
                      className='z-10 absolute bottom-0 right-0 mb-2 mr-3 text-white'>
                      ↺
                    </button>
                  </figure>
                )}
              </div>
              {/* --- POLLUANTS ---*/}
              <div className='flex flex-col gap-4 w-full h-fit md:w-1/2 overflow-hidden'>
                {data.data.forecast && data.data.forecast.daily && (
                  <div className='flex flex-col gap-4 p-4 w-full bg-slate-100 rounded-md'>
                    <p>Polluants:</p>
                    {Object.keys(data.data.iaqi)
                      .filter(filterPolluants)
                      .sort()
                      .map((keyName, index) => (
                        <Chart
                          key={keyName + index}
                          data={data.data.forecast.daily[keyName]}
                          name={polluants[keyName]}
                          currentIaqi={data.data.iaqi[keyName].v}
                        />
                      ))}
                  </div>
                )}
                <div
                  id='tooltip'
                  className='fixed hidden w-64 text-sm p-2 rounded-md top-0 left-0 backdrop-blur border-solid border-black shadow-lg pointer-events-none text-black bg-emerald-400 leading-4

                  before:block before:content-[""] before:absolute before:bottom-[-8px] before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:pointer-events-none before:border-x-8 before:border-t-8 before:border-solid before:border-x-transparent before:border-t-emerald-400 before:shadow-lg'></div>
              </div>
            </div>
            {/* --- WEATHER ---*/}
            <Weather weatherData={weatherData} />
          </>
        ) : // --- CITY NOT FOUND ---
        data && data.status === 'error' ? (
          <>
            <div className='flex flex-col gap-2'>
              <h1 className=' text-3xl font-bold tracking-wider'>
                City with name{' '}
                <b className='capitalize font-bold tracking-wider'>
                  {'"'}
                  {decodeURIComponent(cityName)}
                  {'"'}
                </b>{' '}
                not found
              </h1>
              {suggestions && suggestions.length > 0 ? (
                <p className='opacity-70'>
                  Maybe those suggestions might help:
                </p>
              ) : (
                <p className='opacity-70'>
                  No station with similar name were found...
                </p>
              )}
            </div>
            {suggestions && suggestions.length > 0 && (
              <ul className='flex flex-col gap-1'>
                {suggestions.map((suggestion, index) => {
                  if (index > 5) return null
                  return (
                    <li key={suggestion.uid}>
                      <a
                        href={`/search?q=${suggestion.station.name}`}
                        className='underline underline-offset-1'>
                        {suggestion.station.name}
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
            <figure className='relative h-[40vh] md:h-[50vh] flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none'>
              <figcaption className='z-10 text-sm absolute bottom-0 text-white mb-2 ml-3'>
                Picture by{' '}
                <a
                  className='underline'
                  href='https://unsplash.com/photos/PP8Escz15d8'>
                  Keith Hardy
                </a>
              </figcaption>
              <Image
                src='/pictures/desert.jpg'
                alt='sahara desert'
                layout='fill'
                objectFit='cover'
                priority={true}
              />
            </figure>
          </>
        ) : (
          // --- LOADING ---
          <p>Loading...</p>
        )}
      </section>
    </Layout>
  )
}
