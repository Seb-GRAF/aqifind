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
import { data } from 'autoprefixer'

export default function WeatherChart({ weatherData }) {
  const [resize, setResize] = useState('100%')

  const onWindowResize = () => {
    setResize(`${window.innerWidth / 10}%`)
  }

  useEffect(() => {
    for (let i = 0; i < weatherData.length; i++) {
      let day = moment().add(i, 'days').format('dd DD')
      weatherData[i].day = day
    }
    console.log(weatherData)
    addEventListener('resize', onWindowResize, false)

    return () => {
      removeEventListener('resize', onWindowResize, false)
    }
  }, [])

  return (
    weatherData && (
      <div className='flex w-full h-full pt-2 bg-white rounded-lg p-4'>
        <ResponsiveContainer width='100%' height='100%' debounce={100}>
          <AreaChart
            width={'100%'}
            height={80}
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
            <XAxis
              dataKey='day'
              // tickFormatter={(e) => moment(e).format('dd DD')}
            />
            <Tooltip cursor={{ fill: 'none', stroke: '#ccc' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  )
}
