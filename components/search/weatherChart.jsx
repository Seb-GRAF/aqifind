import { useState, useEffect } from 'react'
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import moment from 'moment'

export default function WeatherChart({ weatherData }) {
  useEffect(() => {
    for (let i = 0; i < weatherData.length; i++) {
      let day = moment().add(i, 'days').format('dd DD')
      weatherData[i].day = day
    }
  })

  return (
    weatherData && (
      <div className='flex flex-col items-center w-full min-h-full pt-4 md:pt-6 bg-white rounded-lg p-3 md:p-6 overflow-x-hidden'>
        <p>Weekly temperature forecast</p>
        <ResponsiveContainer width='100%' height='100%' debounce={100}>
          <AreaChart
            width={'100%'}
            data={weatherData}
            margin={{ top: 15, right: 20, bottom: 0, left: 0 }}>
            <Area
              dot={true}
              type='natural'
              dataKey='temp.max'
              unit='°C'
              fill='#FBBA7450'
              stroke='#FBBA74'
            />
            <Area
              dot={true}
              type='natural'
              dataKey='temp.min'
              unit='°C'
              fill='#7E8FCC50'
              stroke='#7E8FCC'
            />
            <CartesianGrid
              stroke='#9C9C9C'
              strokeDasharray='2 2'
              horizontal={false}
            />
            <XAxis dataKey='day' height={22} />
            <YAxis unit='°' width={30} />
            <Tooltip cursor={{ fill: 'none', stroke: '#ccc' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  )
}
