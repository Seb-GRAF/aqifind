import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import moment from 'moment'
import gsap from 'gsap'

export default function Chart({ data, name, currentIaqi }) {
  const [resize, setResize] = useState('100%')

  const polluantsDefinition = {
    ['PM2.5']:
      'Particulate matter (PM10) describes inhalable particles, with diameters that are generally 2.5 micrometers and smaller. PM2.5 are tiny particles in the air that reduce visibility and cause the air to appear hazy when levels are elevated',
    ['PM10']:
      'Particulate matter (PM10) describes inhalable particles, with diameters that are generally 10 micrometers and smaller.',
    ['O3']:
      "Ozone (O3) is a highly reactive gas composed of three oxygen atoms. It is both a natural and a man-made product that occurs in the Earth's upper atmosphere",
    ['NO2']:
      'Nitrogen dioxide (NO2) is a toxic reddish brown gas that is a strong oxidizing agent. It is produced by combustion (as of fossil fuels), and is an atmospheric pollutant',
    ['SO2']:
      'Sulfur dioxide (SO2) is a heavy pungent toxic gas that is easily condensed to a colorless liquid. It is used especially in making sulfuric acid, in bleaching, as a preservative, and as a refrigerant, and is a major air pollutant especially in industrial areas',
    ['CO']:
      'Carbon monoxide (CO) is a colorless odorless very toxic gas CO that is formed as a product of the incomplete combustion of carbon or a carbon compound',
  }

  const onWindowResize = () => {
    setResize(`${window.innerWidth / 10}%`)
  }

  const onMouseEnter = () => {
    const tooltip = document.querySelector('#tooltip')
    tooltip.innerHTML = polluantsDefinition[name]

    gsap.set(tooltip, {
      display: 'block',
    })
  }

  const onMouseLeave = () => {
    const tooltip = document.querySelector('#tooltip')

    gsap.set(tooltip, {
      display: 'none',
    })
  }

  useEffect(() => {
    addEventListener('resize', onWindowResize, false)

    return () => {
      removeEventListener('resize', onWindowResize, false)
    }
  }, [])

  return (
    data && (
      <div className='flex gap-4 h-40 w-full items-center justify-start bg-white rounded-md  px-4 overflow-x-scroll overflow-y-hidden scr'>
        <div className='flex flex-col justify-center items-center w-24 text-right bg-slate-100 p-3 rounded-md'>
          <p
            className='cursor-pointer underline mb-4'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            {name}
          </p>
          <p>Now</p>
          <p>{currentIaqi}</p>
        </div>

        <div className='w-full h-full pt-2'>
          <ResponsiveContainer width='100%' height='100%' debounce={100}>
            <BarChart
              width={'100%'}
              height={80}
              data={data}
              margin={{ top: 15, right: 20, bottom: 0, left: 0 }}>
              <Bar
                maxBarSize={30}
                type='natural'
                dataKey='min'
                fill='#4ADE80'
                stroke='none'
                stackId='a'
              />
              <Bar
                maxBarSize={30}
                type='natural'
                dataKey='max'
                fill='#7E8FCC'
                stroke='none'
                stackId='a'
              />
              {/* <CartesianGrid stroke='#9C9C9C' strokeDasharray='2 2' /> */}
              <XAxis
                dataKey='day'
                tickFormatter={(e) => moment(e).format('DD MMMM')}
              />
              {/* <YAxis /> */}
              <Tooltip cursor={{ fill: 'none', stroke: '#ccc' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  )
}
