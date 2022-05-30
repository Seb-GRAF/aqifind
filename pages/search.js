import { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
import Chart from '../components/chart'

export default function Search() {
  const [data, setData] = useState()
  const [picture, setPicture] = useState()
  const [cityName, setCityName] = useState('')

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

  // Fetch city data on load
  useEffect(() => {
    const name = window.location.search.replace('?q=', '').replace('%20', '-')
    setCityName(name)
    fetch(
      `https://api.waqi.info/feed/${name}/?token=653c9ff7e44ce4612d2d1472a0f142f5859e1e28`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data)
        setData(res)
      })
      .catch((error) => {
        console.error(error)
      })
    fetch(`https://api.unsplash.com/search/photos?page=1&per_page=10&query=${name}%20city&client_id=nWhyGgiVxpEM3crG4034AQIkKgPL2-e1xkvpLSLCxOI
`)
      .then((res) => res.json())
      .then((res) => {
        setPicture(res.results[Math.floor(Math.random() * 9)])
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <section className='my-0 mx-auto min-h-screen flex flex-col gap-12 p-[5vw] max-w-[100rem]'>
      {data && data.status === 'ok' ? (
        <>
          {/* --- TITLE SECTION --- */}
          <div className='flex flex-col gap-'>
            <h1 className=' text-3xl font-bold tracking-wider'>
              Air quality in{' '}
              <b className='capitalize font-bold tracking-wider'>{cityName}</b>
            </h1>
            <p className='opacity-70'>
              Air quality index (AQI) and other relevant air pollution data in{' '}
              <b className='capitalize font-normal'>{cityName}</b>
            </p>
            <p className='opacity-70 text-sm mt-3'>
              Last updated {moment(data.data.time.iso).fromNow()}
            </p>
          </div>
          {/* --- CITY INFO --- */}
          <div className='flex flex-col md:flex-row  gap-4'>
            {/* CITY IMAGE */}
            {picture && (
              <figure className='relative h-52 md:h-96 w-full md:w-1/2 flex flex-col rounded-md overflow-hidden'>
                <Image
                  src={picture.urls.regular}
                  alt=''
                  layout='fill'
                  objectFit='cover'
                />
                <figcaption className='z-20 absolute bottom-0 text-white mb-2 ml-3'>
                  Image by <a href={picture.links.html}>{picture.user.name}</a>
                </figcaption>
              </figure>
            )}
            {/*  DATA  */}
            <div className='flex flex-col w-full md:w-1/2 rounded-md overflow-hidden'>
              <div
                className={`flex h-fit gap-4 p-4 ${
                  data.data.aqi >= 301
                    ? 'bg-[#A8350F]'
                    : data.data.aqi >= 201
                    ? 'bg-[#A05827]'
                    : data.data.aqi >= 151
                    ? 'bg-[#987C3E]'
                    : data.data.aqi >= 101
                    ? 'bg-[#909F56]'
                    : data.data.aqi >= 51
                    ? 'bg-[#88C36D]'
                    : 'bg-[#80E685]'
                }`}>
                <div className='flex flex-col items-center justify-center p-4 bg-black/10 rounded-md'>
                  <p>AQI</p>
                  <p>{data.data.aqi}</p>
                </div>
                <div>
                  <p>Aqi index is:</p>
                  <p>
                    <b>
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
                        : 'Good'}
                    </b>
                  </p>
                </div>
              </div>
              <div className='flex flex-col gap-4 p-4 w-full bg-slate-200'>
                <p>Polluants:</p>
                {Object.keys(data.data.iaqi)
                  .filter(filterPolluants)
                  .sort()
                  .map((keyName, index) => (
                    <Chart
                      key={keyName + index}
                      data={data.data.forecast}
                      name={polluants[keyName]}
                    />
                    // <p key={keyName + index}>
                    //   {polluants[keyName]}: {data.data.iaqi[keyName].v}
                    // </p>
                  ))}
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
            </div>
          </div>
          <div></div>
        </>
      ) : // --- CITY NOT FOUND ---
      data && data.status === 'error' ? (
        <p>City not found</p>
      ) : (
        // --- LOADING ---
        <p>Loading...</p>
      )}
    </section>
  )
}
