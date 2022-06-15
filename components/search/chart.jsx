import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import moment from 'moment'
import gsap from 'gsap'

export default function Chart({ data, name, currentIaqi }) {
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

  // Tooltip functions
  const onMouseEnter = () => {
    gsap.set(`#tooltip-${name.replace('.', '')}`, {
      display: 'block',
    })
  }
  const onMouseLeave = () => {
    gsap.set(`#tooltip-${name.replace('.', '')}`, {
      display: 'none',
    })
  }

  return (
    data && (
      <div className='relative flex gap-4 h-40 w-full items-center justify-start bg-white rounded-md  pl-4'>
        <p
          id={`tooltip-${name.replace('.', '')}`}
          className='hidden z-20 absolute bottom-36 left-[2.5%] p-4 text-sm bg-emerald-400 rounded-lg w-[95%] text-left pointer-events-none shadow-md
          
          before:block before:content-[""] before:absolute before:-bottom-3 before:-translate-y-1/2 before:left-10 before:w-0 before:h-0 before:pointer-events-none before:border-x-8 before:border-t-8 before:border-solid before:border-x-transparent before:border-t-emerald-400 before:shadow-lg
          '>
          {polluantsDefinition[name]}
        </p>
        <div className='relative flex flex-col justify-center items-center w-24 text-right p-3 border-2 rounded-md'>
          <p
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className='cursor-pointer underline mb-4'>
            {name}
          </p>

          <p>Now:</p>
          <p className='flex flex-col items-center'>
            <b>{currentIaqi}</b>
            <i className='text-xs ml-1'>
              {name === 'O3'
                ? 'μg/m3'
                : name === 'PM2.5'
                ? 'μg/m3'
                : name === 'PM10'
                ? 'μg/m3'
                : ''}
            </i>
          </p>
        </div>

        <div className='w-full h-full overflow-hidden pt-2'>
          <ResponsiveContainer width='100%' height='100%' debounce={100}>
            <BarChart
              width={'100%'}
              height={80}
              data={data}
              margin={{ top: 15, right: 20, bottom: 0, left: 0 }}>
              <Bar
                maxBarSize={30}
                minBarSize={10}
                dataKey='min'
                opacity={0.3}
                fill='#475480'
                stroke='#242A40'
                stackId='minmax'
                unit={
                  name === 'O3'
                    ? ' μg/m3'
                    : name === 'PM2.5'
                    ? ' μg/m3'
                    : name === 'PM10'
                    ? ' μg/m3'
                    : ''
                }
              />
              <Bar
                maxBarSize={30}
                minBarSize={10}
                dataKey='max'
                fill='#39AA62'
                opacity={0.3}
                stroke='#164226'
                stackId='minmax'
                unit={
                  name === 'O3'
                    ? ' μg/m3'
                    : name === 'PM2.5'
                    ? ' μg/m3'
                    : name === 'PM10'
                    ? ' μg/m3'
                    : ''
                }
              />
              {/* <CartesianGrid stroke='#9C9C9C' strokeDasharray='2 2' /> */}
              <XAxis
                dataKey='day'
                tickFormatter={(e) => moment(e).format('dd DD')}
              />
              <YAxis width={20} orientation='right' tickLine={false} />
              <Tooltip
                cursor={{ fill: 'none', stroke: '#ccc' }}
                contentStyle={{
                  borderRadius: '.5rem',
                  textAlign: 'center',
                  border: '2px solid #ccc',
                }}
                labelStyle={{
                  color: 'black',
                }}
                labelFormatter={(e) => moment(e).format('DD MMMM YYYY')}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  )
}
