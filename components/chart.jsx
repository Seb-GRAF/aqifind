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

export default function Chart({ data, name }) {
  return (
    <div className='flex gap4 h-16 w-full'>
      <p>{name}</p>
      <ResponsiveContainer width='80%' height='100%'>
        <AreaChart
          width={'100%'}
          height={80}
          data={data.daily.o3}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Area type='monotone' dataKey='min' fill='green' stackId='a' />
          <Area type='monotone' dataKey='max' fill='red' stackId='a' />
          <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
          <XAxis
            dataKey='day'
            tickFormatter={(e) => moment(e).format('DD MMMM')}
          />
          {/* <YAxis /> */}
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
