import WeatherChart from './weatherChart'

export default function Weather({ weatherData }) {
  return (
    weatherData && (
      <div className='flex flex-col gap-4 w-full h-fit overflow-hidden bg-slate-100 rounded-lg p-4  mt-4'>
        <p>Weather:</p>
        <div className='flex md:flex-row flex-col gap-4'>
          <div className='w-full md:w-auto flex gap-4'>
            <div className='flex flex-col gap-4 w-1/2 md:w-auto '>
              <div className='flex flex-col items-center justify-evenly w-full h-36 bg-white rounded-lg p-4'>
                <i
                  className={`wi wi-owm-${weatherData.current.weather[0].id} text-6xl text-center`}></i>
                <p className='text-lg font-semibold'>
                  {weatherData.current.temp.toFixed(1)}°C
                </p>
              </div>
              <p className='bg-white rounded-lg p-2 h-fit w-full capitalize text-center md:w-[10rem] '>
                {weatherData.current.weather[0].description}
              </p>
            </div>
            <div className='flex flex-col items-center md:items-start justify-evenly min-h-full bg-white rounded-lg p-4 md:w-[10rem] w-1/2'>
              <p> Feels like: {weatherData.current.feels_like.toFixed(1)}°C</p>
              <p> Humidity: {weatherData.current.humidity}%</p>
              <p> Wind: {weatherData.current.wind_speed}m/s</p>
              <p> UV: {weatherData.current.uvi}</p>
            </div>
          </div>
          <WeatherChart weatherData={weatherData.daily} />
        </div>
      </div>
    )
  )
}
