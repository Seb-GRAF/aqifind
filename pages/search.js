import { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import Chart from '../components/search/chart'
import gsap from 'gsap'
import Layout from '../components/layout/layout'

import { useRouter } from 'next/router'

export default function Search() {
  const [count, setCount] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState()
  const [pictures, setPictures] = useState()
  const [picture, setPicture] = useState()
  const [cityName, setCityName] = useState('')
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

  const fetchData = () => {
    const name = location.search.replace('?q=', '').replace('%20', '-')
    const randomPage = Math.floor(Math.random() * 5) + 1
    setCityName(name)
    fetch(
      `https://api.waqi.info/feed/${name}/?token=${process.env.NEXT_PUBLIC_AQICN_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res)
        console.log(res)
      })
      .catch((error) => {
        console.error(error)
      })
    fetch(
      `https://api.unsplash.com/search/photos?page=${randomPage}&per_page=10&query=${name}%20city&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API}`
    )
      .then((res) => res.json())
      .then((res) => {
        // setPicture(res.results[Math.floor(Math.random() * 9)])
        setPictures(res.results)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const changePicture = () => {
    setPicture(pictures[Math.floor(Math.random() * 9)])
  }

  useEffect(() => {
    const onMouseMove = (event) => {
      const { clientX, clientY } = event
      if (document.getElementById('tooltip'))
        gsap.set('#tooltip', {
          x: clientX,
          y: clientY,
        })
    }
    addEventListener('mousemove', onMouseMove)

    fetchData()
    setLoaded(true)

    return () => {
      removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  useEffect(() => {
    const name = location.search
      .replace('?q=', '')
      .replace('%20', '-')
      .toLowerCase()
    if (loaded && name !== cityName) {
      fetchData()
    }
  }, [router])

  useEffect(() => {
    if (pictures) {
      count < 10 ? setCount(count + 1) : setCount(0)
      setPicture(pictures[count])
    }
  }, [pictures])

  return (
    <Layout>
      <section className='my-0 mx-auto min-h-screen flex flex-col gap-12 p-[5vw] max-w-[80rem] pt-4'>
        {data && data.status === 'ok' ? (
          <>
            {/* --- TITLE SECTION --- */}
            <div className='flex flex-col gap-2'>
              <h1 className=' text-3xl font-bold tracking-wider'>
                Air quality in{' '}
                <b className='capitalize font-bold tracking-wider'>
                  {decodeURIComponent(cityName)}
                </b>
              </h1>
              <p className='opacity-70'>
                Air quality index (AQI) and other relevant air pollution data in{' '}
                <b className='capitalize font-normal'>{cityName}</b>
              </p>
              <p className='opacity-70 text-sm mt-3'>
                Last updated {moment(data.data.time.iso).fromNow()}
              </p>
            </div>
            <div className='flex flex-col md:flex-row  gap-4'>
              {/* --- CITY IMAGE AND AQI --- */}
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
                    className={`relative h-52 md:h-96 flex flex-col rounded-md overflow-hidden after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent after:pointer-events-none ${
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
              {/* --- POLLUANTS AND WEATHER ---*/}
              <div className='flex flex-col gap-4 w-full h-fit md:w-1/2 overflow-hidden'>
                {/* polluants */}
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
                {/* weather */}
                <div className='flex flex-col gap-2 bg-slate-100 rounded-md p-4'>
                  <p>Weather:</p>
                  {Object.keys(data.data.iaqi)
                    .filter(filterWeather)
                    .sort()
                    .map((keyName, index) => (
                      <p key={keyName + index}>
                        {weather[keyName]}: {data.data.iaqi[keyName].v}
                      </p>
                    ))}
                </div>
                <div
                  id='tooltip'
                  className='fixed hidden w-64 text-sm p-2 rounded-md bg-emerald-400/50 top-0 left-0 backdrop-blur border-solid border-black shadow-lg pointer-events-none'></div>
              </div>
            </div>
          </>
        ) : // --- CITY NOT FOUND ---
        data && data.status === 'error' ? (
          <p>City not found</p>
        ) : (
          // --- LOADING ---
          <p>Loading...</p>
        )}
      </section>
    </Layout>
  )
}
