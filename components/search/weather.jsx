import WeatherChart from './weatherChart'

export default function Weather({ weatherData }) {
  return (
    weatherData && (
      <div className='flex flex-wrap md:flex-nowrap gap-4 w-full h-fit overflow-hidden bg-slate-100 rounded-lg p-4  mt-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col items-center justify-evenly w-36 h-36 bg-white rounded-lg p-4'>
            <i
              className={`wi wi-owm-${weatherData.current.weather[0].id} text-6xl text-center`}></i>
            <p className='text-lg font-semibold'>
              {weatherData.current.temp.toFixed(1)}°C
            </p>
          </div>
          <p className='bg-white rounded-lg p-2 h-fit capitalize text-center max-w-[9rem] '>
            {weatherData.current.weather[0].description}
          </p>
        </div>
        <div className='flex flex-col items-start justify-evenly min-h-full bg-white rounded-lg p-4 min-w-[10rem]'>
          <p> Feels like: {weatherData.current.feels_like.toFixed(1)}°C</p>
          <p> Humidity: {weatherData.current.humidity}%</p>
          <p> Wind: {weatherData.current.wind_speed}m/s</p>
          <p> UV: {weatherData.current.uvi}</p>
        </div>
        <div className='w-full min-h-full'>
          <WeatherChart weatherData={weatherData.daily} />
        </div>
      </div>
    )
  )
}
