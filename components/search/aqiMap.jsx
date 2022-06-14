import { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import MapMarker from './mapMarker'

export default function AqiMap({ coordinates }) {
  const [data, setData] = useState()
  const [coordBounds, setCoordBounds] = useState()

  const getURLParameter = (sParam) => {
    var sPageURL = window.location.search.substring(1)
    var sURLVariables = sPageURL.split('&')
    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=')
      if (sParameterName[0] == sParam) {
        return sParameterName[1]
      }
    }
  }

  useEffect(() => {
    const bounds = {
      lat: { max: coordinates.lat + 2, min: coordinates.lat - 2 },
      lon: { max: coordinates.lon + 4, min: coordinates.lon - 4 },
    }
    setCoordBounds(bounds)

    // fetch all points for mapping
    fetch(
      `https://api.waqi.info/v2/map/bounds?latlng=${bounds.lat.min},${bounds.lon.max},${bounds.lat.max},${bounds.lon.min}&networks=official&token=${process.env.NEXT_PUBLIC_AQICN_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className='w-full h-96 md:h-[30rem] rounded-md overflow-hidden mt-6'>
      {coordBounds && coordinates && (
        <Map
          initialViewState={{
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            zoom: 9,
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '0.375rem',

            overflow: 'hidden',
          }}
          maxZoom={14}
          minZoom={6.5}
          maxBounds={[
            [coordBounds.lon.min - 1, coordBounds.lat.min - 0.5],
            [coordBounds.lon.max + 1, coordBounds.lat.max + 0.5],
          ]}
          boxZoom={true}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
          mapStyle='mapbox://styles/mapbox/dark-v10'>
          {data &&
            data.status === 'ok' &&
            data.data.map((item) => {
              if (item.aqi === '-' || item.aqi === undefined) return null
              return <MapMarker data={item} key={item.uid} />
            })}
        </Map>
      )}
    </div>
  )
}
