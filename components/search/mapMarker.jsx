import { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'

export default function MapMarker({ data }) {
  return (
    <Marker
      latitude={data.lat}
      longitude={data.lon}
      popup={data.name}
      anchor='center'>
      <div className='relative'>
        <p
          className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-1 px-2 rounded-md text-md shadow-md cursor-pointer ${
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
