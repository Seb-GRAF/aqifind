import { Marker } from 'react-map-gl'
import gsap from 'gsap'

export default function MapMarker({ data }) {
  // Tooltip functions
  const onMouseEnter = (e) => {
    const tooltip = document.querySelector('#tooltip')
    tooltip.innerHTML = data.station.name

    gsap.set(tooltip, {
      display: 'block',
      width: 'auto',
      background:
        data.aqi < 0
          ? '#d96a6a'
          : data.aqi < 50
          ? '#5BC299'
          : data.aqi < 100
          ? '#759BBF'
          : data.aqi < 150
          ? '#8780D9'
          : data.aqi < 200
          ? '#9073E6'
          : data.aqi < 300
          ? '#9866F2'
          : '#A159FF',
    })
  }
  const onMouseLeave = () => {
    const tooltip = document.querySelector('#tooltip')

    gsap.set(tooltip, {
      display: 'none',
      background: '#34d399',
      width: '16rem',
    })
  }
  return (
    <Marker
      latitude={data.lat}
      longitude={data.lon}
      popup={data.name}
      anchor='center'>
      <div
        className='relative'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <p
          className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-1 px-2 rounded-md text-md shadow-md cursor-default ${
            data.aqi < 0
              ? 'bg-[#d96a6a]'
              : data.aqi < 50
              ? 'bg-[#5BC299]'
              : data.aqi < 100
              ? 'bg-[#759BBF]'
              : data.aqi < 150
              ? 'bg-[#8780D9]'
              : data.aqi < 200
              ? 'bg-[#9073E6]'
              : data.aqi < 300
              ? 'bg-[#9866F2]'
              : 'bg-[#A159FF]'
          }`}>
          {data.aqi}
        </p>
      </div>
    </Marker>
  )
}
