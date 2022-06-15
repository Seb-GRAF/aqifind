import { useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

gsap.registerPlugin(ScrollTrigger)

function Top10Chart() {
  const top10 = [
    { country: 'Bangladesh', aqi: 76.0 },
    { country: 'Chad', aqi: 75.9 },
    { country: 'Pakistan', aqi: 66.8 },
    { country: 'Tajikistan', aqi: 59.4 },
    { country: 'India', aqi: 58.1 },
    { country: 'Oman', aqi: 53.9 },
    { country: 'Kyrgyzstan', aqi: 50.8 },
    { country: 'Bahrain', aqi: 49.8 },
    { country: 'Iraq', aqi: 49.7 },
    { country: 'Nepal', aqi: 46 },
  ]

  const barColors = [
    '#A159FF',
    '#9965F4',
    '#9170E8',
    '#8A7CDD',
    '#8288D2',
    '#7A93C6',
    '#729FBB',
    '#6BABB0',
    '#63B6A4',
    '#5BC299',
  ]

  useEffect(() => {
    gsap.from('#top10-chart', {
      scrollTrigger: {
        trigger: '#top10-chart',
      },
      x: '-100%',
      opacity: 0,
      duration: 3,
      ease: 'power3',
    })
  }, [])

  return (
    <ResponsiveContainer width='100%' height='95%' id='top10-chart'>
      <BarChart
        layout='vertical'
        data={top10}
        height='100%'
        width='100%'
        margin={{ top: 0, right: 40, bottom: 0, left: 0 }}>
        <Bar
          dataKey='aqi'
          label={{ fontSize: 20, position: 'right' }}
          unit=' μg/m3'
          maxBarSize={30}>
          {top10.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % 10]} />
          ))}
        </Bar>
        <YAxis
          dataKey='country'
          type='category'
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'white', fontSize: 18 }}
          mirror='true'
        />
        <XAxis type='number' hide='true' />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function Intro2() {
  useEffect(() => {
    gsap.from('#chart-text', {
      scrollTrigger: {
        trigger: '#chart-text',
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: 'power3',
    })
  }, [])
  return (
    <>
      <section className='z-10 py-28 px-[5vw] flex flex-col items-center justify-center bg-neutral-200 relative mx-auto text-lg'>
        <article className='z-10 md:min-h-[40rem] flex flex-col-reverse items-center gap-24 md:gap-0 md:flex-row w-full max-w-[60rem]'>
          <div className='w-full md:w-3/5 h-[30rem] overflow-hidden md:self-start'>
            <div className='flex gap-2 items-center opacity-80'>
              <h3>
                Worst{' '}
                <acronym
                  className='decoration-black/30 underline-offset-4'
                  title='Air Quality Index'>
                  AQI
                </acronym>{' '}
                average 2021
              </h3>
              <cite className='text-xs'>
                <a
                  href='https://www.iqair.com/world-most-polluted-countries'
                  target='_blank'
                  rel='noreferrer'>
                  (source IQAIR)
                </a>
              </cite>
            </div>
            <Top10Chart />
          </div>
          <div
            id='chart-text'
            className='w-full md:w-2/5 flex flex-col gap-6 md:max-w-md md:self-end '>
            <h3 className=' text-3xl md:max-w-sm'>
              Some countries are hit harder than others
            </h3>
            <p className='opacity-80'>
              The{' '}
              <acronym
                className='decoration-black/30 underline-offset-4'
                title='World Health Organization'>
                WHO
              </acronym>{' '}
              target for air pollution is 0-10 µg/m³. IQ Air, which measures
              pollution in 109 countries around the globe, considers
              measurements above 35.5 to be unhealthy for sensitive groups,
              levels between 55.5 and 150.4 to be unhealthy for all, and
              anything higher is either very unhealthy (150.5-250.4) or
              hazardous (250.5 or higher).
            </p>
          </div>
        </article>

        <figure className='absolute left-0 -bottom-64 w-[30rem] max-w-full h-[45rem] bg-blue text-blue opacity-[2%] overflow-hidden'>
          <Image
            src='/svg/circle.svg'
            alt=''
            role='presentation'
            layout='fill'
            objectFit='cover'
            priority={true}
            className='max-w-full'
          />
        </figure>
        <figure className='absolute right-0 top-0 w-[30rem] max-w-full h-[45rem] bg-blue text-blue opacity-[2%] overflow-hidden'>
          <Image
            src='/svg/circle2.svg'
            alt=''
            role='presentation'
            layout='fill'
            objectFit='cover'
            priority={true}
            className='max-w-full'
          />
        </figure>
      </section>
    </>
  )
}
