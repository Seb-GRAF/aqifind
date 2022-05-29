import { useEffect, useState } from 'react'

export default function Test() {
  const [data, setData] = useState()
  useEffect(() => {
    const cityName = window.location.search.replace('?q=', '')

    fetch(
      `https://api.waqi.info/feed/${cityName}/?token=653c9ff7e44ce4612d2d1472a0f142f5859e1e28`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setData(res)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div>
      <h1>Test</h1>
      {data && data.status === 'ok' ? (
        <div>
          <p>{data.data.city.name}</p>
          <p>{data.data.aqi}</p>
          <p>{data.data.city.time}</p>
        </div>
      ) : data && data.status === 'error' ? (
        <p>City not found</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
