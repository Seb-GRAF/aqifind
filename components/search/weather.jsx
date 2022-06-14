import WeatherChart from './weatherChart'

export default function Weather({ weatherData }) {
  return (
    weatherData && (
      <div className='flex flex-col gap-4 w-full h-fit overflow-hidden bg-neutral-200 rounded-lg p-4  mt-6'>
        <h3 className='w-full text-center opacity-70 text-lg'>Weather</h3>
        <div className='flex md:flex-row flex-col gap-4 h-full'>
          <div className='w-full md:w-auto flex gap-4'>
            <div className='flex flex-col gap-4 w-1/2 md:w-auto '>
              <div className='flex flex-col items-center justify-evenly w-full h-52 bg-white rounded-lg p-4'>
                <i
                  className={`wi wi-owm-${weatherData.current.weather[0].id} text-8xl text-center opacity-80 `}></i>
                <p className='text-lg font-semibold'>
                  {weatherData.current.temp.toFixed(1)}°C
                </p>
              </div>
              <p className='bg-white rounded-lg p-2 h-fit w-full capitalize text-center md:w-[10rem] '>
                {weatherData.current.weather[0].description}
              </p>
            </div>
            <div className='flex flex-col items-center justify-evenly min-h-full bg-white rounded-lg p-4 md:w-[10rem] w-1/2 text-center'>
              <p>
                {' '}
                Feels like: <b>{weatherData.current.feels_like.toFixed(1)}°C</b>
              </p>
              <p>
                {' '}
                Humidity: <b>{weatherData.current.humidity}%</b>
              </p>
              <p>
                {' '}
                Wind: <b>{weatherData.current.wind_speed}m/s</b>
              </p>
              <p>
                {' '}
                UV: <b>{weatherData.current.uvi}</b>
              </p>
            </div>
          </div>
          <WeatherChart weatherData={weatherData.daily} />
        </div>
      </div>
    )
  )
}
